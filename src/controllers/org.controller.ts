import { Request, Response } from 'express'

export class OrgController {
    private _orgService: any
    constructor({ OrgService }: any) {
        this._orgService = OrgService
    }

    async get(req: Request, res: Response) {
        const { orgId } = req.params
        const org = await this._orgService.get(orgId)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async getAll(req: Request, res: Response) {
        const orgs = await this._orgService.getAll()
        if (orgs) {
            return res.json({ ok: true, data: orgs })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async getOwnerOrg(req: Request, res: Response) {
        const { owner } = req.params
        const orgs = await this._orgService.getOwnerOrg(owner)
        if (orgs) {
            return res.json({ ok: true, data: orgs })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async create(req: Request, res: Response) {
        const { body } = req
        const org = await this._orgService.create(body)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { orgId } = req.params
        const org = await this._orgService.update(orgId, body)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async updateLogo(req: Request, res: Response) {
        const { file } = req
        const { orgId } = req.params
        const org = await this._orgService.updateLogo(orgId, file.path)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async delete(req: Request, res: Response) {
        const { orgId } = req.params
        const org = await this._orgService.delete(orgId)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }
}