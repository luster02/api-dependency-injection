import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.midd'
import { uploadStrategy } from '../middlewares/multer.midd'

export const ProductRoutes = ({ ProductController }: any) => {
    const router = Router()

    router.get('/:orgId', verifyToken, ProductController.get)
    router.get('/', verifyToken, ProductController.getAll)
    router.post('/', verifyToken, ProductController.create)
    router.patch('/:orgId', verifyToken, ProductController.update)
    router.patch('/img/:productId', [verifyToken, uploadStrategy], ProductController.updateImage)
    router.delete('/', verifyToken, ProductController.delete)

    return router
} 