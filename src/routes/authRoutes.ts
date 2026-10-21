import express from "express";
import { login, logout, register } from "../controllers/authController";
import { loginSchema, registerSchema } from "../validators/authValidators";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);

export default router;
