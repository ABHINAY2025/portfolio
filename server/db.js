import { MongoClient } from 'mongodb';

/* MongoDB connection for the content store + uploaded files.

   The whole app degrades gracefully: if MONGO_URI is unset or the cluster
   can't be reached, connectDb() returns null and the server keeps using
   local-disk storage (fine for dev, lossy on ephemeral hosts). */

let client = null;
let db = null;
let connecting = null; // in-flight connection promise (so we connect once)
let lastError = null;  // last connection failure reason (for /api/health diagnostics)

export async function connectDb() {
  if (db) return db;               // already connected (reused across warm invocations)
  if (connecting) return connecting; // a connection is already in progress

  const uri = process.env.MONGO_URI;
  if (!uri) {
    lastError = 'MONGO_URI is not set in the environment';
    console.warn('[db] MONGO_URI not set — using local-disk storage (dev fallback)');
    return null;
  }

  connecting = (async () => {
    try {
      // promoteBuffers: binary fields come back as Node Buffers (not BSON Binary),
      // so uploaded files can be streamed straight to the response.
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 8000,
        promoteBuffers: true,
      });
      await client.connect();
      db = client.db(); // database name comes from the URI path (…/news)
      await db.command({ ping: 1 });
      lastError = null;
      console.log(`[db] connected to MongoDB → db "${db.databaseName}"`);
      return db;
    } catch (e) {
      lastError = e.message;
      console.error(`[db] connection failed (${e.message}) — falling back to disk`);
      client = null;
      db = null;
      connecting = null; // allow a later retry
      return null;
    }
  })();

  return connecting;
}

export function getDb() {
  return db;
}

/* Lightweight status for /api/health. Exposes whether MONGO_URI reached the
   process and the last error message (Mongo errors don't include the password),
   so deployment misconfig can be diagnosed without server log access. */
export function dbStatus() {
  return {
    connected: !!db,
    hasMongoUri: !!process.env.MONGO_URI,
    error: lastError ? String(lastError).slice(0, 160) : null,
  };
}

/* The two collections we use, or null when running in disk-fallback mode. */
export function collections() {
  if (!db) return null;
  return {
    content: db.collection('site_content'),
    uploads: db.collection('uploads'),
    leads: db.collection('leads'),
  };
}
