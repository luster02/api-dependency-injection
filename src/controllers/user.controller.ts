import { Request, Response } from 'express'

export class UserController {
    private _userService: any
    constructor({ UserService }: any) {
        this._userService = UserService
    }

    async get(req: Request, res: Response) {
        const { userId } = req.params
        const user = await this._userService.get(userId)
        if (user) {
            return res.json({ ok: true, data: user })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async getAll(req: Request, res: Response) {
        const users = await this._userService.getAll()
        if (users) {
            return res.json({ ok: true, data: users })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { userId } = req.params
        const user = await this._userService.update(userId, body)
        if (user) {
            return res.json({ ok: true, data: user })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async delete(req: Request, res: Response) {
        const { userId } = req.params
        const user = await this._userService.delete(userId)
        if (user) {
            return res.json({ ok: true, data: user })
        }
        return res.json({ ok: false, data: 'error' })
    }
}