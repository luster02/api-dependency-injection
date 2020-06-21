import mockingoose from 'mockingoose'
import { User } from '../../../src/models'
import { UserRepository } from '../../../src/repositories'
import { UserModelMock } from '../../mocks'

describe("user repository", () => {
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
    })

    it("Should find a user by id", async () => {
        const _user = { ...UserModelMock.user }
        delete _user.password
        mockingoose(User).toReturn(UserModelMock.user, 'findOne')

        const _userRepository = new UserRepository({ User })
        const expected = await _userRepository.get(_user._id)
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    })
})