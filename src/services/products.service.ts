import { BaseService } from "./base.service";
import { cloudinaryConfig, deletePhoto, uploadPhoto } from '../helpers/cludinary.helper'
import { ErrorRequest } from '../helpers/error-request.helper'
import { removeFile } from '../helpers/fs.helper'

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
            throw ErrorRequest(400, "orgId must be sent")
        }
        const org = await _orgRepository.get(orgId)
        if (!org) {
            throw ErrorRequest(404, "org does not exist")
        }
        const createdProduct = await _productRepository.create(product)
        if (!createdProduct) {
            throw ErrorRequest(500, "error on create")
        }
        return await _orgRepository.update(orgId, { $push: { products: createdProduct } })
    }

    async deleteProduct(orgId: String, productId: any) {
        if (!orgId && !productId) {
            throw ErrorRequest(400, "orgId and productId must be sent")
        }
        const org = await _orgRepository.get(orgId)
        if (!org) {
            throw ErrorRequest(404, "org does not exist")
        }

        org.products.pull(productId)

        await _productRepository.delete(productId)

        return await _orgRepository.update(orgId, { products: org.products })
    }

    async updateImage(productId: any, file: any) {
        if (!productId) {
            throw ErrorRequest(400, "productId must be sent")
        }
        const product = await _productRepository.get(productId)
        if (!product) {
            throw ErrorRequest(404, "product does not exist")
        }
        if (product.imgID) {
            await deletePhoto(product.imgID)
        }
        const { secure_url, public_id } = await uploadPhoto(file)
        if (public_id) {
            await removeFile(file)
            return await _productRepository.update(productId, { imgUrl: secure_url, imgID: public_id })
        } else {
            throw ErrorRequest(500, "error on save")
        }
    }

}