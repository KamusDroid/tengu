declare module 'nodemailer' {
  interface TransportOptions {
    host?: string
    port?: number
    secure?: boolean
    auth?: Record<string, unknown>
    [key: string]: unknown
  }

  interface MailOptions {
    from?: string
    to?: string
    subject?: string
    html?: string
    text?: string
    [key: string]: unknown
  }

  interface Transporter {
    sendMail(options: MailOptions): Promise<unknown>
  }

  const nodemailer: {
    createTransport(options: TransportOptions): Transporter
  }

  export default nodemailer
}
