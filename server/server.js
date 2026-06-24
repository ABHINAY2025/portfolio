import express from 'express';
import cors from 'cors';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { networkInterfaces } from 'os';
import xlsx from 'xlsx';
import { connectDb, collections, dbStatus } from './db.js';

// Load .env (project root) into process.env. Built-in to Node ≥20.6; if the
// file is missing (e.g. the host injects env vars directly) this is a no-op.
try { process.loadEnvFile(join(dirname(fileURLToPath(import.meta.url)), '..', '.env')); } catch {}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const FILE = join(DATA_DIR, 'leads.xlsx');
const SHEET = 'leads';

// ---- admin content store (editable site content) ----
const CONTENT_FILE = join(DATA_DIR, 'content.json');
const UPLOADS_DIR = join(DATA_DIR, 'uploads');

// Local disk dirs for the disk-fallback store. Wrapped because serverless
// filesystems (e.g. Vercel) are read-only — there we use MongoDB, not disk.
try { if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true }); } catch {}
try { if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true }); } catch {}
// Set a strong ADMIN_KEY env var in production. This default is for local dev only.
const ADMIN_KEY = process.env.ADMIN_KEY || 'retro-admin';

// file extension -> content type, for serving/migrating uploaded files
const EXT_TO_CT = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif',
  webp: 'image/webp', svg: 'image/svg+xml', pdf: 'application/pdf',
};

const COLUMNS = [
  'timestamp',
  'name',
  'email',
  'company',
  'projectType',
  'timeline',
  'description',
];

const app = express();
app.use(cors());

// Small JSON body parser for everything except the admin routes that carry
// large payloads (full content tree / base64 images), which use bigJson below.
const smallJson = express.json({ limit: '64kb' });
const bigJson = express.json({ limit: '12mb' });
app.use((req, res, next) => {
  if (req.path === '/api/content' || req.path === '/api/upload') return next();
  return smallJson(req, res, next);
});

function requireAdmin(req, res, next) {
  const key = req.get('x-admin-key') || '';
  if (key && key === ADMIN_KEY) return next();
  return res.status(401).json({ error: 'unauthorized' });
}

// ---- content store: MongoDB when connected, else local JSON file ----
function readContentDisk() {
  if (!existsSync(CONTENT_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CONTENT_FILE, 'utf8'));
  } catch {
    return {};
  }
}
function writeContentDisk(obj) {
  writeFileSync(CONTENT_FILE, JSON.stringify(obj, null, 2));
}

async function getContent() {
  const cols = collections();
  if (cols) {
    const doc = await cols.content.findOne({ _id: 'content' });
    return doc?.data || {};
  }
  return readContentDisk();
}
async function saveContent(obj) {
  const cols = collections();
  if (cols) {
    await cols.content.updateOne(
      { _id: 'content' },
      { $set: { data: obj, updatedAt: new Date() } },
      { upsert: true },
    );
    return;
  }
  writeContentDisk(obj);
}

// ---- uploaded files: MongoDB binary when connected, else disk ----
async function saveUpload(name, contentType, buf) {
  const cols = collections();
  if (cols) {
    await cols.uploads.updateOne(
      { _id: name },
      { $set: { _id: name, name, contentType, data: buf, size: buf.length, createdAt: new Date() } },
      { upsert: true },
    );
    return;
  }
  writeFileSync(join(UPLOADS_DIR, name), buf);
}

// serve admin-uploaded files (under /api so the Vite dev proxy forwards them).
// Mongo first; fall through to disk for anything not (yet) in the DB.
app.get('/api/uploads/:name', async (req, res, next) => {
  const cols = collections();
  if (!cols) return next();
  try {
    const doc = await cols.uploads.findOne({ _id: req.params.name });
    if (!doc) return next();
    res.set('Content-Type', doc.contentType || 'application/octet-stream');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(Buffer.isBuffer(doc.data) ? doc.data : Buffer.from(doc.data.buffer));
  } catch (e) {
    next(e);
  }
});
app.use('/api/uploads', express.static(UPLOADS_DIR));

// public: the saved content overrides (merged over static defaults on the client)
app.get('/api/content', async (_req, res, next) => {
  try {
    res.json(await getContent());
  } catch (e) {
    next(e);
  }
});

// admin: verify the passcode (used by the login screen)
app.post('/api/admin/verify', requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

// admin: save the whole content tree
app.put('/api/content', bigJson, requireAdmin, async (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'content must be a JSON object' });
  }
  try {
    await saveContent(body);
    console.log('[content] saved');
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// admin: upload a base64 file, store it (Mongo or disk), return its URL
app.post('/api/upload', bigJson, requireAdmin, async (req, res, next) => {
  const { dataUrl } = req.body || {};
  if (!dataUrl || typeof dataUrl !== 'string') {
    return res.status(400).json({ error: 'dataUrl required' });
  }
  const m = /^data:([\w/+.-]+);base64,(.+)$/i.exec(dataUrl);
  if (!m) return res.status(400).json({ error: 'invalid data URL' });
  const mime = m[1].toLowerCase();
  const TYPES = {
    'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/gif': 'gif',
    'image/webp': 'webp', 'image/svg+xml': 'svg', 'application/pdf': 'pdf',
  };
  const ext = TYPES[mime];
  if (!ext) return res.status(400).json({ error: 'unsupported file (png/jpg/gif/webp/svg/pdf only)' });
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 8 * 1024 * 1024) return res.status(413).json({ error: 'image too large (max 8MB)' });
  const name = `upload-${Date.now()}.${ext}`;
  try {
    await saveUpload(name, EXT_TO_CT[ext] || mime, buf);
    console.log(`[upload] ${name} (${(buf.length / 1024).toFixed(0)}kb) → ${collections() ? 'mongo' : 'disk'}`);
    res.json({ url: `/api/uploads/${name}` });
  } catch (e) {
    next(e);
  }
});

// ---- leads: MongoDB when connected, else the local xlsx file ----
function readRowsDisk() {
  if (!existsSync(FILE)) return [];
  const buf = readFileSync(FILE);
  const wb = xlsx.read(buf, { type: 'buffer' });
  const ws = wb.Sheets[SHEET];
  if (!ws) return [];
  return xlsx.utils.sheet_to_json(ws, { defval: '' });
}

function writeRowsDisk(rows) {
  const ws = xlsx.utils.json_to_sheet(rows, { header: COLUMNS });
  ws['!cols'] = COLUMNS.map((c) => ({ wch: c === 'description' ? 60 : 22 }));
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, SHEET);
  const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  writeFileSync(FILE, buf);
}

// build an .xlsx buffer from an array of lead rows (for the export endpoint)
function rowsToXlsxBuffer(rows) {
  const ws = xlsx.utils.json_to_sheet(rows, { header: COLUMNS });
  ws['!cols'] = COLUMNS.map((c) => ({ wch: c === 'description' ? 60 : 22 }));
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, SHEET);
  return xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

async function getLeads() {
  const cols = collections();
  if (cols) {
    // newest last (matches the on-disk append order); strip Mongo _id
    return cols.leads.find({}, { projection: { _id: 0 } }).sort({ timestamp: 1 }).toArray();
  }
  return readRowsDisk();
}

async function addLead(lead) {
  const cols = collections();
  if (cols) {
    await cols.leads.insertOne(lead);
    return cols.leads.countDocuments();
  }
  const rows = readRowsDisk();
  rows.push(lead);
  writeRowsDisk(rows);
  return rows.length;
}

async function countLeads() {
  const cols = collections();
  if (cols) return cols.leads.countDocuments();
  return readRowsDisk().length;
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

app.post('/api/lead', async (req, res, next) => {
  const {
    name = '',
    email = '',
    company = '',
    projectType = '',
    timeline = '',
    description = '',
  } = req.body || {};

  const trimmed = {
    name: String(name).trim(),
    email: String(email).trim(),
    company: String(company).trim(),
    projectType: String(projectType).trim(),
    timeline: String(timeline).trim(),
    description: String(description).trim(),
  };

  if (!trimmed.name || !trimmed.email || !trimmed.description) {
    return res.status(400).json({ error: 'name, email and description are required' });
  }
  if (!EMAIL.test(trimmed.email)) {
    return res.status(400).json({ error: 'invalid email address' });
  }
  if (trimmed.description.length > 4000) {
    return res.status(400).json({ error: 'description is too long (max 4000 chars)' });
  }

  try {
    const lead = { timestamp: new Date().toISOString(), ...trimmed };
    const count = await addLead(lead);
    console.log(`[lead] ${trimmed.email} → ${trimmed.projectType || '?'} (total: ${count}) → ${collections() ? 'mongo' : 'disk'}`);
    res.json({ ok: true, count });
  } catch (e) {
    next(e);
  }
});

// admin: list all leads as JSON
app.get('/api/leads', requireAdmin, async (_req, res, next) => {
  try {
    res.json(await getLeads());
  } catch (e) {
    next(e);
  }
});

// admin: download all leads as an .xlsx spreadsheet
app.get('/api/leads.xlsx', requireAdmin, async (_req, res, next) => {
  try {
    const rows = await getLeads();
    const buf = rowsToXlsxBuffer(rows);
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.set('Content-Disposition', 'attachment; filename="leads.xlsx"');
    res.send(buf);
  } catch (e) {
    next(e);
  }
});

app.get('/api/health', async (_req, res, next) => {
  try {
    const cols = collections();
    const s = dbStatus();
    res.json({
      ok: true,
      store: cols ? 'mongo' : 'disk',
      hasMongoUri: s.hasMongoUri,
      mongoError: s.error,
      count: cols ? await countLeads() : 0,
    });
  } catch (e) {
    next(e);
  }
});

/* =========================================================
   GAME — egg-catcher with phone-as-controller (SSE relay)
   ========================================================= */

const ROOM_TTL_MS = 1000 * 60 * 30;
const rooms = new Map(); // roomId -> { game: res|null, controllers: Set<res>, createdAt }

function newRoomId() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function pruneRooms() {
  const now = Date.now();
  for (const [id, room] of rooms) {
    if (now - room.createdAt > ROOM_TTL_MS && !room.game && room.controllers.size === 0) {
      rooms.delete(id);
    }
  }
}
setInterval(pruneRooms, 60_000).unref?.();

function getLocalIps() {
  const nets = networkInterfaces();
  const out = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        out.push({ name, address: net.address });
      }
    }
  }
  // Heuristics
  const isVirtual = (n) => /vethernet|hyper-v|wsl|virtualbox|vmware|loopback|docker|local area connection\* /i.test(n);
  const isWifi    = (n) => /wi-?fi|wlan|wireless/i.test(n);
  const isLan     = (a) => /^(192\.168|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(a);
  const score = (c) => {
    let s = 0;
    if (isVirtual(c.name)) s += 100;
    if (!isLan(c.address)) s += 10;
    if (isWifi(c.name))    s -= 5;
    return s;
  };
  out.sort((a, b) => score(a) - score(b));
  return out;
}

app.get('/api/game/local-ip', (_req, res) => {
  const ips = getLocalIps();
  res.json({ ip: ips[0]?.address || 'localhost', candidates: ips });
});

app.post('/api/game/room', (_req, res) => {
  const id = newRoomId();
  rooms.set(id, { game: null, controllers: new Set(), createdAt: Date.now() });
  res.json({ roomId: id });
});

function sseHeaders(res) {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders?.();
}

// Game subscribes to controller events for its room
app.get('/api/game/events/:roomId', (req, res) => {
  const { roomId } = req.params;
  let room = rooms.get(roomId);
  if (!room) {
    room = { game: null, controllers: new Set(), createdAt: Date.now() };
    rooms.set(roomId, room);
  }
  sseHeaders(res);
  room.game = res;
  res.write(`event: ready\ndata: {"roomId":"${roomId}"}\n\n`);

  // notify any waiting controllers
  for (const c of room.controllers) {
    c.write(`event: paired\ndata: {}\n\n`);
  }

  const ping = setInterval(() => {
    try { res.write(`: ping\n\n`); } catch {}
  }, 15_000);

  req.on('close', () => {
    clearInterval(ping);
    if (room.game === res) room.game = null;
  });
});

// Controller subscribes to game status (e.g., paired/score)
app.get('/api/game/controller-events/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);
  if (!room) return res.status(404).end();
  sseHeaders(res);
  room.controllers.add(res);
  res.write(`event: ready\ndata: {"paired":${room.game ? 'true' : 'false'}}\n\n`);

  const ping = setInterval(() => {
    try { res.write(`: ping\n\n`); } catch {}
  }, 15_000);

  req.on('close', () => {
    clearInterval(ping);
    room.controllers.delete(res);
  });
});

// Controller posts an action (left/right press/release) — relayed to game
app.post('/api/game/control', (req, res) => {
  const { roomId, action } = req.body || {};
  const room = rooms.get(roomId);
  if (!room) return res.status(404).json({ error: 'room not found' });
  if (!room.game) return res.status(409).json({ error: 'game not connected' });
  const safe = String(action || '').slice(0, 32);
  try {
    room.game.write(`event: control\ndata: ${JSON.stringify({ action: safe })}\n\n`);
  } catch {}
  res.json({ ok: true });
});

// Game posts state back to controllers (e.g., score)
app.post('/api/game/state', (req, res) => {
  const { roomId, ...state } = req.body || {};
  const room = rooms.get(roomId);
  if (!room) return res.status(404).json({ error: 'room not found' });
  const payload = JSON.stringify(state).slice(0, 512);
  for (const c of room.controllers) {
    try { c.write(`event: state\ndata: ${payload}\n\n`); } catch {}
  }
  res.json({ ok: true });
});

/* One-time import of any pre-existing disk data into MongoDB, so nothing is
   lost when switching stores. Runs only when connected and only fills gaps
   (never overwrites docs that already exist in Mongo). */
async function migrateDiskToMongo() {
  const cols = collections();
  if (!cols) return;

  // content.json -> site_content
  const existing = await cols.content.findOne({ _id: 'content' }, { projection: { _id: 1 } });
  if (!existing && existsSync(CONTENT_FILE)) {
    try {
      const data = JSON.parse(readFileSync(CONTENT_FILE, 'utf8'));
      await saveContent(data);
      console.log('[migrate] imported content.json → MongoDB');
    } catch (e) {
      console.warn(`[migrate] content.json import skipped (${e.message})`);
    }
  }

  // server/data/uploads/* -> uploads
  if (existsSync(UPLOADS_DIR)) {
    let n = 0;
    for (const f of readdirSync(UPLOADS_DIR)) {
      const already = await cols.uploads.findOne({ _id: f }, { projection: { _id: 1 } });
      if (already) continue;
      const ext = f.split('.').pop().toLowerCase();
      const buf = readFileSync(join(UPLOADS_DIR, f));
      await saveUpload(f, EXT_TO_CT[ext] || 'application/octet-stream', buf);
      n++;
    }
    if (n) console.log(`[migrate] imported ${n} upload(s) → MongoDB`);
  }

  // leads.xlsx -> leads (only when the collection is still empty)
  if ((await cols.leads.countDocuments()) === 0) {
    const rows = readRowsDisk();
    if (rows.length) {
      await cols.leads.insertMany(rows);
      console.log(`[migrate] imported ${rows.length} lead(s) → MongoDB`);
    }
  }
}

/* ---- serve the built frontend (production single-origin deploy) ----
   In dev the frontend runs on Vite (5173) and proxies /api here, so this only
   kicks in once `npm run build` has produced dist/. The app is a single-page
   build that reads window.location.pathname (/, /admin, /controller), so every
   non-API, non-file GET falls back to index.html. */
const DIST_DIR = join(__dirname, '..', 'dist');
const DIST_INDEX = join(DIST_DIR, 'index.html');
if (existsSync(DIST_INDEX)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
    res.sendFile(DIST_INDEX);
  });
  console.log('[devXchange-api] serving built frontend from dist/');
} else {
  console.log('[devXchange-api] no dist/ build found — API only (run `npm run build` for single-origin serving)');
}

export async function startServer() {
  await connectDb();
  try {
    await migrateDiskToMongo();
  } catch (e) {
    console.warn(`[migrate] skipped (${e.message})`);
  }
  const PORT = process.env.API_PORT || 5174;
  app.listen(PORT, () => {
    const cols = collections();
    console.log(`[devXchange-api] listening on http://localhost:${PORT}`);
    console.log(`[devXchange-api] LAN ips: ${getLocalIps().map((c) => `${c.address} (${c.name})`).join(', ')}`);
    console.log(`[devXchange-api] leads file: ${FILE}`);
    console.log(`[devXchange-api] content + uploads store: ${cols ? 'MongoDB' : `disk (${CONTENT_FILE})`}`);
    console.log(`[devXchange-api] admin key: ${process.env.ADMIN_KEY ? '(from ADMIN_KEY env)' : `"${ADMIN_KEY}" (dev default — set ADMIN_KEY in prod)`}`);
  });
}

// Start a real listener only when run directly (node server/server.js or npm
// start). When imported as a module — e.g. by the Vercel serverless function —
// we just export the app and let the platform invoke it per request.
const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (invokedDirectly) startServer();

export default app;
