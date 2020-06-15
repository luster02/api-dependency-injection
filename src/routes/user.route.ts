import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.midd'
export const UserRoutes = ({ UserController }: any) => {
    const router = Router()

    router.get('/', verifyToken, UserController.getAll)
    router.get('/:userId', UserController.get)
    router.patch('/:userId', UserController.update)
    router.delete('/:userId', UserController.delete)

    return router
}