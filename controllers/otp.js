const sendMail = require("../usersRoutes/sendMail");

const otp = async (req, res) => {
    try {
      const { toEmail } = req.body;
      await sendMail(toEmail);
      res.status(200).json({ message: "OTP email sent successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = otp