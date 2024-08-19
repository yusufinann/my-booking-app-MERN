import express from "express";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';

dotenv.config(); // To Read .env File

const app = express();
const port = process.env.PORT || 8000;

// CORS middleware'ini burada kullanın
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(express.json());

// The Get Request for homePage
app.get('/', (req, res) => {
  res.send('Merhaba, Express Sunucusu!');
});

app.use("/", authRoutes);

// Sunucuyu başlatma
app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${port}`);
});
