import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'PRODUCTION') {
    config()
}

export default {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
}