const User = require("../models/userSchema");
const Address = require("../models/addressSchema");
const { validationResult } = require("express-validator");
const AccessToken = require("../models/accessTokenSechma");

const createAddress = async (req, res) => {
  try {
    const { address, city, state, pin_code, phone_no } = req.body;
    const userId = req.User._id;

    if (!address || !city || !state || !pin_code || !phone_no) {
      return res
        .status(400)
        .json({ code: "Invalid_Input", error: "Please fill all feilds" });
    }
    const newAddress = new Address({
      user_id: userId,
      address,
      city,
      state,
      pin_code,
      phone_no,
    });

    const savedAddress = await newAddress.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: savedAddress._id } },
      { new: true, upsert: true }
    );

    res.json({ code: "Address-Created-Successfully", data: newAddress });
  } catch (error) {
    console.error(error.toString());
  }
};



module.exports = { createAddress }