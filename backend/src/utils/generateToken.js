import jwt from "jsonwebtoken";

// Function to generate a signed JSON Web Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // token expires in 30 days
  });
};
