import { Request, Response } from 'express'
let _cartService: any

export class CartController {
    constructor({ CartService }: any) {
        _cartService = CartService
    }

    async getCartByCustomer(req: Request, res: Response) {
        const { customer } = req.params
        const cart = await _cartService.getCartByCustomer(customer)
        if (!cart) {
            return res.status(400).json({ ok: false, data: 'error' })
        }
        return res.json({ ok: true, data: cart })
    }

    async create(req: any, res: Response) {
        const { _id } = req.user
        const cart = await _cartService.createCart(_id)
        if (!cart) {
            return res.status(400).json({ ok: false, data: 'error' })
        }
        return res.json({ ok: true, data: cart })
    }

    async addProduct(req: Request, res: Response) {
        const { product, cartID } = req.params
        const cart = await _cartService.addProduct(product, cartID)
        if (!cart) {
            return res.status(400).json({ ok: false, data: 'error' })
        }
        return res.json({ ok: true, data: cart })
    }

    async removeProduct(req: Request, res: Response) {
        const { product, cartID } = req.params
        const cart = await _cartService.removeProduct(product, cartID)
        if (!cart) {
            return res.status(400).json({ ok: false, data: 'error' })
        }
        return res.json({ ok: true, data: cart })
    }

    async getTotalPrice(req: Request, res: Response) {
        const { cartID } = req.params
        const cart = await _cartService.getTotalPrice(cartID)
        if (!cart) {
            return res.status(400).json({ ok: false, data: 'error' })
        }
        return res.json({ ok: true, data: cart })
    }

    async payCart(req: any, res: Response) {
        const { cartID, orgID } = req.params
        const { _id } = req.user
        const cart = await _cartService.getTotalPrice(cartID)
        if (cart) {
            const paymentIntent = await _cartService.payCart(cartID, cart.totalPrice, _id, orgID)
            if (paymentIntent) {

                return res.json({ ok: true, data: cart })
            } else {
                return res.status(400).json({ ok: false, data: 'error' })
            }
        }
        return res.status(400).json({ ok: false, data: 'error' })
    }
}