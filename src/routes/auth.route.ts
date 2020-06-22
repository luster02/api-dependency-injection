import { Router } from 'express'

export const AuthRoutes = ({ AuthController }: any) => {
    const router = Router()

    router.post('/signin', AuthController.signIn)
    router.post('/signup', AuthController.signUp)
    router.post('/loginCustomer', AuthController.loginCustomer)
    router.post('/registerCustomer', AuthController.registerCustomer)

    return router
}