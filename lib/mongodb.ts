import mongoose from "mongoose"

const cached = globalThis as unknown as { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }

function getMongoUri(): string | undefined {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare")
    return getCloudflareContext()?.env?.MONGODB_URI
  } catch {
    return undefined
  }
}

export async function connectDB() {
  const uri = getMongoUri()
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables")
  }

  if (!cached.mongoose) {
    cached.mongoose = { conn: null, promise: null }
  }

  if (cached.mongoose.conn) return cached.mongoose.conn

  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(uri)
  }

  cached.mongoose.conn = await cached.mongoose.promise
  return cached.mongoose.conn
}

