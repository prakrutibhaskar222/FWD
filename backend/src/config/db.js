import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.error("Error connecting to mongodb",error)
        process.exit(1)
    }
}