import { Request, Response } from 'express'
let _productService: any

export class ProductController {
    constructor({ ProductService }: any) {
        _productService = ProductService
    }

    async get(req: Request, res: Response) {
        const { orgId } = req.params
        const org = await _productService.get(orgId)
        return res.json({ ok: true, data: org })

    }

    async getAll(req: Request, res: Response) {
        const orgs = await _productService.getAll()
        return res.json({ ok: true, data: orgs })

    }

    async create(req: Request, res: Response) {
        const { body } = req
        const { orgId } = req.params
        const org = await _productService.createProduct(orgId, body)
        return res.json({ ok: true, data: org })

    }

    async update(req: Request, res: Response) {
        const { body } = req
        const { orgId } = req.params
        const org = await _productService.update(orgId, body)
        return res.json({ ok: true, data: org })

    }

    async updateImage(req: Request, res: Response) {
        const { file } = req
        const { productId } = req.params
        const product = await _productService.updateImage(productId, file.path)
        return res.json({ ok: true, data: product })
    }

    async delete(req: Request, res: Response) {
        const { orgId, productId } = req.params
        await _productService.deleteProduct(orgId, productId)
        return res.json({ ok: true, data: 'deleted' })
    }
}