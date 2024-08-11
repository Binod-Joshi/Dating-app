const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  mobileNum: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  sexualOrientation: {
    type: String,
    required: true,
    enum: ["male", "female", "both", "other"],
  },
  profilePictureUrl: { type: String },
  country: {type:String},
  state: {type:String},
  city: {type:String},
  bio: { type: String },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  interests: [{ type: String }],
  lookingFor: {
    type: [String],
    enum: ["relationship", "situationship", "marriage", "casual encounter"],
  },
  onlineStatus: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
