import container from './startup/container'
import mongoose from 'mongoose'
const server: any = container.resolve("app")
const { MONGO_URI } = container.resolve("config")

mongoose.set("useCreateIndex", true)
mongoose.set('useFindAndModify', false)
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await server.start()
        console.log('database is connected')
    })
    .catch(console.error)