import { BaseRepository } from './base.repository'
let _product: any

export class ProductRepository extends BaseRepository {
    constructor({ Product }: any) {
        super(Product)
        _product = Product
    }
}