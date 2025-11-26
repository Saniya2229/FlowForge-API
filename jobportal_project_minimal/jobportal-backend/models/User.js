// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "seeker" },
    // add other profile fields as needed (firstName, lastName, etc.)
  },
  { timestamps: true, strict: false }
);

// optional instance method to compare password
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
