const mongoose = require('mongoose');
const { isEmail } = require('validator');

    
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    firstname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
    },
    lastname : {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
    },
    isAdmin : {
        type: Boolean,
        default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [String] ,
    following: [String]
},
  {
    timestamps: true,
  }
);




const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;