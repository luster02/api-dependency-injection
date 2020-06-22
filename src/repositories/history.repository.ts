import { BaseRepository } from './base.repository'
let _history: any

export class HistoryRepository extends BaseRepository {
    constructor({ History }: any) {
        super(History)
        _history = History
    }

    async getHistoryByCustomer(customer: string) {
        return await _history.find({ customer })
    }

    async getHistoryByOrg(org: string) {
        return await _history.find({ org })
    }
}