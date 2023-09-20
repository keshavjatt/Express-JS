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

const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { resetToken } = req.params;

    const decoded = jwt.verify(resetToken, process.env.JWT_RESET_KEY);

    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ code: "Invalid-Feilds", message: "Please fill all feilds" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        code: "Invalid-Input",
        message: "Password and confirm password does not matched",
      });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    return res
      .status(204)
      .json({ success: true, message: "This is already used " });
  }
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

module.exports = { forgetPassword, resetPassword, profileImage };