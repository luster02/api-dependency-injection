import { ProductService as productService } from '../../../src/services'
import config from '../../../src/config/index'
import { ProductRepositoryMock } from '../../mocks'
import { ProductModelMock } from '../../mocks'
const { product, products } = ProductModelMock
const ProductService: any = productService

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should find a product by id", async () => {
        const ProductRepository = ProductRepositoryMock;
        ProductRepository.get.mockReturnValue(product);

        const _productService = new ProductService({ config, ProductRepository });
        const expected = await _productService.get(product._id);
        expect(expected).toMatchObject(product);
    });


    it("Should return a product collection", async () => {
        const ProductRepository = ProductRepositoryMock;
        ProductRepository.getAll.mockReturnValue(products);

        const _productService = new ProductService({ config, ProductRepository });
        const expected = await _productService.getAll();
        expect(expected).toMatchObject(products);
    });

    it("Should update a product by id", async () => {
        const ProductRepository = ProductRepositoryMock;
        ProductRepository.update.mockReturnValue(product);

        const _productService = new ProductService({ config, ProductRepository });
        const expected = await _productService.update(product._id, product);
        expect(expected).toMatchObject(product);
    });

    it("Should delete a product by id", async () => {
        const ProductRepository = ProductRepositoryMock;
        ProductRepository.delete.mockReturnValue(true);

        const _productService = new ProductService({ config, ProductRepository });

        const expected = await _productService.delete(product._id);
        expect(expected).toEqual(true);
    });
});