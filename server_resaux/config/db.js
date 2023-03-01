const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://" + process.env.DB_USER_PASS +"@cluster0.quoaqlw.mongodb.net/test"
    );
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
  }
};
module.exports = connectDB;