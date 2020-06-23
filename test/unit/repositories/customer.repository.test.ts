import mockingoose from 'mockingoose'
import { Customer } from '../../../src/models'
import { CustomerRepository } from '../../../src/repositories'
import { CustomerModelMock } from '../../mocks'

describe("customer repository", () => {
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
    })

    it("Should find a customer by id", async () => {
        const _user = { ...CustomerModelMock.customer }
        delete _user.password
        mockingoose(Customer).toReturn(CustomerModelMock.customer, 'findOne')

        const _customerRepository = new CustomerRepository({ Customer })
        const expected = await _customerRepository.get(_user._id)
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    })

    it("Should find a customer by email", async () => {
        const _user = { ...CustomerModelMock.customer };
        delete _user.password;
        mockingoose(Customer).toReturn(CustomerModelMock.customer, "findOne");

        const _customerRepository = new CustomerRepository({ Customer });
        const expected = await _customerRepository.getCustomerByEmail(_user.email);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should return a customer collection", async () => {
        const customers: any = CustomerModelMock.customers.map(customer => {
            delete customer.password;
            return customer;
        });

        mockingoose(Customer).toReturn(customers, "find");

        const _customerRepository = new CustomerRepository({ Customer });
        const expected = await _customerRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(customers);
    });

    it("Should update an especific customer by id", async () => {
        const _user = { ...CustomerModelMock.customer };
        delete _user.password;
        mockingoose(Customer).toReturn(_user, "findOneAndUpdate");
        const _customerRepository = new CustomerRepository({ Customer });
        const expected = await _customerRepository.update(CustomerModelMock.customer._id, {
            name: "jonathan"
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should delete an especific customer by id", async () => {
        mockingoose(Customer).toReturn(CustomerModelMock.customer, "findOneAndDelete");
        const _customerRepository = new CustomerRepository({ Customer });
        const expected = await _customerRepository.delete(CustomerModelMock.customer._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });
})