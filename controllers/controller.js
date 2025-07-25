const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/model");
const jwt = require("jsonwebtoken");

const signUpUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!email || !firstname || !lastname || !password) {
    res.status(400);
    throw new Error("All fields required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res
      .status(201)
      .json({
        msg: "User created successfully",
        _id: user.id,
        uuid: user.uuid,  
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
  
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          uuid: user.uuid,
          firstname: user.firstname,
          email: user.email,
          
        },
      },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accesstoken });
  } else {
    res.status(400);
    throw new Error("credentials are invalid or does not exist");
  }
});

module.exports = { signUpUser, loginUser };
