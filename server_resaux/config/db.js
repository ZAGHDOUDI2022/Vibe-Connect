const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://" + process.env.DB_USER_PASS +"@cluster0.4i1rsvp.mongodb.net/test"
    );
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
  }
};
module.exports = connectDB;