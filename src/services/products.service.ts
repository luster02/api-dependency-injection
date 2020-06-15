import { BaseService } from "./base.service";
import { cloudinaryConfig, deletePhoto, uploadPhoto } from '../helpers/cludinary.helper'

let _productRepository: any = null
let _orgRepository: any = null
let _config: any = null

export class ProductService extends BaseService {
    constructor({ config, ProductRepository, OrgRepository }: any) {
        super(ProductRepository)
        _productRepository = ProductRepository
        _orgRepository = OrgRepository
        _config = config
        this.startCloud()
    }

    private startCloud() {
        cloudinaryConfig(
            _config.CLOUDINARY_NAME,
            _config.CLOUDINARY_KEY,
            _config.CLOUDINARY_SECRET
        )
    }

    async createProduct(orgId: String, product: any) {
        if (!orgId) {
            const error: any = new Error()
            error.status = 400
            error.message = "orgId must be sent"
            throw error
        }
        const org = await _orgRepository.get(orgId)
        if (!org) {
            const error: any = new Error()
            error.status = 404
            error.message = "org does not exist"
            throw error
        }
        const createdProduct = await _productRepository.create(product)
        org.products.push(createdProduct)

        return await _productRepository.update(orgId, { products: org.products })
    }

    async deleteProduct(orgId: String, productId: any) {
        if (!orgId && !productId) {
            const error: any = new Error()
            error.status = 400
            error.message = "orgId and productId must be sent"
            throw error
        }
        const org = await _orgRepository.get(orgId)
        if (!org) {
            const error: any = new Error()
            error.status = 404
            error.message = "org does not exist"
            throw error
        }

        org.products.pull(productId)

        await _productRepository.delete(productId)

        return await _productRepository.update(orgId, { products: org.products })
    }

    async updateImage(productId: any, file: any) {
        try {
            if (!productId) {
                const error: any = new Error()
                error.status = 400
                error.message = "productId must be sent"
                throw error
            }
            const product = await _productRepository.get(productId)
            if (!product) {
                const error: any = new Error()
                error.status = 404
                error.message = "product does not exist"
                throw error
            }
            if (product.logoId) {
                await deletePhoto(product.logoId)
            }
            const { secure_url, public_id } = await uploadPhoto(file)
            return await _productRepository.update(productId, { logoUrl: secure_url, logoId: public_id })
        } catch (error) {
            console.log(error)
            return null
        }
    }

}