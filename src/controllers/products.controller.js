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

async function getProducts(req, res){
    try{
        const isAdmin = req.user.role === 'admin';

        const products = await productService.getProducts(isAdmin);

        res.json({
            message: "Products Fetched succesfully",
            products
        });
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

async function getProductById(req, res){
    try{
        const { id } = req.params;

        if(!productId){
            throw new Error("Product Id required to fetch a specific product")
        }

        const isAdmin = req.user.role === 'admin';

        const product = await productService.getProductById(
            id, 
            isAdmin
        );

        res.json({
            message: "Product Fetched succesfully",
            product
        });
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            price,
            category,
            stock,
            published
        } = req.body;


        const updateData = {};

        if (name !== undefined) {
            updateData.name = name;
        }

        if (description !== undefined) {
            updateData.description = description;
        }

        if (price !== undefined) {
            updateData.price = price;
        }

        if (category !== undefined) {
            updateData.category = category;
        }

        if (stock !== undefined) {
            updateData.stock = stock;
        }

        if (published !== undefined) {
            updateData.published = published;
        }

        const updatedProduct =await productService.updateProduct(id, updateData);

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });

    }
}


async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const deletedProduct = await productService.deleteProduct(id);

        return res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};