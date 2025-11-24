import mongoose from "mongoose"

//step 1 - create schema 
//step 2 - create model

const serviceSchema = new mongoose.Schema(
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


const Service = mongoose.model("Service",serviceSchema)

export default Service;