import express from "express";
import { profile ,uploadByLink} from "../controllers/api.controller.js";

const router = express.Router();

// Kullanıcı kaydı için bir POST isteği
router.get("/profile", profile);
router.post("/upload-by-link", uploadByLink);


export default router;