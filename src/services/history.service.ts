import { BaseService } from './base.service'
import { ErrorRequest } from '../helpers/error-request.helper'
let _historyRepository: any

export class HistoryService extends BaseService {
    constructor({ HistoryRepository }: any) {
        super(HistoryRepository)
        _historyRepository = HistoryRepository
    }

    async getHistoryByCustomer(customer: string) {
        return await _historyRepository.getHistoryByCustomer(customer)
    }

    async getHistoryByOrg(orgID: string) {
        return await _historyRepository.getHistoryByOrg(orgID)
    }

    async createHistory(customer: string, orgID: string) {
        return await _historyRepository.create({ customer, org: orgID })
    }

    async addProduct(product: string, historyID: string) {
        if (historyID) {
            throw ErrorRequest(400, "historyID must be sent")
        }
        const history = await _historyRepository.get(historyID)
        if (!history) {
            throw ErrorRequest(404, "history does not exist")
        }
        history.products.push(product)
        return await _historyRepository.update(historyID, { products: history.products })
    }

}