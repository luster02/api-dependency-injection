import mockingoose from 'mockingoose'
import { Product } from '../../../src/models'
import { ProductRepository } from '../../../src/repositories'
import { ProductModelMock } from '../../mocks'

describe("user repository", () => {
    beforeEach(() => {
        mockingoose.resetAll()
        jest.clearAllMocks()
    })

    it("Should find a product by id", async () => {
        const _org = { ...ProductModelMock.product }
        mockingoose(Product).toReturn(ProductModelMock.product, 'findOne')

        const _productRepository = new ProductRepository({ Product })
        const expected = await _productRepository.get(_org._id)
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_org);
    })

    it("Should return a products collection", async () => {
        const products: any = ProductModelMock.products.map(product => {
            return product;
        });

        mockingoose(Product).toReturn(products, "find");

        const _productRepository = new ProductRepository({ Product });
        const expected = await _productRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(products);
    });

    it("Should update an especific product by id", async () => {
        const _org = { ...ProductModelMock.product };
        mockingoose(Product).toReturn(_org, "findOneAndUpdate");
        const _productRepository = new ProductRepository({ Product });
        const expected = await _productRepository.update(ProductModelMock.product._id, {
            name: "test updated"
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_org);
    });

    it("Should delete an especific product by id", async () => {
        mockingoose(Product).toReturn(ProductModelMock.product, "findOneAndDelete");
        const _productRepository = new ProductRepository({ Product });
        const expected = await _productRepository.delete(ProductModelMock.product._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });
})