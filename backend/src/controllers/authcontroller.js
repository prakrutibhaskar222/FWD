import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// 🟢 REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 GET PROFILE (JWT BASED)
export const getProfile = async (req, res) => {
  res.json(req.user);
};
