import { BaseRepository } from './base.repository'
let _org: any

export class OrgRepository extends BaseRepository {
    constructor({ Org }: any) {
        super(Org)
        _org = Org
    }

    async getOwnerOrg(owner: any) {
        return await _org.find({ owner })
    }

}