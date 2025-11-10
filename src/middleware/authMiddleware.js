const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const protect = async (req,res,next) => {
const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

if(!token) return res.status(401).json({message:"Not authorized,no token"});

try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
}catch(error){
    res.status(401).json({message:"Not authorized,invalid token"});
}
};
module.exports={ protect };