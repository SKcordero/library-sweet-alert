const crypto = require('crypto');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorhand');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    // Checks if email and password is entered by user
    if (!email || !password) {
        return res.status(401).json({success: false, message: 'Please enter email & password'})
    }

    const user = await User.findOne({email}).select('+password')
    if (!user) {
        return res.status(401).json({success: false, message: 'Invalid Credentials'})
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({success: false, message: 'Invalid Email or Password'})
    }
     // Checks if ACCOUNT IS DEACTIVATED
    if (user.status == "deactivated" ) {   
        return res.status(401).json({success: false, message: 'Your Account is Deactivated'})
    }
    sendToken(user, 200, res)
}


exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
}

exports.googlesignin = async (req, res, next) => {
    const userinfo = req.body.currentUser;
    try {
        // Find the user with the given email
        const user = await User.findOne({email: userinfo.email});
        if (user) {
            sendToken(user, 200, res);
        } else {
          // If the user doesn't exist, create a new user with "fresh" status
          const newUser = new User({
            email: userinfo.email,
            password: userinfo.lastName,
            name: userinfo.firstName+" "+userinfo.lastName,
            avatar: {
                url: userinfo.photoUrl
            },
            status: 'fresh',
          });
          await newUser.save();
          res.status(200).json({
                success: true,
                user
            })
        }
    } catch (error) {
        // Handle any errors that occur
        console.log(error)
        res.status(404).json({
                success: false,
                message: "An Error has occured",
            })
    }
}