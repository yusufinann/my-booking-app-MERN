import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


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





// app.get('/api/profile', (req,res) => {
//     mongoose.connect(process.env.MONGO_URL);
//     const {token} = req.cookies;
//     if (token) {
//       jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         const {name,email,_id} = await User.findById(userData.id);
//         res.json({name,email,_id});
//       });
//     } else {
//       res.json(null);
//     }
//   });
  