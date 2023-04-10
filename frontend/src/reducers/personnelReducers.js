import {
    ALL_PERSONNELS_REQUEST,
    ALL_PERSONNELS_SUCCESS,
    ALL_PERSONNELS_FAIL,

    NEW_PERSONNEL_REQUEST,
    NEW_PERSONNEL_SUCCESS,
    NEW_PERSONNEL_RESET,
    NEW_PERSONNEL_FAIL,

    PERSONNEL_DETAILS_REQUEST,
    PERSONNEL_DETAILS_SUCCESS,
    PERSONNEL_DETAILS_FAIL,

    UPDATE_PERSONNEL_REQUEST,
    UPDATE_PERSONNEL_SUCCESS,
    UPDATE_PERSONNEL_RESET,
    UPDATE_PERSONNEL_FAIL,

    DELETE_PERSONNEL_REQUEST,
    DELETE_PERSONNEL_SUCCESS,
    DELETE_PERSONNEL_RESET,
    DELETE_PERSONNEL_FAIL,

    ALL_ACTIVESTUDENT_REQUEST,
    ALL_ACTIVESTUDENT_SUCCESS,
    ALL_ACTIVESTUDENT_FAIL,

    CHECK_PASSWORD_REQUEST,
    CHECK_PASSWORD_SUCCESS,
    CHECK_PASSWORD_RESET,
    CHECK_PASSWORD_FAIL,

    ALL_INACTIVESTUDENT_REQUEST,
    ALL_INACTIVESTUDENT_SUCCESS,
    ALL_INACTIVESTUDENT_FAIL,

    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,

    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_RESET,
    UPDATE_STUDENT_FAIL,

    APPROVE_STUDENT_REQUEST,
    APPROVE_STUDENT_SUCCESS,
    APPROVE_STUDENT_RESET,
    APPROVE_STUDENT_FAIL,

    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_RESET,
    DELETE_STUDENT_FAIL,

    ALL_BORROW_REQUEST,
    ALL_BORROW_SUCCESS,
    ALL_BORROW_FAIL,

    ALL_BORROWED_REQUEST,
    ALL_BORROWED_SUCCESS,
    ALL_BORROWED_FAIL,

    ACCEPT_BORROW_REQUEST,
    ACCEPT_BORROW_SUCCESS,
    ACCEPT_BORROW_FAIL,
    ACCEPT_BORROW_RESET,

    DECLINE_BORROW_REQUEST,
    DECLINE_BORROW_SUCCESS,
    DECLINE_BORROW_FAIL,
    DECLINE_BORROW_RESET,

    RETURN_BOOK_REQUEST,
    RETURN_BOOK_SUCCESS,
    RETURN_BOOK_FAIL,
    RETURN_BOOK_RESET,

    DECLINE_BOOK_REQUEST,
    DECLINE_BOOK_SUCCESS,
    DECLINE_BOOK_RESET,
    DECLINE_BOOK_FAIL,

    ACCESSION_BORROWED_REQUEST,
    ACCESSION_BORROWED_SUCCESS,
    ACCESSION_BORROWED_RESET,
    ACCESSION_BORROWED_FAIL,

    RETURNED_BOOKS_REQUEST,
    RETURNED_BOOKS_SUCCESS,
    RETURNED_BOOKS_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    ALL_HISTORYLOG_REQUEST,
    ALL_HISTORYLOG_SUCCESS,
    ALL_HISTORYLOG_FAIL,

    DELETE_HISTORYLOG_REQUEST,
    DELETE_HISTORYLOG_SUCCESS,
    DELETE_HISTORYLOG_FAIL,
    DELETE_HISTORYLOG_RESET,

    DELETE_ALL_HISTORYLOG_REQUEST,
    DELETE_ALL_HISTORYLOG_SUCCESS,
    DELETE_ALL_HISTORYLOG_RESET,
    DELETE_ALL_HISTORYLOG_FAIL,

    UPDATE_DUE_DATE_REQUEST,
    UPDATE_DUE_DATE_SUCCESS,
    UPDATE_DUE_DATE_RESET,
    UPDATE_DUE_DATE_FAIL,

    PENATY_CHECK_REQUEST,
    PENATY_CHECK_SUCCESS,
    PENATY_CHECK_FAIL,

    ALL_PENALTIES_REQUEST,
    ALL_PENALTIES_SUCCESS,
    ALL_PENALTIES_FAIL,

    PAID_PENALTIES_REQUEST,
    PAID_PENALTIES_SUCCESS,
    PAID_PENALTIES_RESET,
    PAID_PENALTIES_FAIL,

    COUNTER_HISTORYLOG_REQUEST,
    COUNTER_HISTORYLOG_SUCCESS,
    COUNTER_HISTORYLOG_FAIL,

    SEEN_HISTORYLOG_REQUEST,
    SEEN_HISTORYLOG_SUCCESS,
    SEEN_HISTORYLOG_FAIL,
    SEEN_HISTORYLOG_RESET,

    CLEAR_ERRORS
} from '../constants/personnelConstants'
export const allPersonnelsReducer = (state = { personnels: [] }, action) => {
    switch (action.type) {

        case ALL_PERSONNELS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_PERSONNELS_SUCCESS:
            return {
                ...state,
                loading: false,
                personnels: action.payload
            }

        case ALL_PERSONNELS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newPersonnelReducer = (state = { personnel: {} }, action) => {
    switch (action.type) {

        case NEW_PERSONNEL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PERSONNEL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                personnel: action.payload.personnel
            }

        case NEW_PERSONNEL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_PERSONNEL_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const personnelDetailsReducer = (state = { personnel: {} }, action) => {
    switch (action.type) {
        case PERSONNEL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PERSONNEL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                personnel: action.payload,

            }
        case PERSONNEL_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const personnelReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_PERSONNEL_REQUEST:
        case UPDATE_PERSONNEL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_PERSONNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                PersonnelDeleted: action.payload
            }
        case UPDATE_PERSONNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_PERSONNEL_FAIL:
        case UPDATE_PERSONNEL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_PERSONNEL_RESET:
            return {
                ...state,
                PersonnelDeleted: false
            }
        case UPDATE_PERSONNEL_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const allActiveStudentsReducer = (state = { active_students: [] }, action) => {
    switch (action.type) {

        case ALL_ACTIVESTUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_ACTIVESTUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                active_students: action.payload,
                userPassword: action.payload
            }

        case ALL_ACTIVESTUDENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const checkPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case CHECK_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CHECK_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isChecked: action.payload
            }
        case CHECK_PASSWORD_FAIL:
            return {
                ...state,
                check_error: action.payload
            }
        case CHECK_PASSWORD_RESET:
            return {
                ...state,
                isChecked: false,
                check_error: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                check_error: null
            }

        default:
            return state
    }
}

export const allInactiveStudentsReducer = (state = { inactive_students: [] }, action) => {
    switch (action.type) {

        case ALL_INACTIVESTUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_INACTIVESTUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                inactive_students: action.payload
            }

        case ALL_INACTIVESTUDENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const studentDetailsReducer = (state = { student: {} }, action) => {
    switch (action.type) {
        case STUDENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case STUDENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                student: action.payload,

            }
        case STUDENT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const studentReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_STUDENT_REQUEST:
        case UPDATE_STUDENT_REQUEST:
        case APPROVE_STUDENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                StudentDeleted: action.payload,
                history: action.payload.history
            }
        case UPDATE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case APPROVE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isApproved: action.payload
            }

        case DELETE_STUDENT_FAIL:
        case UPDATE_STUDENT_FAIL:
        case APPROVE_STUDENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_STUDENT_RESET:
            return {
                ...state,
                StudentDeleted: false
            }
        case UPDATE_STUDENT_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case APPROVE_STUDENT_RESET:
            return {
                ...state,
                isApproved: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const allBorrowersReducer = (state = { borrowers: [] }, action) => {
    switch (action.type) {

        case ALL_BORROW_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_BORROW_SUCCESS:
            return {
                ...state,
                loading: false,
                borrowers: action.payload
            }

        case ALL_BORROW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allBorrowedBooksReducer = (state = { borrowedbooks: [] }, action) => {
    switch (action.type) {
        case ALL_BORROWED_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_BORROWED_SUCCESS:
            return {
                ...state,
                loading: false,
                borrowedbooks: action.payload
            }

        case ALL_BORROWED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const acceptBorrowReducer = (state = {}, action) => {
    switch (action.type) {

        case ACCEPT_BORROW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ACCEPT_BORROW_SUCCESS:
            return {
                ...state,
                loading: false,
                isAccepted: action.payload,
                history: action.payload.history
            }

        case ACCEPT_BORROW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case ACCEPT_BORROW_RESET:
            return {
                ...state,
                loading: false,
                isAccepted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const declineBorrowReducer = (state = {}, action) => {
    switch (action.type) {

        case DECLINE_BORROW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DECLINE_BORROW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeclined: action.payload,
                history: action.payload.history
            }

        case DECLINE_BORROW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DECLINE_BORROW_RESET:
            return {
                ...state,
                loading: false,
                isDeclined: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const returnBookReducer = (state = {}, action) => {
    switch (action.type) {

        case RETURN_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case RETURN_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isReturned: action.payload,
                history: action.payload.history
            }

        case RETURN_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case RETURN_BOOK_RESET:
            return {
                ...state,
                loading: false,
                isReturned: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const declineBookReducer = (state = {}, action) => {
    switch (action.type) {

        case DECLINE_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DECLINE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDecline: action.payload,
                history: action.payload.history
            }

        case DECLINE_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DECLINE_BOOK_RESET:
            return {
                ...state,
                loading: false,
                isDecline: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const borrowedBookAccessionReducer = (state = {}, action) => {
    switch (action.type) {

        case ACCESSION_BORROWED_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACCESSION_BORROWED_SUCCESS:
            return {
                ...state,
                loading: false,
                borrowedAccession: action.payload
            }
        case ACCESSION_BORROWED_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ACCESSION_BORROWED_RESET:
            return {
                ...state,
                borrowedAccession: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const allReturnedBooksReducer = (state = { returnedbooks: [] }, action) => {
    switch (action.type) {
        case RETURNED_BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case RETURNED_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                returnedbooks: action.payload
            }

        case RETURNED_BOOKS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const userDetailReducer = (state = { userdetail: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                userdetail: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const allHistoryLogReducer = (state = { history: [] }, action) => {
    switch (action.type) {

        case ALL_HISTORYLOG_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_HISTORYLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                history: action.payload
            }

        case ALL_HISTORYLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const historylogReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_HISTORYLOG_REQUEST:
        case DELETE_ALL_HISTORYLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ALL_HISTORYLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeletedAll: action.payload
            }
        case DELETE_HISTORYLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_HISTORYLOG_FAIL:
        case DELETE_ALL_HISTORYLOG_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_HISTORYLOG_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case DELETE_ALL_HISTORYLOG_RESET:
            return {
                ...state,
                isDeletedAll: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const changeDueDateReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_DUE_DATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_DUE_DATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isChange: action.payload,
                getDueDate: action.payload
            }
        case UPDATE_DUE_DATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_DUE_DATE_RESET:
            return {
                ...state,
                isChange: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const penaltyCheckReducer = (state = { penalty_count: [] }, action) => {
    switch (action.type) {

        case PENATY_CHECK_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PENATY_CHECK_SUCCESS:
            return {
                ...state,
                loading: false,
                penalty_count: action.payload
            }

        case PENATY_CHECK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const penaltiesAllReducer = (state = { penalties: [] }, action) => {
    switch (action.type) {

        case ALL_PENALTIES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_PENALTIES_SUCCESS:
            return {
                ...state,
                loading: false,
                penalties: action.payload
            }

        case ALL_PENALTIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const paidPenaltiesReducer = (state = {}, action) => {
    switch (action.type) {

        case PAID_PENALTIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PAID_PENALTIES_SUCCESS:
            return {
                ...state,
                loading: false,
                isPaid: action.payload
            }
        case PAID_PENALTIES_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case PAID_PENALTIES_RESET:
            return {
                ...state,
                isPaid: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const counterHistoryLogReducer = (state = { history: [] }, action) => {
    switch (action.type) {

        case COUNTER_HISTORYLOG_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case COUNTER_HISTORYLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                history: action.payload
            }

        case COUNTER_HISTORYLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const seenHistoryLogReducer = (state = {}, action) => {
    switch (action.type) {

        case SEEN_HISTORYLOG_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SEEN_HISTORYLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                isSeen: action.payload,
            }

        case SEEN_HISTORYLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case SEEN_HISTORYLOG_RESET:
            return {
                ...state,
                loading: false,
                isSeen: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}