# devXchange — portfolio

Retro pixel-art personal portfolio. Vite + React frontend with an Express API
(content editor, contact/lead capture, and a phone-as-controller mini-game).
Content, uploaded files, and leads are stored in MongoDB.

## Develop

```bash
npm install
cp .env.example .env   # fill in MONGO_URI (and a strong ADMIN_KEY)
npm run dev            # Vite on :5173, API on :5174 (proxied)
```

## Build & run (single origin)

```bash
npm start              # builds dist/ then serves frontend + API on :5174
```

## Environment

See `.env.example`. The server falls back to local-disk storage if `MONGO_URI`
is unset (dev only — not safe on ephemeral hosts).

| var | purpose |
|-----|---------|
| `MONGO_URI` | MongoDB connection string (content, uploads, leads) |
| `ADMIN_KEY` | passcode for the `/admin` content editor |
| `API_PORT`  | API port (default `5174`) |

## Deploy

Use an always-on Node host (Render / Railway / Fly.io) — **not** serverless
functions, since the game uses long-lived SSE connections.

- Build command: `npm install && npm run build`
- Start command: `node server/server.js`
- Set `MONGO_URI` and `ADMIN_KEY` env vars on the host.
