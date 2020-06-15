import { Router } from 'express'
import { uploadStrategy } from '../middlewares/multer.midd'

export const OrgRoutes = ({ OrgController }: any) => {
    const router = Router()

    router.get('/:orgId', OrgController.get)
    router.get('/', OrgController.getAll)
    router.get('/owner/:owner', OrgController.getOwnerOrg)
    router.post('/', OrgController.create)
    router.patch('/', OrgController.update)
    router.patch('/logo', uploadStrategy, OrgController.updateLogo)
    router.delete('/', OrgController.delete)

    return router
}