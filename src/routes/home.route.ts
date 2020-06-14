import { Router } from 'express'

export const HomeRoutes = ({ HomeController }: any) => {
    const router = Router()

    router.get('/', HomeController.index)

    return router
}