import { Request, Response } from 'express'
let _orgService: any

export class OrgController {
    constructor({ OrgService }: any) {
        _orgService = OrgService
    }

    async get(req: Request, res: Response) {
        const { orgId } = req.params
        const org = await _orgService.get(orgId)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async getAll(req: Request, res: Response) {
        const orgs = await _orgService.getAll()
        if (orgs) {
            return res.json({ ok: true, data: orgs })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async getOwnerOrg(req: Request, res: Response) {
        const { owner } = req.params
        const orgs = await _orgService.getOwnerOrg(owner)
        if (orgs) {
            return res.json({ ok: true, data: orgs })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async create(req: any, res: Response) {
        const { body } = req
        const { _id } = req.user
        const org = await _orgService.createOrg(body, _id)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { orgId } = req.params
        const org = await _orgService.update(orgId, body)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async updateLogo(req: Request, res: Response) {
        const { file } = req
        const { orgId } = req.params
        const org = await _orgService.updateLogo(orgId, file.path)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async delete(req: Request, res: Response) {
        const { orgId } = req.params
        const org = await _orgService.delete(orgId)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }
}