import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../erros/customsErros.js";
import { JOB_TYPE, JOB_STATUS } from "../utils/constants.js";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMessage = errors.array().map((error) => error.msg);

        if (errMessage[0].startsWith("no job")) {
          throw new NotFoundError(errMessage);
        }
        if (errMessage[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errMessage);
      }

      next();
    },
  ];
};
export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);
export const validateIdParm = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) {
      throw new BadRequestError("invalid id");
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`no job with id ${value}`);
    }
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exits");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3, max: 10 })
    .withMessage("check your pass"),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),

  body("password").notEmpty().withMessage("password is required"),
]);
export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exits");
      }
    }),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
