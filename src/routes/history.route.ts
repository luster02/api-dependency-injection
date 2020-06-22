import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.midd'

export const HistoryRoutes = ({ HistoryController }: any) => {
    const router = Router()

    router.get('/customer', verifyToken, HistoryController.getHistoryByCustomer)
    router.get('/getHistoryByOrg/:orgID', verifyToken, HistoryController.getHistoryByOrg)
    router.get('/one/:historyId', verifyToken, HistoryController.get)
    router.patch('/update/:historyId', verifyToken, HistoryController.update)

    return router
}