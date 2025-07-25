const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const validateToken = asyncHandler(async (req,res,next)=> {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(400).json({message: "Not authorized, invalid token"});
    } 
    const accesstoken = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(accesstoken,process.env.SECRET_ACCESS_TOKEN);
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401);
        throw new Error("Token is invalid r expired");
    }
});

module.exports = validateToken;