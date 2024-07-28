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

