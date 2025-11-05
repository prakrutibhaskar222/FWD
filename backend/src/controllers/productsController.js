import Product from "../models/Product.js"

export async function getAllProducts  (req,res)  {
    try {
        const products = await Product.find().sort({createdAt:-1})
        res.status(200).json(products)
        
    } catch (error) {
        console.error("error in getAllProducts controller ",error)
        res.status(500).json({message : "Internal server error"})        
    }
}
export async function getProduct  (req,res)  {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message : "Product not found"})
        res.status(200).json(product)
        
    } catch (error) {
        console.error("error in getProduct controller ",error)
        res.status(500).json({message : "Internal server error"})        
    }
}

export async function createProduct  (req,res)  {
    try {
        const {title,content} = req.body
        const product = new Product({title,content})

        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
        
    } catch (error) {
        console.error("error in createProduct controller ",error)
        res.status(500).json({message : "Internal server error"})        
    }
}

export async function updateProduct  (req,res)  {
    try {
        const {title,content} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{title,content},{
            new:true,
        })

        if(!updatedProduct) return res.status(404).json({message:"Product not found"})
        res.status(200).json({message :"Product updated successfully"})
    } catch (error) {
        console.error("error in updateProduct controller ",error)
        res.status(500).json({message : "Internal server error"}) 
        
    }
}

export async function deleteProduct  (req,res)  {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if(!deletedProduct) return res.status(404).json({message:"Product not found"})
        res.status(200).json({message :"Product deleted successfully"})
        
    } catch (error) {
        console.error("error in deleteProduct controller ",error)
        res.status(500).json({message : "Internal server error"}) 
        
    }
}
