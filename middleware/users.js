import otpStorage from "../usersRoutes/otpStorage.js";

const verifyEmailAndOTP = (req, res, next) => {
  try {
    const { email, enteredOTP } = req.body;

    const actualOTP = otpStorage[email];

    if (!actualOTP || enteredOTP !== actualOTP) {
      return res.status(401).json({ error: "Invalid email or OTP" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyEmailAndOTP;
