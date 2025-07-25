const express = require("express");
const { signUpUser, loginUser } = require("../controllers/controller");
const router = express.Router();
const validateToken = require("../middleware/middleware");


router.post("/login",loginUser);
router.post("/register",signUpUser);
router.get("/home",validateToken,(req,res)=>{
     res.json({
    message: `Welcome, ${req.user.firstname}!`,
    user: req.user,
  });
})

module.exports = router;
