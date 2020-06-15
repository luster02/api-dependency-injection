import express, { Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import 'express-async-errors'
import { ErrorMidd, NotFoundMidd } from '../middlewares'

export default ({ HomeRoutes, ProductRoutes, OrgRoutes, UserRoutes }: any) => {
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
    apiRoutes.use('/user', UserRoutes)
    apiRoutes.use('/product', ProductRoutes)
    apiRoutes.use('/org', OrgRoutes)


    router.use("/v1/api", apiRoutes)

    router.use(NotFoundMidd)
    router.use(ErrorMidd)

    return router
}
