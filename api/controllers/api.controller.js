    import User from "../models/user.model.js";
    import jwt from "jsonwebtoken";
    import crypto from 'crypto'; // Rastgele dosya adları oluşturmak için

    import fs from 'fs';
    import path from 'path';
    import { image } from 'image-downloader';

    export const profile = async (req, res) => {
        try {
            const { jwt: token } = req.cookies;

            if (!token) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;

            const user = await User.findById(userId, 'name email _id');

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                name: user.name,
                email: user.email,
                id: user._id
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
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
            const uploadsDir = path.resolve('./uploads');

            // Dizinin mevcut olup olmadığını kontrol edin ve gerekirse oluşturun
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            // Benzersiz dosya adı oluşturun
            const uniqueFileName = `${crypto.randomBytes(16).toString('hex')}.jpg`;
            const filePath = path.join(uploadsDir, uniqueFileName);

            const options = {
                url: link,
                dest: filePath
            };

            const { filename } = await image(options);

            res.status(200).json({ message: "İmaj başarıyla indirildi", path: uniqueFileName });
        } catch (error) {
            console.error("İmaj indirirken hata oluştu:", error.message);
            res.status(500).json({ error: "İmaj indirilemedi", details: error.message });
        }
    };
