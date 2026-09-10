import mongoose from "mongoose";
const productSchema = new mongoose.Schema({

    name:{ type: String, required: true, trim: true},
    description: { type: String, required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    category: { type: String, required: true, trim: true},
    stock: { type: Number, required: true, trim: true},
    published: { type: Boolean, default: false }

});

const productModel = mongoose.model("product", productSchema);
export default productModel;
