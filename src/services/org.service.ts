import { BaseService } from "./base.service";
import { cloudinaryConfig, deletePhoto, uploadPhoto } from '../helpers/cludinary.helper'
import { ErrorRequest } from '../helpers/error-request.helper'
import { removeFile } from '../helpers/fs.helper'

let _orgRepository: any = null
let _config: any = null

export class OrgService extends BaseService {
    constructor({ config, OrgRepository }: any) {
        super(OrgRepository)
        _orgRepository = OrgRepository
        _config = config
        this.startCloud()
    }

    private startCloud() {
        cloudinaryConfig(
            _config.CLOUDINARY_NAME,
            _config.CLOUDINARY_KEY,
            _config.CLOUDINARY_SECRET
        )
    }

    async createOrg(org: any, owner: string) {
        return await _orgRepository.create({ ...org, owner })
    }

    async getOwnerOrg(owner: any) {
        return await _orgRepository.getOwnerOrg(owner)
    }

    async updateLogo(orgId: any, file: any) {
        try {
            if (!orgId) {
                throw ErrorRequest(400, "orgId must be sent")
            }
            const org = await _orgRepository.get(orgId)
            if (!org) {
                throw ErrorRequest(404, "org does not exist")
            }
            if (org.logoId) {
                await deletePhoto(org.logoId)
            }
            const { public_id, secure_url } = await uploadPhoto(file)
            if (public_id) {
                await removeFile(file)
                return await _orgRepository.update(orgId, { logoUrl: secure_url, logoId: public_id })
            }
            return
        } catch (error) {
            console.log(error)
            return null
        }
    }

}