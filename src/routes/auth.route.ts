import { Router } from 'express'

export const AuthRoutes = ({ AuthController }: any) => {
    const router = Router()

    router.post('/signin', AuthController.signIn)
    router.post('/signup', AuthController.signUp)

    return router
}