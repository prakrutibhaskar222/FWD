import mongoose from "mongoose"

//step 1 - create schema 
//step 2 - create model

const productSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);


const Product = mongoose.model("Product",productSchema)

export default Product;