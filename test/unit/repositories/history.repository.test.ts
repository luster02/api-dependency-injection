import mockingoose from 'mockingoose'
import { History } from '../../../src/models'
import { HistoryRepository } from '../../../src/repositories'
import { HistoryModelMock } from '../../mocks'

describe("history repository", () => {
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
    })

    it("Should find a history by id", async () => {
        const _history = { ...HistoryModelMock.history }
        mockingoose(History).toReturn(HistoryModelMock.history, 'findOne')

        const _historyRepository = new HistoryRepository({ History })
        const expected = await _historyRepository.get(_history._id)
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_history);
    })

    it("Should return a history collection", async () => {
        const histories: any = HistoryModelMock.histories.map(history => {
            return history;
        });

        mockingoose(History).toReturn(histories, "find");

        const _historyRepository = new HistoryRepository({ History });
        const expected = await _historyRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(histories);
    });

    it("Should return a history collection by customer", async () => {
        const _history = { ...HistoryModelMock.history };
        const histories: any = HistoryModelMock.histories.map(history => {
            return history;
        });

        mockingoose(History).toReturn(histories, "find");

        const _historyRepository = new HistoryRepository({ History });
        const expected = await _historyRepository.getHistoryByCustomer(_history.customer);
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(histories);
    });

    it("Should return a history collection by org", async () => {
        const _history = { ...HistoryModelMock.history };
        const histories: any = HistoryModelMock.histories.map(history => {
            return history;
        });

        mockingoose(History).toReturn(histories, "find");

        const _historyRepository = new HistoryRepository({ History });
        const expected = await _historyRepository.getHistoryByOrg(_history.org);
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(histories);
    });

    it("Should update an especific history by id", async () => {
        const _history = { ...HistoryModelMock.history };
        mockingoose(History).toReturn(_history, "findOneAndUpdate");
        const _historyRepository = new HistoryRepository({ History });
        const expected = await _historyRepository.update(HistoryModelMock.history._id, {
            completed: false
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_history);
    });

    it("Should delete an especific history by id", async () => {
        mockingoose(History).toReturn(HistoryModelMock.history, "findOneAndDelete");
        const _historyRepository = new HistoryRepository({ History });
        const expected = await _historyRepository.delete(HistoryModelMock.history._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });
})