import { Request, Response } from 'express'
let _orgService: any

export class OrgController {
    constructor({ OrgService }: any) {
        _orgService = OrgService
    }

    async get(req: Request, res: Response) {
        const { orgId } = req.params
        const org = await _orgService.get(orgId)
        return res.json({ ok: true, data: org })
    }

    async getAll(req: Request, res: Response) {
        const orgs = await _orgService.getAll()
        return res.json({ ok: true, data: orgs })
    }

    async getOwnerOrg(req: Request, res: Response) {
        const { owner } = req.params
        const orgs = await _orgService.getOwnerOrg(owner)
        return res.json({ ok: true, data: orgs })
    }

    async create(req: any, res: Response) {
        const { body } = req
        const { _id } = req.user
        const org = await _orgService.createOrg(body, _id)
        return res.json({ ok: true, data: org })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { orgId } = req.params
        const org = await _orgService.update(orgId, body)
        return res.json({ ok: true, data: org })
    }

    async updateLogo(req: Request, res: Response) {
        const { file } = req
        const { orgId } = req.params
        const org = await _orgService.updateLogo(orgId, file.path)
        return res.json({ ok: true, data: org })
    }

    async delete(req: Request, res: Response) {
        const { orgId } = req.params
        await _orgService.delete(orgId)
        return res.json({ ok: true, data: 'deleted' })
    }
}