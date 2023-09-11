import nodemailer from "nodemailer";
import otpStorage from "./otpStorage.js";

const generateRandomString = (length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};

const sendOTPEmail = async (toEmail) => {
  try {
    // Generate a new OTP for each email
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
    throw new Error("Failed to send OTP email");
  }
};

export default sendOTPEmail;
