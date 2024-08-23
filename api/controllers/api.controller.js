import User from "../models/user.model.js";
import Place from "../models/place.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // Rastgele dosya adları oluşturmak için
import multer from "multer";

import fs from "fs";
import path from "path";
import { image } from "image-downloader";

export const profile = async (req, res) => {
  try {
    const { jwt: token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId, "name email _id");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadByLink = async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({ error: "No link provided" });
    }

    // Yükleme dizininin yolunu oluşturun
    const uploadsDir = path.resolve("./uploads");

    // Dizinin mevcut olup olmadığını kontrol edin ve gerekirse oluşturun
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Benzersiz dosya adı oluşturun
    const uniqueFileName = `${crypto.randomBytes(16).toString("hex")}.jpg`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    const options = {
      url: link,
      dest: filePath,
    };

    const { filename } = await image(options);

    res
      .status(200)
      .json({ message: "İmaj başarıyla indirildi", path: uniqueFileName });
  } catch (error) {
    console.error("İmaj indirirken hata oluştu:", error.message);
    res
      .status(500)
      .json({ error: "İmaj indirilemedi", details: error.message });
  }
};

/**/ // */

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.resolve("./uploads");
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// Set up multer middleware
const uploadMiddleware = multer({ storage: storage });

// Upload function for the '/upload' endpoint
export const upload = (req, res) => {
  try {
    // Single file upload
    uploadMiddleware.single("file")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ error: "Multer error occurred when uploading." });
      } else if (err) {
        return res
          .status(500)
          .json({ error: "Unknown error occurred when uploading." });
      }

      // File uploaded successfully
      const filePath = req.file.filename;
      res
        .status(200)
        .json({ message: "File uploaded successfully", path: filePath });
    });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res
      .status(500)
      .json({ error: "Failed to upload file", details: error.message });
  }
};

export const places = async (req, res) => {
  try {
    const { jwt: token } = req.cookies; // Çerez adı 'jwt' olarak güncelledim

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Token'ı doğrula
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      // İstek gövdesinden verileri al
      const {
        title,
        address,
        addedPhotos,
        description,
        price,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      } = req.body;

      // Yeni bir place dökümanı oluştur
      const placeDoc = await Place.create({
        owner: userData.userId, // Kullanıcı ID'sini doğrula
        title,
        address,
        photos: addedPhotos,
        description,
        price,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });

      // Oluşturulan place dökümanı ile yanıt ver
      res.status(201).json(placeDoc);
    });
  } catch (error) {
    console.error("Error creating place:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPlaces = async (req, res) => {
  console.log("Incoming request for /api/places");
  try {
    const { jwt: token } = req.cookies;
    if (!token) {
      console.log("No token provided");
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    console.log(`Decoded userId: ${userId}`);

    console.log(`Fetching places for user ID: ${userId}`);

    const places = await Place.find({ owner: userId });
    console.log(`Found ${places.length} places for user ID: ${userId}`);

    res.json({
      owner: userId,
      places,
    });
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getPlacesById = async (req, res) => {
    try {
        const { id } = req.params; // Kullanıcı id'sini alıyoruz ve id değişkenine atıyoruz.
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.json(place);
    } catch (error) {
        console.error('Error fetching place by ID:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePlacesById = async (req, res) => {
    try {
        const { jwt: token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const {
            title,
            address,
            addedPhotos,
            description,
            price,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        } = req.body;

        const placeId = req.params.id; // Extract ID from URL params

        const placeDoc = await Place.findById(placeId);

        if (!placeDoc) {
            return res.status(404).json({ message: "Place not found" });
        }

        if (userId !== placeDoc.owner.toString()) {
            return res.status(403).json({ message: "Forbidden: You are not the owner of this place" });
        }

        placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description,
            price,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        });

        await placeDoc.save();

        res.status(200).json({ message: "Place updated successfully", place: placeDoc });
    } catch (error) {
        console.error('Error updating place by ID:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};