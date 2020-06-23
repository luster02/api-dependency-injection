import { UserService as userService } from '../../../src/services'
import { UserRepositoryMock } from '../../mocks'
import { UserModelMock } from '../../mocks'
const { user, users } = UserModelMock
const UserService: any = userService

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should find a user by id", async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.get.mockReturnValue(user);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.get(user._id);
        expect(expected).toMatchObject(user);
    });

    it("Should find a user by username", async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.getUserByEmail.mockReturnValue(user);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.getUserByEmail(user.email);
        expect(expected).toMatchObject(user);
    });

    it("Should return a user collection", async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.getAll.mockReturnValue(users);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.getAll();
        expect(expected).toMatchObject(users);
    });

    it("Should update a user by id", async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.update.mockReturnValue(user);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.update(user._id, user);
        expect(expected).toMatchObject(user);
    });

    it("Should delete a user by id", async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.delete.mockReturnValue(true);

        const _userService = new UserService({ UserRepository });

        const expected = await _userService.delete(user._id);
        expect(expected).toEqual(true);
    });
});