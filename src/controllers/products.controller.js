import ProductService from "../services/products.service.js";

const productService = new ProductService();

async function createProduct(req, res) {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
            published
        } = req.body;

        // Required field validation
        if (!name || !description || price === undefined) {
            throw new Error("name, description and price are required");
        }

        if (!category || stock === undefined || published === undefined) {
            throw new Error("category, stock and published are required");
        }

        const newProduct = {
            name,
            description,
            price,
            category,
            stock,
            published
        };

        const createdProduct =
            await productService.createProduct(newProduct);

        return res.status(201).json({
            message: "Product created successfully",
            product: createdProduct
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export { createProduct };