const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const {
    userRole,
	updateUser,
	deactivateUser,
    activateUser,
    allUsers,
    setRole,
    endTerm,
    allFaculty,
    pendingFaculty,
    acceptFaculty,
    declineFaculty,
    deleteFaculty
} = require('../controllers/userController');

router.route('/user/role').get(isAuthenticatedUser, userRole);
router.route('/user/deactivate/:id').put(isAuthenticatedUser, deactivateUser);
router.route('/user/activate/:id').put(isAuthenticatedUser, activateUser);
router.route('/users').get(isAuthenticatedUser, allUsers);
router.route('/updateuser/role').post(isAuthenticatedUser, setRole);
router.route('/user/endterm').put(isAuthenticatedUser, endTerm);
router.route('/user/faculty').get(isAuthenticatedUser, allFaculty);
router.route('/faculty/delete/:id').delete(isAuthenticatedUser, deleteFaculty);
router.route('/user/faculty/pending').get(isAuthenticatedUser, pendingFaculty);
router.route('/user/faculty/accept/:id').put(isAuthenticatedUser, acceptFaculty);
router.route('/user/faculty/decline/:id').delete(isAuthenticatedUser, declineFaculty);

module.exports = router;