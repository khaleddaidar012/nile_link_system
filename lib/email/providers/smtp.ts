import nodemailer from "nodemailer"
import { EmailConfig, EmailProvider, SendEmailOptions } from "../types"

export function createSmtpProvider(config: EmailConfig): EmailProvider {
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  return {
    name: "smtp",

    async send(options: SendEmailOptions) {
      // Authenticated sender address to ensure strict SPF/DKIM/DMARC delivery
      const senderEmail = config.smtpUser || config.from
      const from = `\"NileLink Logistics\" <${senderEmail}>`

      const info = await transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      })

      console.log(`[SMTP SENT]: To=${options.to}, MessageId=${info.messageId}, Accepted=${JSON.stringify(info.accepted)}, Response=${info.response}`)
      return { success: true, messageId: info.messageId }
    },
  }
}
