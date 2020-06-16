import { Router } from 'express'
import { uploadStrategy } from '../middlewares/multer.midd'
import cacheMidd from '../middlewares/cache.midd'
import cacheHelp from '../helpers/cache-time.helper'

export const OrgRoutes = ({ OrgController }: any) => {
    const router = Router()

    router.get('/:orgId', OrgController.get)
    router.get('/', cacheMidd(cacheHelp.ONE_MINUTE), OrgController.getAll)
    router.get('/owner/:owner', cacheMidd(cacheHelp.FIVE_MINUTES), OrgController.getOwnerOrg)
    router.post('/', OrgController.create)
    router.patch('/', OrgController.update)
    router.patch('/logo', uploadStrategy, OrgController.updateLogo)
    router.delete('/', OrgController.delete)

    return router
}