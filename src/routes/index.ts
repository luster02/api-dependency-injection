import express, { Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import 'express-async-errors'
import { ErrorMidd, NotFoundMidd } from '../middlewares'

export default ({ HomeRoutes }: any) => {
    const router = Router()
    const apiRoutes = Router()

    apiRoutes
        .use(morgan('dev'))
        .use(cors({ origin: '*' }))
        .use(helmet())
        .use(compression())
        .use(express.json())
        .use(express.urlencoded({ extended: true }))

    apiRoutes.use('/home', HomeRoutes)

    router.use("/v1/api", apiRoutes)

    router.use(NotFoundMidd)
    router.use(ErrorMidd)

    return router
}
