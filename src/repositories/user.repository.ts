import { BaseRepository } from './base.repository'
let _user: any

export class UserRepository extends BaseRepository {
    constructor({ User }: any) {
        super(User)
        _user = User
    }

    async getUserByEmail(email: string) {
        return await _user.findOne({ email })
    }
}