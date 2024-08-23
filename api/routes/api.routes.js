import express from "express";
import {getPlaces, places, profile ,upload,uploadByLink,getPlacesById,updatePlacesById} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/profile", profile);
router.post("/upload-by-link", uploadByLink);
router.post("/upload", upload);
router.post("/places", places);
router.get("/places", getPlaces);
router.get("/places/:id", getPlacesById);
router.put("/places/:id", updatePlacesById);



export default router;