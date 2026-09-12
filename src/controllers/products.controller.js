import ProductService from "../services/products.service.js";
import fs from "fs";
import csv from "csv-parser";
import { Parser } from "json2csv";

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

async function getProducts(req, res) {
    try {
        const isAdmin = req.user.role === "admin";

        const {
            category,
            minPrice,
            maxPrice,
            sort,
            page,
            limit
        } = req.query;

        const result = await productService.getProducts(
            isAdmin,
            {
                category,
                minPrice,
                maxPrice,
                sort,
                page,
                limit
            }
        );

        return res.status(200).json({
            message: "Products fetched successfully",
            ...result
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

async function getProductById(req, res){
    try{
        const { id } = req.params;

        if(!id){
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


async function importProducts(req, res) {
    let filePath;
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "CSV file is required"
            });
        }

        filePath = req.file.path;

        const products = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                products.push(row);
            })
            .on("end", async () => {
                try {
                    if (products.length === 0) {
                        throw new Error("CSV file is empty");
                    }

                    const importedProducts = await productService.importProducts(products);

                    return res.status(201).json({
                        message: "Products imported successfully",
                        count: importedProducts.length
                    });

                } catch (error) {
                    return res.status(400).json({
                        message: error.message
                    });
                } finally {
                    fs.unlink(filePath, (error) => {
                        if (error) {
                            console.log(
                                "Failed to delete temporary file:",
                                error.message
                            );
                        }
                    });
                }
            })
            .on("error", (error) => {
                return res.status(400).json({
                    message: "Failed to read CSV file"
                });
            });
    } catch (error) {
        if (filePath) {
            fs.unlink(filePath, () => {});
        }
        return res.status(400).json({
            message: error.message
        });
    }
}


async function exportProducts(req, res) {
    try {
        const products = await productService.exportProducts();

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products available for export"
            });
        }

        const fields = [
            "name",
            "description",
            "price",
            "category",
            "stock",
            "published",
            "createdAt",
            "updatedAt"
        ];

        const parser = new Parser({ fields });

        const csv = parser.parse(products);

        res.header("Content-Type", "text/csv");
        res.attachment("products.csv");

        return res.status(200).send(csv);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    importProducts,
    exportProducts
};