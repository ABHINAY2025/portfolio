import app from '../server/server.js';
import { connectDb } from '../server/db.js';

/* Vercel serverless entry. Every /api/* request is handled by the Express app,
   backed by MongoDB (set MONGO_URI + ADMIN_KEY in the Vercel project env).

   Note: the phone-controller game's SSE endpoints don't function on serverless
   (no long-lived connections / shared memory). That game is deployed separately
   at games.abhinay.online, so this only powers the contact form + admin store. */
export default async function handler(req, res) {
  await connectDb();

  // Express routes are declared with the /api prefix. Ensure req.url carries it,
  // regardless of how Vercel presents the catch-all path to the function.
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? '' : '/') + req.url;
  }

  return app(req, res);
}
