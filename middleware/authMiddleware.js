import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../erros/customsErros.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authenticated valid");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "6674dbb01a9cf04667804d12";
    req.user = { userId, role, testUser };

    next();
  } catch (error) {}
};
export const authorizePermissions = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo user. Read only");
};
