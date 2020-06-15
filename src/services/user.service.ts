import { BaseService } from "./base.service";
let _userRepository: any = null

export class UserService extends BaseService {
    constructor({ UserRepository }: any) {
        super(UserRepository)
        _userRepository = UserRepository
    }

    async getUserByEmail(email: string) {
        return await _userRepository.getUserByEmail(email)
    }

}