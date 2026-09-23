import { EmailConfig } from "./types"
import { CONTACT } from "@/constants/contact"

export function getEmailConfig(): EmailConfig {
  let cfEnv: any = {}
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare")
    cfEnv = getCloudflareContext()?.env || {}
  } catch (e) {
    // Ignore error if not in Cloudflare environment
  }

  const env = { ...process.env, ...cfEnv }
  const provider = (env.EMAIL_PROVIDER as EmailConfig["provider"]) || "resend"

  return {
    provider,
    from: env.EMAIL_FROM || CONTACT.EMAIL,
    to: env.EMAIL_TO || CONTACT.EMAIL,
    resendApiKey: env.RESEND_API_KEY,
    smtpHost: env.SMTP_HOST || env.EMAIL_SERVER_HOST,
    smtpPort: parseInt(env.SMTP_PORT || env.EMAIL_SERVER_PORT || "587", 10),
    smtpUser: env.SMTP_USER || env.EMAIL_SERVER_USER,
    smtpPass: env.SMTP_PASS || env.EMAIL_SERVER_PASSWORD,
    smtpSecure: env.SMTP_SECURE === "true",
  }
}

