import express from "express";
import {getPlaces, places, profile ,upload,uploadByLink,getPlacesById,updatePlacesById, getAllPlaces,bookings} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/profile", profile);
router.post("/upload-by-link", uploadByLink);
router.post("/upload", upload);
router.post("/places", places);
router.get("/all-places", getAllPlaces);
router.get("/user-places", getPlaces);
router.get("/places/:id", getPlacesById);
router.put("/places/:id", updatePlacesById);
router.post("/bookings", bookings);



export default router;