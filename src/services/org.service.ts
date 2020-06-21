import { BaseService } from "./base.service";
import { cloudinaryConfig, deletePhoto, uploadPhoto } from '../helpers/cludinary.helper'

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
                const error: any = new Error()
                error.status = 400
                error.message = "orgId must be sent"
                throw error
            }
            const org = await _orgRepository.get(orgId)
            if (!org) {
                const error: any = new Error()
                error.status = 404
                error.message = "org does not exist"
                throw error
            }
            if (org.logoId) {
                await deletePhoto(org.logoId)
            }
            const { secure_url, public_id } = await uploadPhoto(file)
            return await _orgRepository.update(orgId, { logoUrl: secure_url, logoId: public_id })
        } catch (error) {
            console.log(error)
            return null
        }
    }

}