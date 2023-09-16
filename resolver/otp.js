// Import necessary modules and your User model
import userModel from '../model/Users.js';
import sendMail from '../usersRoutes/sendMail.js';

const otpResolvers = {
  Mutation: {
    sendOTP: async (_, { toEmail }) => {
      try {
        const otp = generateRandomString(6);

        const existingUser = await userModel.findOne({ email: toEmail }).maxTimeMS(30000);

        if (!existingUser) {
          return {
            error: 'Email not registered',
            message: null,
          };
        }

        existingUser.otp = otp; 
        await existingUser.save();

        await sendMail(toEmail, otp);

        return {
          message: 'OTP email sent successfully',
          error: null,
        };
      } catch (error) {
        return {
          error: error.message,
          message: null,
        };
      }
    },
  },
};

const generateRandomString = (length) => {
  return Array ({ length }, () => Math.floor(Math.random() * 10)).join("");
};

export default otpResolvers;
