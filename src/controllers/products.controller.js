import ProductService from "../services/products.service.js";
import ProductService from "../services/products.service.js";

const ProductService = new ProductService();

async function createproduct(req,res){
    try{
        const{name,description,price,category,stock,published} = req.body;
        if(!name,!description, !price){
            throw new Error("name,description,price should required");
        }
        if(!category, !stock, !published){
            throw new Error("category,stock,published should required");
        }
        newUser = {}
        if(name !== undefined) newUser.name = name;
        if(description !== undefined) newUser.description = description;
        if(price!== undefined) newUser.price = price;
        if(category!== undefined) newUser.category = category;
        if(stock!== undefined) newUser.stock = stock;
        if(published!== undefined) newUser.published = published;
     return res.status(201).json({ message: "Product created successfully", product: product });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export { createProduct };
    
