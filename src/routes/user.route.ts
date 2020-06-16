import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.midd'
import cacheMidd from '../middlewares/cache.midd'
import cacheHelp from '../helpers/cache-time.helper'

export const UserRoutes = ({ UserController }: any) => {
    const router = Router()

    router.get('/', [verifyToken, cacheMidd(cacheHelp.ONE_MINUTE)], UserController.getAll)
    router.get('/:userId', UserController.get)
    router.patch('/:userId', UserController.update)
    router.delete('/:userId', UserController.delete)

    return router
}