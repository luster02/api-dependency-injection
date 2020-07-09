import { Request, Response } from 'express'
let _customerService: any

export class CustomerController {
    constructor({ CustomerService }: any) {
        _customerService = CustomerService
    }

    async get(req: Request, res: Response) {
        const { customerID } = req.params
        const customer = await _customerService.get(customerID)
        return res.json({ ok: true, data: customer })
    }

    async getCurrent(req: any, res: Response) {
        const { _id } = req.user
        const customer = await _customerService.get(_id)
        return res.json({ ok: true, data: customer })
    }

    async getAll(req: Request, res: Response) {
        const customers = await _customerService.getAll()
        return res.json({ ok: true, data: customers })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { customerID } = req.params
        const customer = await _customerService.update(customerID, body)
        return res.json({ ok: true, data: customer })
    }

}