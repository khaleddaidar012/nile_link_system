import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ 
    envKeys: Object.keys(process.env),
    hasMongo: !!process.env.MONGODB_URI,
    mongoType: typeof process.env.MONGODB_URI,
    hasGlobalThisEnv: !!(globalThis as any).env,
    globalKeys: Object.keys(globalThis)
  })
}
