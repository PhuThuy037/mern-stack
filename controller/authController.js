import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../erros/customsErros.js";
import { createJWT } from "../utils/tokenUtils.js";
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const hashPass = await hashPassword(req.body.password);
  req.body.password = hashPass;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user create" });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("email not exist  bro");
  }
  const isCorrect = await comparePassword(req.body.password, user.password);
  if (!isCorrect) throw new UnauthenticatedError("invalid pass bro");

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "ok" });
};
export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
