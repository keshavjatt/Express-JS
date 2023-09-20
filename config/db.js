const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the MongoDB Database");
  } catch (error) {
    console.log("Not connected to the MongoDB Database", error.message);
  }
};

module.exports = connectDB;
