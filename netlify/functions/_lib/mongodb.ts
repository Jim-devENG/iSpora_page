import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string | undefined;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set. API routes will fail on Vercel without it.');
}

declare global {
  // eslint-disable-next-line no-var
  var __mongooseConnection: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

export async function connectToDatabase() {
  if (!MONGODB_URI) throw new Error('Missing MONGODB_URI env var');

  if (!global.__mongooseConnection) {
    global.__mongooseConnection = { conn: null, promise: null };
  }

  if (global.__mongooseConnection.conn) {
    return global.__mongooseConnection.conn;
  }

  if (!global.__mongooseConnection.promise) {
    global.__mongooseConnection.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || 'ispora',
    });
  }

  global.__mongooseConnection.conn = await global.__mongooseConnection.promise;
  return global.__mongooseConnection.conn;
}


