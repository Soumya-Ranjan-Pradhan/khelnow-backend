const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

async function sendOTPEmail(toEmail) {

  try {
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "soumyaranjanpradhan637115@gmail.com",
        pass: "rwzucmednnlgtwpg",
      },
    });

    const mailOptions = {
      from: "soumyaranjanpradhan637115@gmail.com", // Your Gmail email
      to: toEmail,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
}

module.exports = sendOTPEmail;




// const nodemalier = require("nodemailer")
// const transpoter = nodemalier.createTransport({
//     service: "gmail",
//     auth:{
//         user: {
//             user:"soumyaranjanpradhan637115@gmail.com",
//             pass: "rwzucmednnlgtwpg",
//         }
//     }
// })

// const mailOption = {
//     fro
// }
