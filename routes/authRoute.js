import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controller/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, register);
router.get("/logout", logout);

export default router;
