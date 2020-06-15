import { Request, Response } from 'express'

export class ProductController {
    private _productService: any
    constructor({ ProductService }: any) {
        this._productService = ProductService
    }

    async get(req: Request, res: Response) {
        const { orgId } = req.params
        const org = await this._productService.get(orgId)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async getAll(req: Request, res: Response) {
        const orgs = await this._productService.getAll()
        if (orgs) {
            return res.json({ ok: true, data: orgs })
        }
        return res.json({ ok: false, data: 'error' })
    }

    async create(req: Request, res: Response) {
        const { body } = req
        const { orgId } = req.params
        const org = await this._productService.createProduct(orgId, body)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { orgId } = req.params
        const org = await this._productService.update(orgId, body)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async updateImage(req: Request, res: Response) {
        const { file } = req
        const { productId } = req.params
        const product = await this._productService.updateImage(productId, file.path)
        if (product) {
            return res.json({ ok: true, data: product })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }

    async delete(req: Request, res: Response) {
        const { orgId, productId } = req.params
        const org = await this._productService.deleteProduct(orgId, productId)
        if (org) {
            return res.json({ ok: true, data: org })
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }
}