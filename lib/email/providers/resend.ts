import { EmailConfig, EmailProvider, SendEmailOptions } from "../types"

export function createResendProvider(config: EmailConfig): EmailProvider {
  return {
    name: "resend",

    async send(options: SendEmailOptions) {
      const apiKey = config.resendApiKey || process.env.RESEND_API_KEY

      if (!apiKey) {
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
