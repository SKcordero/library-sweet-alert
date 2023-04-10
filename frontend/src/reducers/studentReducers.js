import {
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL,

    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_RESET,
    UPDATE_STUDENT_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,

    ALL_STUDENTBOOKS_REQUEST,
    ALL_STUDENTBOOKS_SUCCESS,
    ALL_STUDENTBOOKS_FAIL,

    STUDENTBOOK_DETAILS_REQUEST,
    STUDENTBOOK_DETAILS_SUCCESS,
    STUDENTBOOK_DETAILS_FAIL,

    BORROWBOOK_REQUEST,
    BORROWBOOK_SUCCESS,
    BORROWBOOK_FAIL,

    RETURNEDBOOK_REQUEST,
    RETURNEDBOOK_SUCCESS,
    RETURNEDBOOK_FAIL,

    APPOINTMENTBOOK_REQUEST,
    APPOINTMENTBOOK_SUCCESS,
    APPOINTMENTBOOK_FAIL,

    PENALTYSLIP_REQUEST,
    PENALTYSLIP_SUCCESS,
    PENALTYSLIP_FAIL,

    CLEAR_ERRORS
} from '../constants/studentConstants'

export const singleStudentDetailsReducer = (state = { student: {} }, action) => {
    switch (action.type) {
        case GET_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                student: action.payload,

            }
        case GET_STUDENT_FAIL:
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

export const changeStudentDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_STUDENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_STUDENT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_PASSWORD_RESET:
        case UPDATE_STUDENT_RESET:
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

export const allStudentBooksReducer = (state = { studentbooks: [] }, action) => {
    switch (action.type) {

        case ALL_STUDENTBOOKS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_STUDENTBOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                studentbooks: action.payload
            }

        case ALL_STUDENTBOOKS_FAIL:
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


export const studentBookDetailsReducer = (state = { studentbook: {} }, action) => {
    switch (action.type) {
        case STUDENTBOOK_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case STUDENTBOOK_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                studentbook: action.payload,

            }
        case STUDENTBOOK_DETAILS_FAIL:
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

export const allStudentBorrowBookReducer = (state = { studentborrowbooks: {} }, action) => {
    switch (action.type) {

        case BORROWBOOK_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case BORROWBOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                studentborrowbooks: action.payload
            }

        case BORROWBOOK_FAIL:
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

export const getStudentReturnedBookReducer = (state = { studentreturnedbook: {} }, action) => {
    switch (action.type) {

        case RETURNEDBOOK_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case RETURNEDBOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                studentreturnedbook: action.payload
            }

        case RETURNEDBOOK_FAIL:
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

export const allStudentAppointmentBookReducer = (state = { studentappointmentbook: {} }, action) => {
    switch (action.type) {

        case APPOINTMENTBOOK_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case APPOINTMENTBOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                studentappointmentbook: action.payload
            }

        case APPOINTMENTBOOK_FAIL:
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

export const penaltySlipReducer = (state = { penalty: {} }, action) => {
    switch (action.type) {

        case PENALTYSLIP_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PENALTYSLIP_SUCCESS:
            return {
                ...state,
                loading: false,
                penalty: action.payload
            }

        case PENALTYSLIP_FAIL:
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