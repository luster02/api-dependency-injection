import { BaseService } from './base.service'
import { ErrorRequest } from '../helpers/error-request.helper'
import Stripe from 'stripe'
let stripe: any = null
let _cartRepository: any = null
let _historyService: any = null
let _config: any = null

export class CartService extends BaseService {
    constructor({ config, CartRepository, HistoryService }: any) {
        super(CartRepository)
        _config = config
        _cartRepository = CartRepository
        _historyService = HistoryService
        this.startStripe()
    }

    private startStripe() {
        stripe = new Stripe(_config.STRIPE_KEY, {
            apiVersion: "2020-03-02"
        })
    }

    async createCart(_id: string) {
        return await _cartRepository.create({ customer: _id })
    }

    async getCartByCustomer(customer: string) {
        return await _cartRepository.getCartByCustomer(customer)
    }

    async addProduct(product: any, cartID: string) {
        if (!cartID) {
            throw ErrorRequest(400, "cartID must be sent")
        }
        const cart = await _cartRepository.get(cartID)
        if (!cart) {
            throw ErrorRequest(404, "cart does not exist")
        }
        cart.products.push(product)
        return await _cartRepository.update(cartID, { products: cart.products })
    }

    async removeProduct(product: any, cartID: string) {
        if (!cartID) {
            throw ErrorRequest(400, "cartID must be sent")
        }
        const cart = await _cartRepository.get(cartID)
        if (!cart) {
            throw ErrorRequest(404, "cart does not exist")
        }
        cart.products.pull(product)
        return await _cartRepository.update(cartID, { products: cart.products })
    }

    async getTotalPrice(cartID: string) {
        if (!cartID) {
            throw ErrorRequest(400, "cartID must be sent")
        }
        const cart = await _cartRepository.get(cartID)
        if (!cart) {
            throw ErrorRequest(404, "cart does not exist")
        }
        var price: number = 0
        cart.products.forEach((product: any) => {
            price += parseInt(product.price)
        })
        return await _cartRepository.update(cartID, { totalPrice: price })
    }

    async payCart(cartID: string, totalPrice: number, customer: string, orgID: string) {
        console.log(totalPrice)
        if (!cartID) {
            throw ErrorRequest(400, "cartID must be sent")
        }
        const cart = await _cartRepository.get(cartID)
        if (!cart) {
            throw ErrorRequest(404, "cart does not exist")
        }
        const history = await _historyService.createHistory(customer, orgID)
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
        })
        if (!paymentIntent.client_secret) {
            await _historyService.delete(history._id)
            throw ErrorRequest(500, 'internal payment error')
        }
        cart.products.forEach(async (product: any) => {
            await _historyService.addProduct(product._id, history._id)
        })
        await _cartRepository.update(cartID, { $set: { products: [] } })
        return paymentIntent
    }

    async clearCart(cartID: string) {
        if (!cartID) {
            throw ErrorRequest(400, "cartID must be sent")
        }
        return await _cartRepository.update(cartID, { $set: { products: [] } })
    }
}