const User = require("../models/user.models");
const bcrypt = require("bcryptjs");

// User Signup
const signupUser = async (userData) => {
    const existingUser = await User.findOne({email: userData.email});
    if(existingUser){
        throw new Error("User Already Exists")
    }
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: hashPassword
    });

    return user;
}

module.exports = { signupUser };
