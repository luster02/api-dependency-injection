import nodemailer from 'nodemailer'
import config from '../config'

export const transpoter = nodemailer.createTransport({
    host: String(config.MAIL_HOST),
    port: Number(config.MAIL_PORT),
    secure: false,
    auth: {
        user: String(config.MAIL_USER),
        pass: String(config.MAIL_PASS)
    },
})

export function createMessage(to: string, subject: string, url: any) {
    return {
        from: String(config.MAIL_USER),
        to,
        subject,
        html: `
            <h1>Hi ${to} you can reset your password in this link:</h1>
            <a href="${url}">${url}</a>
            <p> this link active only for 15 minutes </p>
         `
    }
}