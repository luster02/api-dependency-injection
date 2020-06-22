import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.midd'
import { uploadStrategy } from '../middlewares/multer.midd'
import cacheMidd from '../middlewares/cache.midd'
import cacheHelp from '../helpers/cache-time.helper'

export const OrgRoutes = ({ OrgController }: any) => {
    const router = Router()

    router.get('/:orgId', verifyToken, OrgController.get)
    router.get('/', [verifyToken, cacheMidd(cacheHelp.ONE_MINUTE)], OrgController.getAll)
    router.get('/owner/:owner', [verifyToken, cacheMidd(cacheHelp.FIVE_MINUTES)], OrgController.getOwnerOrg)
    router.post('/', verifyToken, OrgController.create)
    router.patch('/', verifyToken, OrgController.update)
    router.patch('/logo', [verifyToken, uploadStrategy], OrgController.updateLogo)
    router.delete('/', verifyToken, OrgController.delete)

    return router
}