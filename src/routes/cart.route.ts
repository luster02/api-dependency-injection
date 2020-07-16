import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.midd'

export const CartRoutes = ({ CartController }: any) => {
    const router = Router()

    router.post('/create', verifyToken, CartController.create)
    router.get('/:customer', verifyToken, CartController.getCartByCustomer)
    router.get('/add/:product/:cartID', verifyToken, CartController.addProduct)
    router.get('/remove/:product/:cartID', verifyToken, CartController.removeProduct)
    router.get('/price/:cartID', verifyToken, CartController.getTotalPrice)
    router.post('/pay/:cartID/:orgID', verifyToken, CartController.payCart)

    return router
}