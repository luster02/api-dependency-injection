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

    it("Should find a user by email", async () => {
        const _user = { ...UserModelMock.user };
        delete _user.password;
        mockingoose(User).toReturn(UserModelMock.user, "findOne");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getUserByEmail(_user.email);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should return a user collection", async () => {
        const users: any = UserModelMock.users.map(user => {
            delete user.password;
            return user;
        });

        mockingoose(User).toReturn(users, "find");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
    });

    it("Should update an especific user by id", async () => {
        const _user = { ...UserModelMock.user };
        delete _user.password;
        mockingoose(User).toReturn(_user, "findOneAndUpdate");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.update(UserModelMock.user._id, {
            name: "Marluan"
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should delete an especific user by id", async () => {
        mockingoose(User).toReturn(UserModelMock.user, "findOneAndDelete");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.delete(UserModelMock.user._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });
})