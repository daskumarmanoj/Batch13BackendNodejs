const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connect Successfully");
  } catch (error) {
    console.log("Database Connection error", error.message);
  }
};

module.exports = connectDB;
