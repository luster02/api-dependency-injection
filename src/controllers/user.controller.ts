import { Request, Response } from 'express'
let _userService: any

export class UserController {
    constructor({ UserService }: any) {
        _userService = UserService
    }

    async get(req: Request, res: Response) {
        const { userId } = req.params
        const user = await _userService.get(userId)
        if (user) {
            return res.json({ ok: true, data: user })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async getAll(req: Request, res: Response) {
        const users = await _userService.getAll()
        if (users) {
            return res.json({ ok: true, data: users })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { userId } = req.params
        const user = await _userService.update(userId, body)
        if (user) {
            return res.json({ ok: true, data: user })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async delete(req: Request, res: Response) {
        const { userId } = req.params
        const user = await _userService.delete(userId)
        if (user) {
            return res.json({ ok: true, data: user })
        }
        return res.json({ ok: false, data: 'error' })
    }
}