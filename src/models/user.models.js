const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required:  true,
        select: false, // This will don't return password in queries
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
},{ timestamps: true })

module.exports = mongoose.model("User", userSchema);
