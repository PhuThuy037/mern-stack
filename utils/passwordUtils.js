import bcrypt from "bcryptjs";

export const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(pass, salt);
  return hashPass;
};
export const comparePassword = async (password, hashPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};
