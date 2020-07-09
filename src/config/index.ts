import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'PRODUCTION') {
    config()
}

export default {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_ENV: process.env.CLOUDINARY_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    CACHE_KEY: process.env.CACHE_KEY,
    STRIPE_KEY: process.env.STRIPE_KEY,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    CLIENT_HOST: process.env.CLIENT_HOST
}