import mockingoose from 'mockingoose'
import { Org } from '../../../src/models'
import { OrgRepository } from '../../../src/repositories'
import { OrgModelMock } from '../../mocks'

describe("user repository", () => {
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
    })

    it("Should find a org by id", async () => {
        const _org = { ...OrgModelMock.org }
        mockingoose(Org).toReturn(OrgModelMock.org, 'findOne')

        const _orgRepository = new OrgRepository({ Org })
        const expected = await _orgRepository.get(_org._id)
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_org);
    })

    it("Should find a user by owner", async () => {
        const _org = { ...OrgModelMock.org };
        mockingoose(Org).toReturn(OrgModelMock.org, "findOne");

        const _orgRepository = new OrgRepository({ Org });
        const expected = await _orgRepository.getOwnerOrg(_org.owner);
    
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_org);
    });

    it("Should return a orgs collection", async () => {
        const orgs: any = OrgModelMock.orgs.map(org => {
            return org;
        });

        mockingoose(Org).toReturn(orgs, "find");

        const _orgRepository = new OrgRepository({ Org });
        const expected = await _orgRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(orgs);
    });

    it("Should update an especific org by id", async () => {
        const _org = { ...OrgModelMock.org };
        mockingoose(Org).toReturn(_org, "findOneAndUpdate");
        const _orgRepository = new OrgRepository({ Org });
        const expected = await _orgRepository.update(OrgModelMock.org._id, {
            name: "test updated"
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_org);
    });

    it("Should delete an especific org by id", async () => {
        mockingoose(Org).toReturn(OrgModelMock.org, "findOneAndDelete");
        const _orgRepository = new OrgRepository({ Org });
        const expected = await _orgRepository.delete(OrgModelMock.org._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });
})