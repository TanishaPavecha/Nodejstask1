const express = require("express");
const connectDb = require("./connection");
const app = express();
require("dotenv").config();
const approute = require("./routes/route");
app.use(express.json());
const PORT = 8000;
connectDb();
app.listen(PORT,()=> console.log(`Server running on ${PORT}`));

app.use("/api/user",approute);
