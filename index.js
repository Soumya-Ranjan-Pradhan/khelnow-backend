const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv")

dotenv.config()

//connection to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(process.env.MONGO_URL))
  .catch((err) => {
    console.log(err);
  });

  app.use(express.json())

  app.use("/users",(req,res) => {
    res.send("localhost is start")
  })

  app.listen(process.env.PORT || 3000, () => {
    console.log("Backend server is running")
  })