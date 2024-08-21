import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // E-posta var mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    
    //HASH Password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
     const {email,password}=req.body;
  
     const user = await User.findOne({ email });
     const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
  
     if(!user ||!isPasswordCorrect)
     {
      return res.status(400).json({ error: "Invalid username or password" });
     }
     await generateTokenAndSetCookie(user._id,res);
  
     res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
     })
  
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
  };

  export const logout = (req, res) => {
    try {
        // Clear the cookie by setting its maxAge to 0
        res.cookie("jwt", "", { maxAge: 0 });
  
        // Send a JSON response indicating success
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
  };
  
  