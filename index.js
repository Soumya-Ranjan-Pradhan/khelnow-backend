const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const users = require("../server/routes/users")
const sendMail = require("../server/routes/sendMail")

//connection to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(process.env.MONGO_URL))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.post("/send-otp-email", async (req, res) => {
  try {
    const { toEmail } = req.body;
    await sendMail(toEmail);
    res.status(200).json({ message: "OTP email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/users",users)

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running");
});
