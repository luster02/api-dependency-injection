import { CustomerService as customerService} from '../../../src/services'
import { CustomerRepositoryMock } from '../../mocks'
import { CustomerModelMock } from '../../mocks'
const { customer, customers } = CustomerModelMock
const CustomerService: any = customerService

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should find a customer by id", async () => {
        const CustomerRepository = CustomerRepositoryMock;
        CustomerRepository.get.mockReturnValue(customer);

        const _customerService = new CustomerService({ CustomerRepository });
        const expected = await _customerService.get(customer._id);
        expect(expected).toMatchObject(customer);
    });

    it("Should find a customer by username", async () => {
        const CustomerRepository = CustomerRepositoryMock;
        CustomerRepository.getCustomerByEmail.mockReturnValue(customer);

        const _customerService = new CustomerService({ CustomerRepository });
        const expected = await _customerService.getCustomerByEmail(customer.email);
        expect(expected).toMatchObject(customer);
    });

    it("Should return a customer collection", async () => {
        const CustomerRepository = CustomerRepositoryMock;
        CustomerRepository.getAll.mockReturnValue(customers);

        const _customerService = new CustomerService({ CustomerRepository });
        const expected = await _customerService.getAll();
        expect(expected).toMatchObject(customers);
    });

    it("Should update a customer by id", async () => {
        const CustomerRepository = CustomerRepositoryMock;
        CustomerRepository.update.mockReturnValue(customer);

        const _customerService = new CustomerService({ CustomerRepository });
        const expected = await _customerService.update(customer._id, customer);
        expect(expected).toMatchObject(customer);
    });

    it("Should delete a customer by id", async () => {
        const CustomerRepository = CustomerRepositoryMock;
        CustomerRepository.delete.mockReturnValue(true);

        const _customerService = new CustomerService({ CustomerRepository });

        const expected = await _customerService.delete(customer._id);
        expect(expected).toEqual(true);
    });
});