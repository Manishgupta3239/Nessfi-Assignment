import { Router } from "express";
import { login , signUp ,logout } from "../controllers/authControllers.js";
import { authenticate } from "../utils/jsonwebtoken.js";

const router = Router();

router.post("/login",login);

router.post("/signup",signUp);

router.get("/logout",logout);

router.get("/authenticate", authenticate);

export default router;