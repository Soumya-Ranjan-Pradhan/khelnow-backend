
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const users = require("./usersRoutes/users")
const otp = require("../server/usersRoutes/otp")
app.use(express.json());
require("./db/conn")
const verifyOTPRoute = require("../server/usersRoutes/verify");




app.use("/users",users)
app.use("/send-otp-email", otp);
app.use("/verify-otp", verifyOTPRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running");
});
