const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	getBooks,
	createBook,
	getSingleBook,
	updateBook,
	deleteBook,
	createBookAccession,
	updateBookAccession,
	singleBookAccession,
	editBookAccession,
	deleteBookAccession,
	importMRC,
	getBookReports,
	getBookAccreditation,
	BookAccreditationList,
	checkUser,		
} = require('../controllers/bookController');

router.route('/book/new').post(isAuthenticatedUser, createBook);
router.route('/admin/books').post(isAuthenticatedUser, getBooks);
router.route('/admin/single/book/:id').get(getSingleBook);
router.route('/admin/book/:id').put(isAuthenticatedUser, updateBook).delete(isAuthenticatedUser, deleteBook);
router.route('/book/accession').post(isAuthenticatedUser, createBookAccession);
router.route('/edit/accession/').post(isAuthenticatedUser, updateBookAccession);
router.route('/accession/detail/:id').get(isAuthenticatedUser, singleBookAccession);
router.route('/book/accession/:id').put(isAuthenticatedUser, editBookAccession)
router.route('/delete/accession/:id').put(isAuthenticatedUser, deleteBookAccession);
router.route('/admin/accessionReport/books').get(isAuthenticatedUser, getBookReports);
router.route('/admin/accreditationReport/books').post(isAuthenticatedUser, getBookAccreditation);
router.route('/admin/statisticalReports/books').post(isAuthenticatedUser, BookAccreditationList);

// Testing only: Comment this later or delete altogether.
// router.route('/importmrc').post(isAuthenticatedUser, importMRC);
// Uncomment below for Active:
router.route('/admin/book/importmrc').post(isAuthenticatedUser, importMRC);
router.route('/check/user').post(isAuthenticatedUser, checkUser);

module.exports = router;