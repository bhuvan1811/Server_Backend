const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});


// Forgot User Password
const forgotPassword = async(email) => {

    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = Date.now() + 3600000;

    await existingUser.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
        to: existingUser.email,
        subject: "Password reset request",
        html:  `
            <h3>Reset Your Password</h3>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
        `
    });
    
    return {message: "Reset link sent to email"};
}


// Reset User Password
const resetPassword = async(userData) => {
    const user = await User.findOne({email: userData.email});

    if(!user){
        throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    user.password = hashedPassword
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return {
        message: "Password reset successfully"
    };
}


// User Login
const loginUser = async (userData) => {
    const user = await User.findOne({email: userData.email}).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {id: user._id, email: user.email},
        "secret_key",
        { expiresIn: "1d" }
    );

    return{
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
        }
    }
}


const userList = async () => {
    try {
        const users = await User.find();

        return users;

    } catch (error) {
        throw new Error("Failed to load users list");
    }
}

module.exports = { loginUser, forgotPassword, resetPassword, userList };
