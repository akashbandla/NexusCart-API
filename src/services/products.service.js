import Product from "../models/products.model.js"

class ProductService{
 async createproduct(product){
    try{
        if(!product){
            throw new Error("product data is required to register");
        }
        const registeredproduct = await Product.create(product);

        if(!registeredproduct){
            throw new Error("product is not created")
        }
        return registeredproduct
    }catch(err){
        return err
    }

 }
}
 export default ProductService;


    
        
    

    

