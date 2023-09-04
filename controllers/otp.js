import userModel from '../model/Users.js';
import sendMail from '../usersRoutes/sendMail.js';

const otp = async (req, res) => {
  try {
    const { toEmail } = req.body;

    const existingUser = await userModel.findOne({ email: toEmail });

    if (!existingUser) {
      return res.status(400).json({ error: 'Email not registered' });
    }

    await sendMail(toEmail);

    res.status(200).json({ message: 'OTP email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { otp };
