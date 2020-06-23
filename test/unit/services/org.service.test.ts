import { OrgService as orgService } from '../../../src/services'
import config from '../../../src/config/index'
import { OrgRepositoryMock } from '../../mocks'
import { OrgModelMock } from '../../mocks'
const { org, orgs } = OrgModelMock
const OrgService: any = orgService

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should find a org by id", async () => {
        const OrgRepository = OrgRepositoryMock;
        OrgRepository.get.mockReturnValue(org);

        const _orgService = new OrgService({ config, OrgRepository });
        const expected = await _orgService.get(org._id);
        expect(expected).toMatchObject(org);
    });

    it("Should find a org by owner", async () => {
        const OrgRepository = OrgRepositoryMock;
        OrgRepository.getOwnerOrg.mockReturnValue(org);

        const _orgService = new OrgService({ config, OrgRepository });
        const expected = await _orgService.getOwnerOrg(org.owner);
        expect(expected).toMatchObject(org);
    });

    it("Should return a org collection", async () => {
        const OrgRepository = OrgRepositoryMock;
        OrgRepository.getAll.mockReturnValue(orgs);

        const _orgService = new OrgService({ config, OrgRepository });
        const expected = await _orgService.getAll();
        expect(expected).toMatchObject(orgs);
    });

    it("Should update a org by id", async () => {
        const OrgRepository = OrgRepositoryMock;
        OrgRepository.update.mockReturnValue(org);

        const _orgService = new OrgService({ config, OrgRepository });
        const expected = await _orgService.update(org._id, org);
        expect(expected).toMatchObject(org);
    });

    it("Should delete a org by id", async () => {
        const OrgRepository = OrgRepositoryMock;
        OrgRepository.delete.mockReturnValue(true);

        const _orgService = new OrgService({ config, OrgRepository });

        const expected = await _orgService.delete(org._id);
        expect(expected).toEqual(true);
    });
});