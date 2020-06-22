import { BaseRepository } from './base.repository'
let _customer: any

export class CustomerRepository extends BaseRepository {
    constructor({ Customer }: any) {
        super(Customer)
        _customer = Customer
    }

    async getCustomerByEmail(email: string) {
        return await _customer.findOne({ email })
    }
}