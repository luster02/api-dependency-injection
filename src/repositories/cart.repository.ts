import { BaseRepository } from './base.repository'
let _cart: any

export class CartRepository extends BaseRepository {
    constructor({ Cart }: any) {
        super(Cart)
        _cart = Cart
    }

    async getCartByCustomer(customer: string) {
        return await _cart.find({ customer })
    }
}