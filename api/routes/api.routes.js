import express from "express";
import { profile } from "../controllers/api.controller.js";

const router = express.Router();

// Kullanıcı kaydı için bir POST isteği
router.get("/profile", profile);
//router.post("/logout");


export default router;