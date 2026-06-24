import React from 'react';
import './controller.css';

function send(roomId, action) {
  fetch('/api/game/control', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomId, action }),
  }).catch(() => {});
}

function isLandscape() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(orientation: landscape)').matches;
}

export default function Controller() {
  const params = new URLSearchParams(window.location.search);
  const roomId = (params.get('room') || '').toUpperCase();

  const [paired, setPaired] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [landscape, setLandscape] = React.useState(isLandscape());
  const [armed, setArmed] = React.useState(false); // user has interacted (needed for fullscreen + orientation lock)

  React.useEffect(() => {
    if (!roomId) return;
    const es = new EventSource(`/api/game/controller-events/${roomId}`);
    es.addEventListener('ready', (e) => {
      try { setPaired(JSON.parse(e.data).paired); } catch {}
    });
    es.addEventListener('paired', () => setPaired(true));
    es.addEventListener('state', (e) => {
      try {
        const s = JSON.parse(e.data);
        if (typeof s.score === 'number') setScore(s.score);
      } catch {}
    });
    es.onerror = () => {};
    return () => es.close();
  }, [roomId]);

  // lock body, prevent scrolling
  React.useEffect(() => {
    const prev = document.body.style.overscrollBehavior;
    document.body.style.overscrollBehavior = 'none';
    document.body.classList.add('controller-body');
    return () => {
      document.body.style.overscrollBehavior = prev;
      document.body.classList.remove('controller-body');
    };
  }, []);

  // watch orientation
  React.useEffect(() => {
    const mq = window.matchMedia('(orientation: landscape)');
    const update = () => setLandscape(mq.matches);
    mq.addEventListener?.('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // user gesture handler — fullscreen + orientation lock attempt
  const arm = React.useCallback(async () => {
    if (armed) return;
    setArmed(true);
    try { await document.documentElement.requestFullscreen?.(); } catch {}
    try { await screen.orientation?.lock?.('landscape'); } catch {}
  }, [armed]);

  if (!roomId) {
    return (
      <div className="ctrl">
        <div className="ctrl__panel">
          <div className="ctrl__title">No room.</div>
          <p className="ctrl__copy">
            Open this page by scanning the QR code shown on the laptop.
          </p>
        </div>
      </div>
    );
  }

  // Pre-game: ask the user to tap so we can request fullscreen + orientation lock
  if (!armed) {
    return (
      <div className="ctrl ctrl--prep" onPointerDown={arm}>
        <div className="ctrl__prep">
          <div className="ctrl__prepRoom">ROOM {roomId}</div>
          <div className="ctrl__prepTitle">EGG-CATCHER</div>
          <div className="ctrl__prepIcon">⤢</div>
          <div className="ctrl__prepCopy">
            Rotate your phone <strong>landscape</strong>.<br />
            Tap anywhere to enter fullscreen and start.
          </div>
          <button className="ctrl__prepBtn" onClick={arm}>TAP TO START</button>
        </div>
      </div>
    );
  }

  if (!landscape) {
    return (
      <div className="ctrl ctrl--rotate">
        <div className="ctrl__rotateIcon">↻</div>
        <div className="ctrl__rotateMsg">ROTATE TO LANDSCAPE</div>
        <div className="ctrl__rotateSub">turn the phone sideways to play</div>
      </div>
    );
  }

  const press = (dir) => (e) => {
    e.preventDefault();
    send(roomId, `${dir}:down`);
  };
  const release = (dir) => (e) => {
    e.preventDefault();
    send(roomId, `${dir}:up`);
  };

  return (
    <div className="ctrl ctrl--play">
      <div className="ctrl__topBar">
        <span className={`ctrl__pill ${paired ? 'is-on' : ''}`}>
          ● {paired ? 'LINKED' : 'WAITING'}
        </span>
        <div className="ctrl__scoreBox">
          <span className="ctrl__scoreLabel">SCORE</span>
          <span className="ctrl__scoreNum">{String(score).padStart(4, '0')}</span>
        </div>
        <span className="ctrl__room">ROOM {roomId}</span>
      </div>

      <div className="ctrl__pad">
        <button
          type="button"
          className="ctrl__btn ctrl__btn--left"
          onPointerDown={press('left')}
          onPointerUp={release('left')}
          onPointerCancel={release('left')}
          onPointerLeave={release('left')}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="Move left"
        >
          ◀
        </button>
        <button
          type="button"
          className="ctrl__btn ctrl__btn--right"
          onPointerDown={press('right')}
          onPointerUp={release('right')}
          onPointerCancel={release('right')}
          onPointerLeave={release('right')}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="Move right"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
