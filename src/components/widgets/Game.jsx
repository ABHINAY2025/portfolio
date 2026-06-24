import React from 'react';
import './game.css';

const GAME_W = 640;
const GAME_H = 380;
const CHAR_W = 64;
const CHAR_H = 40;
const EGG_R = 14;       // generous catch radius
const CHAR_TOP = GAME_H - 60;

function postState(roomId, payload) {
  if (!roomId) return;
  fetch('/api/game/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomId, ...payload }),
  }).catch(() => {});
}

export default function Game() {
  const canvasRef = React.useRef(null);
  const stageRef = React.useRef(null);

  const [roomId, setRoomId] = React.useState(null);
  const [lanIp, setLanIp] = React.useState(null);
  const [ipCandidates, setIpCandidates] = React.useState([]);
  const [paired, setPaired] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [best, setBest] = React.useState(0);
  const [isFs, setIsFs] = React.useState(false);

  const stateRef = React.useRef({
    keys: { left: false, right: false },
    char: { x: GAME_W / 2 - CHAR_W / 2 },
    eggs: [],
    clouds: [
      { x: 70,  y: 44, w: 110, h: 38 },
      { x: 260, y: 30, w: 130, h: 44 },
      { x: 460, y: 50, w: 110, h: 38 },
    ],
    lastSpawn: 0,
    spawnGap: 1300,
    fallSpeed: 1.4,
    score: 0,
    running: false,
    elapsed: 0,
    flash: 0, // brief catch flash
  });

  // Create room + fetch LAN ip
  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [r1, r2] = await Promise.all([
          fetch('/api/game/room', { method: 'POST' }).then((r) => r.json()),
          fetch('/api/game/local-ip').then((r) => r.json()),
        ]);
        if (!alive) return;
        setRoomId(r1.roomId);
        setLanIp(r2.ip);
        setIpCandidates(Array.isArray(r2.candidates) ? r2.candidates : []);
      } catch {}
    })();
    return () => { alive = false; };
  }, []);

  // SSE: receive controller events
  React.useEffect(() => {
    if (!roomId) return;
    const es = new EventSource(`/api/game/events/${roomId}`);
    es.addEventListener('control', (e) => {
      try {
        const { action } = JSON.parse(e.data);
        if (!paired) setPaired(true);
        if (action === 'left:down')  stateRef.current.keys.left  = true;
        if (action === 'left:up')    stateRef.current.keys.left  = false;
        if (action === 'right:down') stateRef.current.keys.right = true;
        if (action === 'right:up')   stateRef.current.keys.right = false;
      } catch {}
    });
    es.onerror = () => {};
    return () => es.close();
  }, [roomId, paired]);

  // Keyboard fallback
  React.useEffect(() => {
    const dn = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') stateRef.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') stateRef.current.keys.right = true;
    };
    const up = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') stateRef.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') stateRef.current.keys.right = false;
    };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', dn);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Push HUD state to phone
  React.useEffect(() => {
    postState(roomId, { score, running });
  }, [roomId, score, running]);

  // Fullscreen state listener
  React.useEffect(() => {
    const onFsChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Game loop
  React.useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(48, now - last);
      last = now;
      const s = stateRef.current;

      if (s.running) {
        const speed = 4.4;
        if (s.keys.left)  s.char.x -= speed;
        if (s.keys.right) s.char.x += speed;
        s.char.x = Math.max(8, Math.min(GAME_W - CHAR_W - 8, s.char.x));

        s.elapsed += dt;
        s.lastSpawn += dt;
        s.spawnGap = Math.max(550, 1300 - s.elapsed * 0.04);
        s.fallSpeed = Math.min(3.6, 1.4 + s.elapsed * 0.00012);
        if (s.lastSpawn >= s.spawnGap) {
          s.lastSpawn = 0;
          const cloud = s.clouds[Math.floor(Math.random() * s.clouds.length)];
          s.eggs.push({
            x: cloud.x + Math.random() * (cloud.w - 10) + 5,
            y: cloud.y + cloud.h - 4,
            vy: s.fallSpeed,
          });
        }

        for (const egg of s.eggs) egg.y += egg.vy * (dt / 16.67);

        // collisions: any overlap of egg circle with basket rect = catch
        const remaining = [];
        let scored = 0;
        const left = s.char.x;
        const right = s.char.x + CHAR_W;
        const top = CHAR_TOP - 6;        // small extra zone above for the lip
        const bottom = CHAR_TOP + CHAR_H;
        for (const egg of s.eggs) {
          const cx = Math.max(left, Math.min(egg.x, right));
          const cy = Math.max(top, Math.min(egg.y, bottom));
          const dx = egg.x - cx;
          const dy = egg.y - cy;
          if (dx * dx + dy * dy <= EGG_R * EGG_R) {
            scored += 1;
            continue;
          }
          if (egg.y > GAME_H + 20) continue; // missed eggs simply vanish
          remaining.push(egg);
        }
        s.eggs = remaining;

        if (scored > 0) {
          s.score += scored * 10;
          s.flash = 6;
          setScore(s.score);
        }
        if (s.flash > 0) s.flash -= 1;
      }

      draw(ctx, s);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    try {
      const v = parseInt(localStorage.getItem('egg-best') || '0', 10);
      if (!Number.isNaN(v)) setBest(v);
    } catch {}
  }, []);

  // Persist best whenever score climbs above it
  React.useEffect(() => {
    if (score > best) {
      setBest(score);
      try { localStorage.setItem('egg-best', String(score)); } catch {}
    }
  }, [score, best]);

  const start = () => {
    const s = stateRef.current;
    s.score = 0; s.eggs = []; s.elapsed = 0; s.lastSpawn = 0;
    s.char.x = GAME_W / 2 - CHAR_W / 2;
    s.running = true;
    setScore(0);
    setRunning(true);
  };

  const reset = () => {
    const s = stateRef.current;
    s.score = 0; s.eggs = []; s.elapsed = 0; s.lastSpawn = 0;
    s.char.x = GAME_W / 2 - CHAR_W / 2;
    setScore(0);
  };

  const toggleFs = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (stageRef.current?.requestFullscreen) {
        await stageRef.current.requestFullscreen();
      }
    } catch {}
  };

  const controllerUrl = (lanIp && roomId)
    ? `http://${lanIp}:5173/controller?room=${roomId}`
    : null;

  const qrSrc = controllerUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&color=1A1530&bgcolor=FFF7F1&data=${encodeURIComponent(controllerUrl)}`
    : null;

  return (
    <section className="section game" id="game">
      <div className="shell">
        <header className="section__head">
          <span className="eyebrow">▸ ARCADE / SVC 07</span>
          <h2 className="section__title">
            Catch the <span className="accent-y">eggs.</span> Phone is the <span className="accent-c">controller.</span>
          </h2>
          <p className="section__lede">
            Scan the QR with your phone — the controller opens in landscape. Hit fullscreen, hold left or right, rack up the score.
          </p>
        </header>

        <div className="game__grid">
          <div
            className={`game__stage ${isFs ? 'is-fs' : ''}`}
            ref={stageRef}
          >
            <div className="game__hud">
              <div className="game__hudCell">
                <span className="game__hudLabel">SCORE</span>
                <span className="game__hudNum">{String(score).padStart(4, '0')}</span>
              </div>
              <div className="game__hudCell">
                <span className="game__hudLabel">BEST</span>
                <span className="game__hudNum">{String(best).padStart(4, '0')}</span>
              </div>
              <div className="game__hudCell game__hudCell--actions">
                <button className="game__iconBtn" onClick={reset} title="Reset score">
                  ↺ RESET
                </button>
                <button className="game__iconBtn game__iconBtn--alt" onClick={toggleFs} title="Toggle fullscreen">
                  {isFs ? '⤓ EXIT FS' : '⤢ FULLSCREEN'}
                </button>
              </div>
            </div>

            <div className="game__canvasWrap">
              <canvas
                ref={canvasRef}
                width={GAME_W}
                height={GAME_H}
                className="game__canvas"
              />
              {!running && (
                <div className="game__overlay">
                  <div className="game__overlayInner">
                    <div className="game__overlayTitle">EGG-CATCHER</div>
                    <div className="game__overlayCopy">
                      Endless mode. Use the phone controller, or arrow keys / A &amp; D on the laptop.
                    </div>
                    <button className="btn btn--yellow btn--lg" onClick={start}>
                      START GAME
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="game__foot">
              <span className={`game__pill ${paired ? 'is-on' : ''}`}>
                ● {paired ? 'CONTROLLER LINKED' : 'WAITING FOR CONTROLLER'}
              </span>
              <span className="game__pill game__pill--muted">ROOM {roomId || '——'}</span>
            </div>
          </div>

          <aside className="game__qr">
            <div className="game__qrPanel">
              <div className="game__qrHead">
                <span className="game__qrDot" />
                <span className="game__qrTitle">PHONE CONTROLLER</span>
              </div>
              <div className="game__qrCode">
                {qrSrc
                  ? <img src={qrSrc} alt="QR code to open controller on phone" />
                  : <div className="game__qrSkeleton">generating…</div>}
              </div>
              <ol className="game__qrSteps">
                <li><span className="game__stepNum">1</span> Open the camera on your phone.</li>
                <li><span className="game__stepNum">2</span> Scan the code — tap the link.</li>
                <li><span className="game__stepNum">3</span> Rotate landscape, hold ◀ / ▶ to move.</li>
              </ol>
              <div className="game__qrUrl">
                {controllerUrl
                  ? <code>{controllerUrl}</code>
                  : <code>finding LAN address…</code>}
              </div>
              {ipCandidates.length > 1 && (
                <label className="game__ipPick">
                  <span>QR not opening? Try a different network adapter:</span>
                  <select
                    value={lanIp || ''}
                    onChange={(e) => setLanIp(e.target.value)}
                  >
                    {ipCandidates.map((c) => (
                      <option key={c.address} value={c.address}>
                        {c.address} — {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <p className="game__qrNote">
                Phone and laptop must be on the same wifi.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- drawing ---------- */

function draw(ctx, s) {
  const grad = ctx.createLinearGradient(0, 0, 0, GAME_H);
  grad.addColorStop(0, '#cfe9ff');
  grad.addColorStop(1, '#fde5b1');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, GAME_W, GAME_H);

  ctx.fillStyle = '#ffd86b';
  pixelCircle(ctx, 580, 60, 22);

  ctx.fillStyle = '#b8dca0';
  ctx.fillRect(0, GAME_H - 22, GAME_W, 22);
  ctx.fillStyle = '#88b86c';
  for (let x = 0; x < GAME_W; x += 18) {
    ctx.fillRect(x, GAME_H - 22, 8, 4);
  }

  for (const c of s.clouds) drawCloud(ctx, c);

  for (const e of s.eggs) drawEgg(ctx, e.x, e.y);

  drawBasket(ctx, s.char.x, CHAR_TOP);

  // catch flash
  if (s.flash > 0) {
    ctx.fillStyle = `rgba(255, 216, 107, ${s.flash * 0.06})`;
    ctx.fillRect(0, 0, GAME_W, GAME_H);
  }

  if (!s.running) {
    ctx.fillStyle = 'rgba(26, 21, 48, 0.45)';
    ctx.fillRect(0, 0, GAME_W, GAME_H);
  }
}

function pixelCircle(ctx, cx, cy, r) {
  for (let y = -r; y <= r; y += 2) {
    const w = Math.floor(Math.sqrt(r * r - y * y));
    ctx.fillRect(cx - w, cy + y, w * 2, 2);
  }
}

function drawCloud(ctx, c) {
  const { x, y, w, h } = c;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 6, y, w - 12, h);
  ctx.fillRect(x, y + 8, w, h - 16);
  ctx.fillStyle = 'rgba(105, 116, 158, 0.35)';
  ctx.fillRect(x + 6, y + h, w - 12, 4);
  ctx.fillStyle = '#1a1530';
  ctx.fillRect(x + Math.floor(w * 0.35), y + Math.floor(h * 0.45), 4, 4);
  ctx.fillRect(x + Math.floor(w * 0.55), y + Math.floor(h * 0.45), 4, 4);
}

function drawEgg(ctx, cx, cy) {
  ctx.fillStyle = 'rgba(26, 21, 48, 0.18)';
  ctx.fillRect(cx - 8, cy + 12, 16, 3);
  ctx.fillStyle = '#fff7f1';
  ctx.fillRect(cx - 6, cy - 10, 12, 4);
  ctx.fillRect(cx - 8, cy - 6, 16, 14);
  ctx.fillRect(cx - 6, cy + 8, 12, 2);
  ctx.fillStyle = '#ffd86b';
  ctx.fillRect(cx + 1, cy - 2, 3, 3);
  ctx.fillRect(cx - 4, cy + 2, 2, 2);
  ctx.fillStyle = '#1a1530';
  ctx.fillRect(cx - 6, cy - 11, 12, 1);
  ctx.fillRect(cx - 6, cy + 9, 12, 1);
  ctx.fillRect(cx - 9, cy - 6, 1, 14);
  ctx.fillRect(cx + 8, cy - 6, 1, 14);
}

function drawBasket(ctx, x, y) {
  ctx.fillStyle = '#1a1530';
  ctx.fillRect(x + 12, y - 14, CHAR_W - 24, 4);
  ctx.fillRect(x + 8, y - 10, 4, 8);
  ctx.fillRect(x + CHAR_W - 12, y - 10, 4, 8);

  ctx.fillStyle = '#ff9573';
  ctx.fillRect(x, y, CHAR_W, CHAR_H);
  ctx.fillStyle = '#ffb79d';
  ctx.fillRect(x + 4, y + 4, CHAR_W - 8, 6);
  ctx.fillStyle = '#ff9573';
  for (let i = 0; i < CHAR_W; i += 8) {
    ctx.fillRect(x + i, y + 12, 4, 4);
    ctx.fillRect(x + i + 4, y + 20, 4, 4);
    ctx.fillRect(x + i, y + 28, 4, 4);
  }
  ctx.fillStyle = '#1a1530';
  ctx.fillRect(x, y, CHAR_W, 2);
  ctx.fillRect(x, y + CHAR_H - 2, CHAR_W, 2);
  ctx.fillRect(x, y, 2, CHAR_H);
  ctx.fillRect(x + CHAR_W - 2, y, 2, CHAR_H);
}
