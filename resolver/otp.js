// import userModel from '../model/Users.js';
// import sendMail from '../usersRoutes/sendMail.js';

// const otpResolvers = {
//   Mutation: {
//     sendOTP: async (_, { toEmail }) => {
//       try {
//         const existingUser = await userModel.findOne({ email: toEmail });

//         if (!existingUser) {
//           return {
//             error: 'Email not registered',
//             message: null,
//           };
//         }

//         await sendMail(toEmail);

//         return {
//           message: 'OTP email sent successfully',
//           error: null,
//         };
//       } catch (error) {
//         return {
//           success: false,
//           message: "Login failed",
//         };
//       }
//     },
//   },
// };

// export default otpResolvers;
