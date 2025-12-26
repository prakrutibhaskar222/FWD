// backend/controllers/servicesController.js
import Service from "../models/Service.js";
import Review from "../models/Review.js";

/* CREATE */
export const createService = async (req, res) => {
  try {
    const { title, category, price, description, features, duration, featured } = req.body;
    const slug = title.toLowerCase().replace(/ /g, "-");

    const service = await Service.create({
      title,
      category,
      price,
      description,
      features: features || [],
      duration: duration || "",
      featured: !!featured,
      slug
    });

    res.json({ success: true, data: service });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

/* GET ALL */
export const getAllServices = async (req, res) => {
  try {
    // optional ids filter: ?ids=id1,id2
    if (req.query.ids) {
      const ids = req.query.ids.split(",");
      const services = await Service.find({ _id: { $in: ids } });
      return res.json({ success: true, data: services });
    }

    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

 
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.json({ success: false, error: "Service not found" });
    res.json({ success: true, data: service });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
 
export const viewAndGetService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!service) return res.json({ success: false, error: "Service not found" });

    const reviews = await Review.find({ service: id, approved: true }).sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, data: { service, reviews } });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
 
export const updateService = async (req, res) => {
  try {
    const { title, category, price, description, features, duration, featured } = req.body;
    const slug = title?.toLowerCase().replace(/ /g, "-");

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        price,
        description,
        features: features || [],
        duration: duration || "",
        featured: !!featured,
        slug
      },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
 
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
 
export const getCategories = async (req, res) => {
  try {
 
    const services = await Service.find({}, "category").lean();
    const map = {};
    services.forEach(s => { if (s.category) map[s.category] = true; });
    const categories = Object.keys(map).map(k => ({ key: k, name: k }));
    res.json({ success: true, data: categories });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
 
export const getServiceByCategory = async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category });
    res.json({ success: true, data: services });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

 
export const getFeaturedServices = async (req, res) => {
  try {
    const featured = await Service.find({ featured: true }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, data: featured });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
 
export const getPopularServices = async (req, res) => {
  try {
    const category = req.params.category;
    const q = category ? { category } : {};
    const popular = await Service.find(q).sort({ views: -1 }).limit(20);
    res.json({ success: true, data: popular });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

