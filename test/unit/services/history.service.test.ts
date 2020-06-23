import { HistoryService } from '../../../src/services'
import { HistoryRepositoryMock } from '../../mocks'
import { HistoryModelMock } from '../../mocks'
const { history, histories } = HistoryModelMock

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should find a history by id", async () => {
        const HistoryRepository = HistoryRepositoryMock;
        HistoryRepository.get.mockReturnValue(history);

        const _historyService = new HistoryService({ HistoryRepository });
        const expected = await _historyService.get(history._id);
        expect(expected).toMatchObject(history);
    });

    it("Should find a history by customer", async () => {
        const HistoryRepository = HistoryRepositoryMock;
        HistoryRepository.getHistoryByCustomer.mockReturnValue(history);

        const _historyService = new HistoryService({ HistoryRepository });
        const expected = await _historyService.getHistoryByCustomer(history.customer);
        expect(expected).toMatchObject(history);
    });

    it("Should find a history by org", async () => {
        const HistoryRepository = HistoryRepositoryMock;
        HistoryRepository.getHistoryByOrg.mockReturnValue(history);

        const _historyService = new HistoryService({ HistoryRepository });
        const expected = await _historyService.getHistoryByOrg(history.org);
        expect(expected).toMatchObject(history);
    });

    it("Should return a history collection", async () => {
        const HistoryRepository = HistoryRepositoryMock;
        HistoryRepository.getAll.mockReturnValue(histories);

        const _historyService = new HistoryService({ HistoryRepository });
        const expected = await _historyService.getAll();
        expect(expected).toMatchObject(histories);
    });

    it("Should update a history by id", async () => {
        const HistoryRepository = HistoryRepositoryMock;
        HistoryRepository.update.mockReturnValue(history);

        const _historyService = new HistoryService({ HistoryRepository });
        const expected = await _historyService.update(history._id, history);
        expect(expected).toMatchObject(history);
    });

    it("Should delete a history by id", async () => {
        const HistoryRepository = HistoryRepositoryMock;
        HistoryRepository.delete.mockReturnValue(true);

        const _historyService = new HistoryService({ HistoryRepository });

        const expected = await _historyService.delete(history._id);
        expect(expected).toEqual(true);
    });
});