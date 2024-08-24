import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
	  expiresIn: "15d",
	});
	console.log("Generated Token:", token);
  
	res.cookie("jwt", token, {
	  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 gün
	  httpOnly: true, // JavaScript ile erişilemez
	  sameSite: "None", // CSRF koruması için
	  secure: process.env.NODE_ENV === "development", // Üretim ortamında HTTPS üzerinden gönderilir
	});
  };
  
  
  export default generateTokenAndSetCookie;
  