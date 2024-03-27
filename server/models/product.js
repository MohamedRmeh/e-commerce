import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    page: {
        type: String,
        required: true
    }
}, {timestamps: true});


export default mongoose.model("Product", productSchema);