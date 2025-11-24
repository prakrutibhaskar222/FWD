import mongoose from "mongoose"

//step 1 - create schema 
//step 2 - create model

const categorySchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);


const Category = mongoose.model("Category",categorySchema)

export default Category;