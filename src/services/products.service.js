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

    async getProducts(isAdmin){
        try{
            let products;

            if(isAdmin){
                products = await Product.find();
            }else{
                products = await Product.find({
                    published: true
                })
            }
            return products;
        }catch(err){
            throw err;
        }
    }

    async getProductById(productId, isAdmin){
        try{
            let product;
            if(isAdmin){
                product = await Product.findById(productId)
            }else{
                product = await Product.findOne({
                    _id : productId,
                    published:true
                })
            }

            if(!product){
                throw new Error("Product not found");
            }
            return product;
        }catch(err){
            throw err
        }
    }

    async updateProduct(id, payload) {

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            throw new Error("Product not found");
        }

        return updatedProduct;
    }

    async deleteProduct(id) {

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new Error("Product not found");
        }

        return deletedProduct;
    }
}

export default ProductService;