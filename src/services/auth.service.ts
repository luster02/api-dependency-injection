import { generateToken } from '../helpers/jwt.helper'
import { ErrorRequest } from '../helpers/error-request.helper'
let _userService: any = null
let _customerService: any
let _cartService: any = null

export class AuthService {
    constructor({ UserService, CustomerService, CartService }: any) {
        _userService = UserService
        _customerService = CustomerService
        _cartService = CartService
    }

    async signUp(user: any) {
        const { email } = user
        const userExist = await _userService.getUserByEmail(email)
        if (userExist) {
            throw ErrorRequest(400, "email already taken")
        }
        const userCreated = await _userService.create(user)
        const userToEncode = {
            _id: userCreated._id,
            name: userCreated.name,
        }
        const token = generateToken(userToEncode)
        return { token, user: userCreated }
    }

    async registerCustomer(customer: any) {
        const { email } = customer
        const customerExist = await _customerService.getCustomerByEmail(email)
        if (customerExist) {
            throw ErrorRequest(400, "email already taken")
        }
        const userCreated = await _customerService.create(customer)
        const userToEncode = {
            _id: userCreated._id,
            name: userCreated.name,
        }
        const token = generateToken(userToEncode)
        await _cartService.createCart(userCreated._id)
        return { token, user: userCreated }
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
            _id: userExist._id,
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
            _id: customerExist._id,
            name: customerExist.name,
        }
        const token = generateToken(customerToEncode)
        return { token, user: customerExist }
    }
}