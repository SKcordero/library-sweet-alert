const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');
const bcrypt = require('bcryptjs');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const User = require('../models/user');
const Penalty = require('../models/penalty');

exports.getStudentDetails = async (req, res, next) => {
    const student = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        student
    })
}

exports.updateStudentDetails = async (req, res, next) => {
    if (req.body.birthday){
        req.body.birthday = new Date(req.body.birthday)
    }

    const student = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        success: true,
        student
    })
}

// exports.updatePassword = async (req, res, next) => {
//     const user = await User.findById(req.user.id).select('password');
//     // Check previous user password
//     const isMatched = await user.comparePassword(req.body.oldPassword)
//     if (!isMatched) {
//         return next(new ErrorHandler('Old password is incorrect'));
//     }
//     user.password = req.body.password;
//     await user.save();
//     sendToken(user, 200, res)
// }
exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('password');
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return res.status(401).json({success: false, message: 'Old password is incorrect'})
    }
    await User.findOneAndUpdate({ _id: req.user.id }, {
        password: await bcrypt.hash(req.body.password, 10)
    })
    res.status(200).json({
        success: true,
    })
}

exports.allUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
}

exports.getStudentBooks = async (req, res, next) => {
    const yearPub = await Book.find().select('yearPub -_id')
    console.log(yearPub)
    let yearPub_val = []
    yearPub.forEach(y => {
        yearPub_val.push(y.yearPub)
    });
    console.log(yearPub_val)
    let formattedYearPubArr = yearPub_val.map(Number)
    console.log(formattedYearPubArr)
    const lowestYearPub = Math.min(...formattedYearPubArr)
    console.log(lowestYearPub)
    const highestYearPub = Math.max(...formattedYearPubArr)
    console.log(highestYearPub)
    const bookSubjects = await Book.distinct('subjects')

    let sub_arr = []
    let subjects = req.body.subjects

    const isArray = Array.isArray(subjects)
    if (isArray == false) {
        sub_arr = [subjects]
    } else if (isArray == true) {
        sub_arr = subjects
    }

    let min_year = lowestYearPub.toString()
    let max_year = highestYearPub.toString()

    if (!req.body.minYear && !req.body.maxYear) {
        // console.log('1st')
        min_year = lowestYearPub.toString()
        max_year = highestYearPub.toString()
    } else if (req.body.minYear && req.body.maxYear == 'undefined') {
        // console.log('2nd')
        min_year = req.body.minYear
        max_year = highestYearPub.toString()
    } else if (req.body.minYear == 'undefined' && req.body.maxYear) {
        // console.log('3rd')
        min_year = lowestYearPub.toString()
        max_year = req.body.maxYear
    } else if (req.body.minYear && req.body.maxYear) {
        // console.log('4th')
        min_year = req.body.minYear
        max_year = req.body.maxYear
    }

    let studentbook = {}

    if (sub_arr[0] != undefined || sub_arr[0] != null) {
        studentbook = await Book.aggregate([
            {
                $match: {
                    "subjects": { "$in": sub_arr },
                    "yearPub": { '$gte': min_year, '$lte': max_year }
                }
            },
        ])
    } else {
        studentbook = await Book.aggregate([
            {
                $match: {
                    "yearPub": { '$gte': min_year, '$lte': max_year }
                }
            },
        ])
    }

    res.status(200).json({
        success: true,
        studentbook,
        lowestYearPub,
        highestYearPub,
        bookSubjects
    })
}

exports.getSingleStudentBook = async (req, res, next) => {
    const studentbook = await Book.findById(req.params.id);
    if (!studentbook) {
        return next(new ErrorHandler('Book not found', 404));
    }
    res.status(200).json({
        success: true,
        studentbook
    })
}

exports.getStudentBorrowBook = async (req, res, next) => {

    const studentborrowbook = await Borrow.findOne(
        {
            'userId': req.user.id, $or: [
                { 'status': "To Confirm" },
                { 'status': "Pending" }
            ]
        }
    )
        .populate(
            {
                path: 'bookId',
                select: ['title', 'book_image'],
            }
        );

    res.status(200).json({
        success: true,
        studentborrowbook
    })
}

exports.getStudentAppointmentBook = async (req, res, next) => {
    const studentappointmentbook = await Borrow.findOne({ 'userId': req.user.id, 'status': "Accepted" })
        .populate(
            {
                path: 'bookId',
                select: ['title', 'book_image'],
            }
        );
    res.status(200).json({
        success: true,
        studentappointmentbook
    })
}

exports.getReturnedBook = async (req, res, next) => {
    const studentreturnedbook = await Return.findOne({ 'userId': req.user.id })
        .populate(
            {
                path: 'bookId',
                select: ['title', 'book_image'],
            }
        );
    res.status(200).json({
        success: true,
        studentreturnedbook
    })
}

exports.studentPenalty = async (req, res, next) => {
    const penalties = await Penalty.findOne({ userId: req.user.id, status: 'Unpaid' }).populate({ path: 'userId' });
    const borrows = await Borrow.findOne({ userId: req.user.id }).populate({ path: 'bookId' });

    res.status(200).json({
        success: true,
        penalties,
        borrows
    })
}