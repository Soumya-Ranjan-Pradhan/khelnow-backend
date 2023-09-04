import otpStorage from "../usersRoutes/otpStorage.js";

const verify = (req, res) => {

  try {
    const { email, enteredOTP } = req.body;
    const isOTPValid = verifyOTP(email, enteredOTP);

    if (isOTPValid) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function verifyOTP(email, enteredOTP) {
  const actualOTP = otpStorage[email];
  return enteredOTP === actualOTP;
}

export default verify;
