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
    cfEnvKeys: Object.keys(cfEnv),
    checks: {
      has_MONGODB_URI: Boolean(process.env.MONGODB_URI || (cfEnv as any)?.MONGODB_URI),
      has_RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY || (cfEnv as any)?.RESEND_API_KEY),
      has_AUTH_SECRET: Boolean(process.env.AUTH_SECRET || (cfEnv as any)?.AUTH_SECRET),
      has_JWT_SECRET: Boolean(process.env.JWT_SECRET || (cfEnv as any)?.JWT_SECRET),
      has_EMAIL_FROM: Boolean(process.env.EMAIL_FROM || (cfEnv as any)?.EMAIL_FROM),
    }
  })
}
