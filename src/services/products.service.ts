import { BaseService } from "./base.service";
let _productRepository: any = null

export class ProductService extends BaseService {
    constructor({ ProductRepository }: any) {
        super(ProductRepository)
        _productRepository = ProductRepository
    }
}