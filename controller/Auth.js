const Authentication = require('../modal/AuthModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup business logic
exports.signup = async (req, res) => {

    try {
        // parsing data from request's body
        const { name, email, password, role } = req.body;

        // checking if User is already signup or not
        const existingUser = await Authentication.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User has already signup"
            })
        }

        //  hashing password using bcrypt library
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "error while hashing"
            });
        }
        // creating new class Authentication object
        const authentication = new Authentication({
            name, email, password: hashedPassword, role
        });

        // saved details to database
        const savedDetails = await authentication.save();

        res.status(200).json({
            success: true,
            data: savedDetails,
            message: " Data create successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}
