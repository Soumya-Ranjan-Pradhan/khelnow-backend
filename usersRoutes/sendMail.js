import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import otpStorage from "./otpStorage.js";

function generateRandomString(length) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); 
  }
  return otp;
}

const otp = generateRandomString(6);
// console.log(otp);

async function sendOTPEmail(toEmail) {
  try {
    const otp = generateRandomString(6);
    otpStorage[toEmail] = otp;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "soumyaranjanpradhan637115@gmail.com",
        pass: "rwzucmednnlgtwpg",
      },
    });

    const mailOptions = {
      from: "soumyaranjanpradhan637115@gmail.com", 
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

export default sendOTPEmail;
