import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.midd'

export const CustomerRoutes = ({ CustomerController }: any) => {
    const router = Router()

    router.get('/one/:customerID', verifyToken, CustomerController.get)
    router.get('/current', verifyToken, CustomerController.getCurrent)
    router.get('/all', verifyToken, CustomerController.getAll)
    router.patch('/update', verifyToken, CustomerController.update)

    return router
}