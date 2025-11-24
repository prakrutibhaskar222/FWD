import Service from "../models/Service.js"

export async function getAllServices  (req,res)  {
    try {
        const services = await Service.find().sort({createdAt:-1})
        res.status(200).json(services)
        
    } catch (error) {
        console.error("error in getAllServices controller ",error)
        res.status(500).json({message : "Internal server error"})        
    }
}
export async function getService  (req,res)  {
    try {
        const service = await Service.findById(req.params.id)
        if(!service) return res.status(404).json({message : "Service not found"})
        res.status(200).json(service)
        
    } catch (error) {
        console.error("error in getService controller ",error)
        res.status(500).json({message : "Internal server error"})        
    }
}

export async function createService  (req,res)  {
    try {
        const {title,content} = req.body
        const service = new Service({title,content})

        const savedService = await service.save()
        res.status(201).json(savedService)
        
    } catch (error) {
        console.error("error in createService controller ",error)
        res.status(500).json({message : "Internal server error"})        
    }
}

export async function updateService  (req,res)  {
    try {
        const {title,content} = req.body;
        const updatedService = await Service.findByIdAndUpdate(req.params.id,{title,content},{
            new:true,
        })

        if(!updatedService) return res.status(404).json({message:"Service not found"})
        res.status(200).json({message :"Service updated successfully"})
    } catch (error) {
        console.error("error in updateService controller ",error)
        res.status(500).json({message : "Internal server error"}) 
        
    }
}

export async function deleteService  (req,res)  {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id)
        if(!deletedService) return res.status(404).json({message:"Service not found"})
        res.status(200).json({message :"Service deleted successfully"})
        
    } catch (error) {
        console.error("error in deleteService controller ",error)
        res.status(500).json({message : "Internal server error"}) 
        
    }
}
