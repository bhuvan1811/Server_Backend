const userService = require("../services/user.service");

// user login
const login = async(req, res) => {
    try {
        const result = await userService.loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;
        const result = await userService.forgotPassword(email);
        res.status(200).json({
            success: true,
            message: "Otp sent successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const resetPassword = async(req, res) => {
    try {
        const result = await userService.resetPassword(req.body)
        res.status(200).json({
            success: true,
            message: "Password reset successful",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const usersList = async(req, res) => {
    try {
        const result = await userService.userList(req.body);
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { login, forgotPassword, resetPassword, usersList };
