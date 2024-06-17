import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../erros/customsErros.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authenticated valid");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
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
