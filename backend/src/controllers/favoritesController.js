import User from "../models/User.js";

/* ================= ADD TO FAVORITES ================= */
export const addToFavorites = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ success: false, message: "Service ID required" });
    }

    const user = req.user;

    if (user.favorites.includes(serviceId)) {
      return res.json({ success: true, message: "Already in favorites" });
    }

    user.favorites.push(serviceId);
    await user.save();

    res.json({ success: true, message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= REMOVE FROM FAVORITES ================= */
export const removeFromFavorites = async (req, res) => {
  try {
    const { serviceId } = req.params;

    req.user.favorites = req.user.favorites.filter(
      id => id.toString() !== serviceId
    );

    await req.user.save();

    res.json({ success: true, message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET FAVORITES ================= */
export const getFavorites = async (req, res) => {
  try {
    const user = await req.user.populate("favorites");

    res.json({
      success: true,
      data: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
