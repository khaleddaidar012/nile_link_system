import { NextResponse } from "next/server"

export async function GET() {
  let cfEnv = {}
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    cfEnv = ctx?.env || {}
  } catch (e) {
    cfEnv = { error: String(e) }
  }

  return NextResponse.json({ 
    envKeys: Object.keys(process.env),
    cloudflareKeys: typeof (globalThis as any).Cloudflare !== 'undefined' ? Object.keys((globalThis as any).Cloudflare) : [],
    cfEnvKeys: Object.keys(cfEnv)
  })
}
