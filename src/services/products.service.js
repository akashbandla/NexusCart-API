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

    async getProducts(isAdmin, filters) {
        const query = {};

        if (!isAdmin) {
            query.published = true;
        }

        if (filters.category) {
            query.category = filters.category;
        }

        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            query.price = {};

            if (filters.minPrice !== undefined) {
                query.price.$gte = Number(filters.minPrice);
            }

            if (filters.maxPrice !== undefined) {
                query.price.$lte = Number(filters.maxPrice);
            }
        }


        let sort = {};

        if (filters.sort === "price_asc") {
            sort.price = 1;
        }

        if (filters.sort === "price_desc") {
            sort.price = -1;
        }

        if (filters.sort === "newest") {
            sort.createdAt = -1;
        }


        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 10;
        const skip = (page - 1) * limit;


        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
           .sort(sort)
           .skip(skip)
           .limit(limit);


        const totalPages = Math.ceil(totalProducts / limit);
        return {
            products,
            page,
            limit,
            totalProducts,
            totalPages
        };
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


    async importProducts(products) {
        const validatedProducts = [];

        for (const product of products) {
            if (
                !product.name ||
                !product.description ||
                product.price === undefined ||
                product.price === "" ||
                !product.category ||
                product.stock === undefined ||
                product.stock === "" ||
                product.published === undefined ||
                product.published === ""
            ) {
                throw new Error("Invalid product data in CSV");
            }

            const price = Number(product.price);
            const stock = Number(product.stock);

            if (isNaN(price) || isNaN(stock)) {
                throw new Error(
                    "Price and stock must be valid numbers"
                );
            }

            if (
                product.published !== "true" &&
                product.published !== "false"
            ) {
                throw new Error(
                    "Published must be true or false"
                );
            }

            validatedProducts.push({
                name: product.name,
                description: product.description,
                price,
                category: product.category,
                stock,
                published: product.published === "true"
            });
        }

        const insertedProducts = await Product.insertMany(validatedProducts);
        return insertedProducts;
    }

    async exportProducts() {
        try{
            const products = await Product.find().lean();
            return products;
        }catch(err){
            throw err
        }
    }
}

export default ProductService;