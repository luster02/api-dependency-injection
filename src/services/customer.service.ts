import { BaseService } from './base.service'
let _customerRepository: any

export class CustomerService extends BaseService {
    constructor({ CustomerRepository }: any) {
        super(CustomerRepository)
        _customerRepository = CustomerRepository
    }

    async getCustomerByEmail(email: string) {
        return await _customerRepository.getCustomerByEmail(email)
    }
}