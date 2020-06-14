import { BaseService } from "./base.service";
let _orgRepository: any = null

export class OrgService extends BaseService {
    constructor({ OrgRepository }: any) {
        super(OrgRepository)
        _orgRepository = OrgRepository
    }

    async getOwnerOrg(owner: any) {
        return await _orgRepository.getOwnerOrg(owner)
    }

}