import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


import { 
	allBooksReducer,
	newBookReducer,
	importBooksReducer,
	bookDetailsReducer,
	bookReducer,
	addBookAccessionReducer,
	bookAccessionReducer,
	accessionDetailsReducer,
	accessionReducer,
	bookReportsReducer,
	bookAccreditationReducer,
	statisticalReportsReducer,
	checkUserDetailsReducer
} from './reducers/bookReducers'

import { 
	allResearchesReducer,
	newResearchReducer,
	researchDetailsReducer,
	researchReducer,
} from './reducers/researchReducers'

import { 
	allPersonnelsReducer,
	newPersonnelReducer,
	personnelDetailsReducer,
	personnelReducer,
	allActiveStudentsReducer,
	checkPasswordReducer,
	allInactiveStudentsReducer,
	studentDetailsReducer,
	studentReducer,
	allBorrowersReducer,
	allBorrowedBooksReducer,
	acceptBorrowReducer,
	declineBorrowReducer,
	returnBookReducer,
	declineBookReducer,
	borrowedBookAccessionReducer,
	allReturnedBooksReducer,
	userDetailReducer,
	allHistoryLogReducer,
	historylogReducer,
	changeDueDateReducer,
	penaltyCheckReducer,
	penaltiesAllReducer,
	paidPenaltiesReducer,
	counterHistoryLogReducer,
	seenHistoryLogReducer
} from './reducers/personnelReducers'

import { 
	singleStudentDetailsReducer,
	changeStudentDetailsReducer,
	allStudentBooksReducer,
	studentBookDetailsReducer,
	allStudentBorrowBookReducer,
	allStudentAppointmentBookReducer,
	penaltySlipReducer,
	getStudentReturnedBookReducer
} from './reducers/studentReducers'

import { 
	borrowBookReducer,
	checkBorrowBookReducer,
	cancelBorrowBookReducer,
	confirmBorrowBookReducer,
	cancelAllBorrowBookReducer,
	borrowedBooksLengthReducer,
	pendingBookRequestsReducer,
	pendingUserRequestsReducer,
	borrowedBooksChartReducer,
	sectionBorrowedChartReducer,
	bookLeaderboardsReducer,
	borrowerLeaderboardsReducer
} from './reducers/borrowReducers'

import { 
	authReducer,
	profileReducer,
	allUsersReducer,
	getUserRoleReducer,
	updateUserRoleReducer,
	activateUserReducer,
	deactivatedUserReducer,
	endtermReducer,
	allNotificationReducer,
	notificationDeleteReducer,
	notificationAllDeleteReducer,
	counterNotificationReducer,
	seenNotificationReducer,
	allFacultiesReducer,
	pendingFacultiesReducer,
	acceptFacultyReducer,
	declineFacultyReducer,
	deleteFacultyReducer
} from './reducers/userReducers'

import {
	checkEvaluationsReducer,
	allEvaluationsReducer,
	newEvaluationReducer,
	evaluationReducer,
	studentEvaluationReducer,
	listEvaluationReducer
} from './reducers/evaluationReducers'

const reducer = combineReducers({
	auth: authReducer,
	profile:profileReducer,
	allBooks: allBooksReducer,
	bookDetails: bookDetailsReducer,
	newBook: newBookReducer,
	importBooks: importBooksReducer,
	book: bookReducer,
	addBookAccession: addBookAccessionReducer,
	bookAccession: bookAccessionReducer,
	accessionReducer: accessionReducer,
	accessionDetails: accessionDetailsReducer,
	allResearches: allResearchesReducer,
	researchDetails: researchDetailsReducer,
	newResearch: newResearchReducer,
	research: researchReducer,
	allPersonnels: allPersonnelsReducer,
	personnelDetails: personnelDetailsReducer,
	newPersonnel: newPersonnelReducer,
	personnel: personnelReducer,
	singleStudentDetails: singleStudentDetailsReducer,
	changeStudentDetails: changeStudentDetailsReducer,
	allStudentBooks: allStudentBooksReducer,
	studentBookDetails: studentBookDetailsReducer,
	allStudentBorrowBook: allStudentBorrowBookReducer,
	getStudentReturnedBook: getStudentReturnedBookReducer,
	allStudentAppointmentBook: allStudentAppointmentBookReducer,
	penaltySlip: penaltySlipReducer,
	borrowBook: borrowBookReducer,
	checkBorrowBook: checkBorrowBookReducer,
	cancelBorrowBook: cancelBorrowBookReducer,
	confirmBorrowBook: confirmBorrowBookReducer,
	cancelAllBorrowBook: cancelAllBorrowBookReducer,
	borrowedBooksLength: borrowedBooksLengthReducer,
	pendingBookRequests: pendingBookRequestsReducer,
	pendingUserRequests: pendingUserRequestsReducer,
	borrowedBooksCharts: borrowedBooksChartReducer,
	sectionBorrowedCharts: sectionBorrowedChartReducer,
	bookLeaderboards: bookLeaderboardsReducer,
	borrowerLeaderboards: borrowerLeaderboardsReducer,
	allActiveStudents: allActiveStudentsReducer,
	allInactiveStudents: allInactiveStudentsReducer,
	studentDetails: studentDetailsReducer,
	student: studentReducer,
	allBorrow: allBorrowersReducer,
	allBorrowed: allBorrowedBooksReducer,
	declineBorrower: declineBorrowReducer,
	acceptBorrower: acceptBorrowReducer,
	returnBook: returnBookReducer,
	declineBook: declineBookReducer,
	borrowedBookAccession: borrowedBookAccessionReducer,
	allReturnedState: allReturnedBooksReducer,
	userDetail: userDetailReducer,
	historyLogs: allHistoryLogReducer,
	historylog: historylogReducer,
	changeDueDate: changeDueDateReducer,
	penaltyCheck: penaltyCheckReducer,
	checkEvaluations: checkEvaluationsReducer,
	allevaluation: allEvaluationsReducer,
	newevaluation: newEvaluationReducer,
	evaluation: evaluationReducer,
	studentEvaluation: studentEvaluationReducer,
	allUsers: allUsersReducer,
	getUserRole: getUserRoleReducer,
	updateUserRole: updateUserRoleReducer,
	activateUser: activateUserReducer,
	deactivateUser: deactivatedUserReducer,
	endtermuser: endtermReducer,
	penaltiesall: penaltiesAllReducer,
	paidPenalties: paidPenaltiesReducer,
	notifications: allNotificationReducer,
	singleDeleteNotification: notificationDeleteReducer,
	allDeleteNotification: notificationAllDeleteReducer,
	counterNotification: counterNotificationReducer,
	seenNotification: seenNotificationReducer,
	getbookReports: bookReportsReducer,
	bookAccreditationReports: bookAccreditationReducer,
	bookStatisticalReports: statisticalReportsReducer,
	allFaculties: allFacultiesReducer,
	pendingFaculties: pendingFacultiesReducer,
	acceptFaculties: acceptFacultyReducer,
	declineFaculties: declineFacultyReducer,
	deleteFaculties: deleteFacultyReducer,
	counterHistoryLog: counterHistoryLogReducer,
	seenHistoryLog: seenHistoryLogReducer,
	listEvaluations: listEvaluationReducer,
	checkUserPassword: checkPasswordReducer,
	checkUserDetails: checkUserDetailsReducer
})


let initialState = {

}

const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;