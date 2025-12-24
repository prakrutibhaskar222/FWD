import crypto from "crypto";

export const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  return {
    token,
    hashed,
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };
};
