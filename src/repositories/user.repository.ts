import { BaseRepository } from './base.repository'
let _user: any

export class UserRepository extends BaseRepository {
    constructor({ User }: any) {
        super(User)
        _user = User
    }

    async getUserByUsername(username: string) {
        return await _user.findOne({ username })
    }
}