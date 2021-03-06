import { Request, Response } from 'express'
let _historyService: any = null

export class HistoryController {
    constructor({ HistoryService }: any) {
        _historyService = HistoryService
    }

    async getHistoryByCustomer(req: any, res: Response) {
        const { _id } = req.user
        const history = await _historyService.getHistoryByCustomer(_id)
        return res.json({ ok: true, data: history })
    }

    async getHistoryByOrg(req: Request, res: Response) {
        const { orgID } = req.params
        const history = await _historyService.getHistoryByOrg(orgID)
        return res.json({ ok: true, data: history })
    }

    async get(req: Request, res: Response) {
        const { historyId } = req.params
        const history = await _historyService.get(historyId)
        return res.json({ ok: true, data: history })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { historyId } = req.params
        const history = await _historyService.update(historyId, body)
        return res.json({ ok: true, data: history })
    }
}