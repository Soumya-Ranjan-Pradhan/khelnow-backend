const express = require("express");
const router = express.Router();
const otpStorage = require("../usersRoutes/otpStorage")

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, enteredOTP } = req.body;

    const isOTPValid = verifyOTP(email, enteredOTP);

    // console.log("email:", email);
    // console.log("enteredOTP:", enteredOTP);
    // console.log("actualOTP:", otpStorage[email])

    if (isOTPValid) {
      console.log(isOTPValid)
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function verifyOTP(email, enteredOTP) {
  const actualOTP = otpStorage[email];
  return enteredOTP === actualOTP;
}

module.exports = router;
