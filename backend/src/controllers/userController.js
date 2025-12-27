import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name phone address");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
