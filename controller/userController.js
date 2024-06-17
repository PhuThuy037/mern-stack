import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.user.userId });
  const newUser = user.toJSON();
  res.status(StatusCodes.OK).json({ newUser });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;

  const updateUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ updateUser });
};
