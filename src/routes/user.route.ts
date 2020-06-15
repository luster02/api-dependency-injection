import { Router } from 'express'

export const UserRoutes = ({ UserController }: any) => {
    const router = Router()

    router.get('/', UserController.getAll)
    router.get('/:userId', UserController.get)
    router.patch('/:userId', UserController.update)
    router.delete('/:userId', UserController.delete)

    return router
}