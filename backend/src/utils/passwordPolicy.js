export const validatePasswordStrength = (password) => {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!minLength)
    return "Password must be at least 8 characters";
  if (!hasUpper)
    return "Password must include an uppercase letter";
  if (!hasLower)
    return "Password must include a lowercase letter";
  if (!hasNumber)
    return "Password must include a number";

  return null;
};
