require('dotenv').config();
const jwt = require('jsonwebtoken');

// Authentication
exports.auth = (req, res, next) => {
    try {
        // Parsing token from request's body
        const { token } = req.body || req.cookies || req.header("Authorization").replace('Bearer '," ");

        // check token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.userObject = decode;

        } catch (err) {
            res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: "something went wrong! while verifying"
        });
    }

}

// Authorization for student
exports.isStudent = (req, res, next) => {
    try {
        if (req.userObject.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Protected route only for students"
            });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "user role can not verified"
        });
    }
}


// Authorization for admin
exports.isAdmin = (req, res, next) => {
    try {
        if (req.userObject.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "Protected route only for Admin"
            });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "user role can not verified"
        });
    }
}