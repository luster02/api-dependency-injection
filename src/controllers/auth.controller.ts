import { Request, Response } from 'express'
let _authservice: any = null

export class AuthController {
    constructor({ AuthService }: any) {
        _authservice = AuthService
    }

    async signUp(req: Request, res: Response) {
        const { body } = req
        const createdUser = await _authservice.signUp(body)
        return res.status(201).json({ ok: true, data: createdUser })
    }

    async signIn(req: Request, res: Response) {
        const { body } = req
        const creds = await _authservice.signIn(body)
        return res.json({ ok: true, data: creds })
    }

    async loginCustomer(req: Request, res: Response) {
        const { body } = req
        const creds = await _authservice.loginCustomer(body)
        return res.json({ ok: true, data: creds })
    }

    async registerCustomer(req: Request, res: Response) {
        const { body } = req
        const createdUser = await _authservice.registerCustomer(body)
        return res.status(201).json({ ok: true, data: createdUser })
    }
}