import Product from "../models/products.model.js";

class ProductService {

    async createProduct(product) {

        if (!product) {
            throw new Error("Product data is required");
        }

        const createdProduct = await Product.create(product);

        if (!createdProduct) {
            throw new Error("Product was not created");
        }

        return createdProduct;
    }
}

export default ProductService;