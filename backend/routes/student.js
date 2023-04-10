const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	getStudentDetails,
	updateStudentDetails,
	updatePassword,
	getStudentBooks,
	getSingleStudentBook,
	getStudentBorrowBook,
	getStudentAppointmentBook,
	getReturnedBook,
	studentPenalty,
} = require('../controllers/studentController');

router.route('/getstudent/:id').get(isAuthenticatedUser, getStudentDetails);
router.route('/profile/update/:id').put(isAuthenticatedUser, updateStudentDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/books').post(isAuthenticatedUser, getStudentBooks);
router.route('/book/:id').get(getSingleStudentBook);
router.route('/borrow/request').get(isAuthenticatedUser, getStudentBorrowBook);
router.route('/borrow/books').get(isAuthenticatedUser, getStudentAppointmentBook);
router.route('/returned/books').get(isAuthenticatedUser, getReturnedBook);
router.route('/profile/penalty').get(isAuthenticatedUser, studentPenalty);


module.exports = router;