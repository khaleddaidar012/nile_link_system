import { EmailConfig, EmailProvider, SendEmailOptions } from "../types"

export function createResendProvider(config: EmailConfig): EmailProvider {
  return {
    name: "resend",

    async send(options: SendEmailOptions) {
      const apiKey = config.resendApiKey || process.env.RESEND_API_KEY

      if (!apiKey) {
        if (process.env.NODE_ENV !== "production") {
          console.log("\n==================================================")
          console.log("[MOCK EMAIL DISPATCH] (No RESEND_API_KEY found)")
          console.log(`To: ${options.to || config.to}`)
          console.log(`Subject: ${options.subject}`)
          console.log("==================================================\n")
          return { success: true, messageId: "mock-id-dev" }
        }
        return { success: false, error: "RESEND_API_KEY is not configured" }
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: config.from,
          to: [options.to],
          subject: options.subject,
          html: options.html,
        }),
      })

      if (!response.ok) {
        const errorBody = await response.text()
        return {
          success: false,
          error: `Resend API error ${response.status}: ${errorBody}`,
        }
      }

      const data = (await response.json()) as { id?: string }
      return { success: true, messageId: data.id }
    },
  }
}
