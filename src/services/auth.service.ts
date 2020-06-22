import { generateToken } from '../helpers/jwt.helper'
import { ErrorRequest } from '../helpers/error-request.helper'
let _userService: any = null
let _customerService: any

export class AuthService {
    constructor({ UserService, CustomerService }: any) {
        _userService = UserService
        _customerService = CustomerService
    }

    async signUp(user: any) {
        const { email } = user
        const userExist = await _userService.getUserByEmail(email)
        if (userExist) {
            throw ErrorRequest(400, "email already taken")
        }
        return await _userService.create(user)
    }

    async registerCustomer(customer: any) {
        const { email } = customer
        const customerExist = await _customerService.getCustomerByEmail(email)
        if (customerExist) {
            throw ErrorRequest(400, "email already taken")
        }
        return await _customerService.create(customer)
    }

    async signIn(user: any) {
        const { email, password } = user
        const userExist: any = await _userService.getUserByEmail(email)
        if (!userExist) {
            throw ErrorRequest(404, "User does not found")
        }
        const validatePassword = userExist.comparePassword(password)
        if (!validatePassword) {
            throw ErrorRequest(400, "invalid password")
        }
        const userToEncode = {
            id: userExist._id,
            name: userExist.name,
        }
        const token = generateToken(userToEncode)
        return { token, user: userExist }
    }

    async loginCustomer(customer: any) {
        const { email, password } = customer
        const customerExist: any = await _customerService.getCustomerByEmail(email)
        if (!customerExist) {
            throw ErrorRequest(400, "User does not found")
        }
        const validatePassword = customerExist.comparePassword(password)
        if (!validatePassword) {
            throw ErrorRequest(400, "invalid password")
        }
        const customerToEncode = {
            id: customerExist._id,
            name: customerExist.name,
        }
        const token = generateToken(customerToEncode)
        return { token, user: customerExist }
    }
}