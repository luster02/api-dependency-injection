import { Router } from 'express'
import { uploadStrategy } from '../middlewares/multer.midd'

export const ProductRoutes = ({ ProductController }: any) => {
    const router = Router()

    router.get('/:orgId', ProductController.get)
    router.get('/', ProductController.getAll)
    router.post('/', ProductController.create)
    router.patch('/:orgId', ProductController.update)
    router.patch('/img/:productId', uploadStrategy, ProductController.updateImage)
    router.delete('/', ProductController.delete)

    return router
} 