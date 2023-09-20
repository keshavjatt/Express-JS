const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");
const Address = require("../models/addressSchema");
const AccessToken = require("../models/accessTokenSechma");
const sendEmail = require("../utils/sendEmail");


const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  console.log(user)
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_RESET_KEY, {
    expiresIn: "15m",
  });

  const data = await User.updateOne(
    { email },
    { $set: { resetToken: resetToken } }
  );

  sendEmail(user.firstName, email, resetToken);

  res.status(200).json({
    code: "Reset-Token-Sent",
    message: "Please check your mail for password reset",
    data,
  });
};



const profileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }
    res.json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { forgetPassword, profileImage };