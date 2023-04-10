const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bcrypt = require('bcryptjs');

const Users = require('../models/user');
const HistoryLog = require('../models/historylog');
const { sendEmailWithNodemailer } = require("../helpers/email");

exports.userRole = async (req, res, next) => {
    const user = await Users.findOne({_id: req.user_id})
    res.status(200).json({
        success: true,
        user
    })
}

exports.updatepasswordUser = async (req,res,next) => {
    try{
        Users.findOneAndUpdate({
            _id : req.params.id
        },
        {
            password: await bcrypt.hash(req.body.password, 10)
        },
        function(err, data){  
            if(err){
               return res.status(500);
            } else {
               return res.status(200).send({success: true})
            }
           });
    }catch(err){
        return next(new ErrorHandler(err,404));
    }
}

exports.allUsers = async (req, res, next) => {
    const users = await Users.find({role: "student"});
    res.status(200).json({
        success: true,
        users
    })
}

exports.setRole = async (req, res, next) => {
    if (req.body.role == 'student'){
        await Users.findByIdAndUpdate(req.body.userId, {role: req.body.role});
    }else if (req.body.role == 'faculty'){
        await Users.findByIdAndUpdate(req.body.userId, {role: 'request', course: 'Faculty', section: 'Faculty'})
    }
    res.status(200).json({
        success: true,
    })
}

exports.deactivateUser = async (req,res,next) => {
    let user = await Users.findById(req.params.id);
    const statusData = {
        status: 'deactivated'
    }

    user = await Users.findByIdAndUpdate(req.params.id, statusData)

    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const userlogin = await Users.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: userlogin.name + " has deactivated " + user.name + ", account on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Deactivate'
        }
    );

    //email send
    const emailData = {
        from: "tuptlibrary.dev@gmail.com",
        to: user.email,
        subject: "Account Deactivated",
        html:
            `<body>
                <div style="margin: 0 auto; " >
                    <h4>Email received from TUPT Library</h4>
                    <p>Your Account has been Deactivated! Please proceed to the TUP-T Library for reactivation</p>
                    <hr />
                    <p className="email-sensitive__information">This email may contain sensitive information</p>
                </div>
            </body>`
    };
    sendEmailWithNodemailer(req, res, emailData);

    res.status(200).json({
        success: true,
        user,
        history
    })
}

exports.activateUser = async (req,res,next) => {
    let user = await Users.findById(req.params.id);
    const statusData = {
        status: 'active'
    }

    user = await Users.findByIdAndUpdate(req.params.id, statusData)
    
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const userlogin = await Users.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: userlogin.name + " has activate " + user.name + ", account on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Activate'
        }
    );

    //email send
    const emailData = {
        from: "tuptlibrary.dev@gmail.com",
        to: user.email,
        subject: "Account Activated",
        html:
            `<body>
                <div style="margin: 0 auto; " >
                    <h4>Email received from TUPT Library</h4>
                    <p>Your Account is now Activated and you can now borrow and have transaction at the TUP-T Library</p>
                    <hr />
                    <p className="email-sensitive__information">This email may contain sensitive information</p>
                </div>
            </body>`
    };
    sendEmailWithNodemailer(req, res, emailData);

    res.status(200).json({
        success: true,
        user,
        history
    })
}

exports.endTerm = async (req, res, next) => {
    const users = await Users.updateMany(
        { 'role':'student' },
        {$set:{status: 'deactivated'}}
        )

    res.status(200).json({
        success: true,
        users
    })    
}

exports.allFaculty = async (req, res, next) => {
    const users = await Users.find({ 'role':'faculty'})

    res.status(200).json({
        success: true,
        users
    })
}

exports.deleteFaculty = async (req, res, next) => {
    const users = await Users.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        users
    })
}

exports.pendingFaculty = async (req, res, next) => {
    const users = await Users.find({ 'role':'request'})

    res.status(200).json({
        success: true,
        users
    })
}

exports.acceptFaculty = async (req, res, next) => {
    let user = await Users.findByIdAndUpdate(req.params.id, {
        role: 'faculty'
    })

    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const userlogin = await Users.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: userlogin.name + " has accepted a faculty: " + user.name + ", pending account on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Accept'
        }
    );

    //create notification
    const notification = await Notification.create(
        {
            receiver: user._id,
            notificationType: 'Approve',
            notificationTitle: "Appointment Approval",
            notificationText: "Congratulations!" + " " + user.name + " " + "your account has been approved",
            notificationDate: Date.now(),
            notificationWebDate: formatDate,
            deliveryStatus: 'Delivered'
        }
    );

    //email send
    const emailData = {
        from: "tuptlibrary.dev@gmail.com",
        to: user.email,
        subject: "Account Approve",
        html:
            `<body>
                <div style="margin: 0 auto; " >
                    <h4>Email received from TUPT Library</h4>
                    <p>Congratulations! Your account have been approved by the admin</p>
                    <hr />
                    <p className="email-sensitive__information">This email may contain sensitive information</p>
                </div>
            </body>`
    };
    sendEmailWithNodemailer(req, res, emailData);

    res.status(200).json({
        success: true,
        user
    })
}

exports.declineFaculty = async (req, res, next) => {
    const account = await Users.findById(req.params.id);
    if (!account) {
        return next(new ErrorHandler('Faculty not found', 404));
    }

    //creation of history log is executed first because deleting the object will remove all necessary for history log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await Users.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " deleted a faculty named: " + account.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );

    await account.remove();

    res.status(200).json({
        success: true,
        message: 'Faculty deleted',
        history
    })
}