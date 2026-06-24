import { MongoClient } from 'mongodb';

/* MongoDB connection for the content store + uploaded files.

   The whole app degrades gracefully: if MONGO_URI is unset or the cluster
   can't be reached, connectDb() returns null and the server keeps using
   local-disk storage (fine for dev, lossy on ephemeral hosts). */

let client = null;
let db = null;

export async function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('[db] MONGO_URI not set — using local-disk storage (dev fallback)');
    return null;
  }
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
    console.log(`[db] connected to MongoDB → db "${db.databaseName}"`);
    return db;
  } catch (e) {
    console.error(`[db] connection failed (${e.message}) — falling back to disk`);
    client = null;
    db = null;
    return null;
  }
}

export function getDb() {
  return db;
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
