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
    JWT_SECRET: process.env.JWT_SECRET
}