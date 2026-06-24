import app from '../server/server.js';
import { connectDb } from '../server/db.js';

/* Vercel serverless entry. vercel.json rewrites every /api/* request (any depth)
   to this single function, which runs the Express app backed by MongoDB.
   Set MONGO_URI + ADMIN_KEY in the Vercel project environment.

   The phone-controller game's SSE endpoints don't work on serverless (no
   long-lived connections); that game is deployed separately at
   games.abhinay.online, so this only powers the contact form + admin store. */
export default async function handler(req, res) {
  await connectDb();

  // Express routes are declared with the /api prefix. Vercel preserves the
  // original path on a rewrite, but guard in case it arrives without it.
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? '' : '/') + req.url;
  }

  return app(req, res);
}
