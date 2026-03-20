const userService = require("./auth.service");

// user signup
const signup = async (req, res) => {
    try {
        const user = await userService.signupUser(req.body);
        res.status(201).json({
            success: true,
            message: "Signup Successfully",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { signup };
