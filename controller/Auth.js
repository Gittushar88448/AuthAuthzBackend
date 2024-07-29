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


// Creating login business logic
exports.login = async (req, res) => {
    try {
        // Parsing data from request's body
        const { email, password } = req.body;

        // if user do not fill all the details
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }
        // Check user's entry in the database
        const user = await Authentication.findOne({ email });


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        // payload for jwt 
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }
        // Compare the request's body password or actual password , if equals then create the jwt 
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            // pushing the token to the userObject
            const userObject = { ...user.toObject() };
            userObject.token = token;

            // Hide the password from userObject to maintain privacy
            userObject.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            // Creating Cookie
            res.cookie("trush", token, options).status(200).json({
                success: true,
                token,
                userObject,
                message: "User logged in successfully"
            })
        }
        else {
            return res.status(409).json({
                success: false,
                message: "Password Incorrect!"
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
}