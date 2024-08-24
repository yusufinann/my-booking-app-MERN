import express from "express";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/api.routes.js";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config(); // .env dosyasını okumak için

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS middleware'ini burada kullanın                            
app.use(cors({                                                                                                                                                                                                                                                                                                                                                                         
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(express.json()); // JSON gövdesini ayrıştırmak için
app.use(cookieParser()); // Çerezleri ayrıştırmak için

app.get('/', (req, res) => {
  res.send('Merhaba, Express Sunucusu!');
});

app.use("/", authRoutes);
app.use("/api", apiRoutes);

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${port}`);
});
