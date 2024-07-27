const express = require("express");
const router = express.Router();

const {signup , login} = require('../controller/Auth');

const {auth , isStudent , isAdmin} = require('../middleware/auth');

router.post('/signup' , signup);
router.post('/login' , login);

router.get('/test', auth, (req, res)=>{
    res.json({
        success: true,
        message: "welcome to the protected route for Test"
    })
});

router.get('/student', auth , isStudent, (req, res)=>{
    res.json({
        success: true,
        message: "welcome to the protected route for student"
    })
});

router.get('/admin', auth , isAdmin, (req, res)=>{
    res.json({
        success: true,
        message: "welcome to the protected route for Admin"
    })
})

module.exports = router;