import { generateToken } from '../helpers/jwt.helper'
let _userService: any = null

export class AuthService {
    constructor({ UserService }: any) {
        _userService = UserService
    }

    async signUp(user: any) {
        const { email } = user
        const userExist = await _userService.getUserByEmail(email)
        if (userExist) {
            const error: any = new Error()
            error.status = 400
            error.message = "User already taken"
            throw error
        }
        return await _userService.create(user)
    }

    async signIn(user: any) {
        const { email, password } = user
        const userExist: any = await _userService.getUserByEmail(email)
        if (!userExist) {
            const error: any = new Error()
            error.status = 404
            error.message = "User does not found"
            throw error
        }
        const validatePassword = userExist.comparePassword(password)
        if (!validatePassword) {
            const error: any = new Error()
            error.status = 400
            error.message = "invalid password"
            throw error
        }
        const userToEncode = {
            id: userExist._id,
            name: userExist.name,
        }
        const token = generateToken(userToEncode)
        return { token, user: userExist }
    }
}