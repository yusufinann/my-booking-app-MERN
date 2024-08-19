import express from "express";
import { register } from "../controllers/auth.controller.js";

const router = express.Router();

// Kullanıcı kaydı için bir POST isteği
router.post("/register", register);


export default router;