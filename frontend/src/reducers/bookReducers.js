import {
    ALL_BOOKS_REQUEST,
    ALL_BOOKS_SUCCESS,
    ALL_BOOKS_FAIL,

    NEW_BOOK_REQUEST,
    NEW_BOOK_SUCCESS,
    NEW_BOOK_RESET,
    NEW_BOOK_FAIL,

    IMPORT_BOOK_REQUEST,
    IMPORT_BOOK_SUCCESS,
    IMPORT_BOOK_RESET,
    IMPORT_BOOK_FAIL,

    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,

    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_RESET,
    UPDATE_BOOK_FAIL,

    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_RESET,
    DELETE_BOOK_FAIL,

    ADD_BOOK_ACCESSION_REQUEST,
    ADD_BOOK_ACCESSION_SUCCESS,
    ADD_BOOK_ACCESSION_RESET,
    ADD_BOOK_ACCESSION_FAIL,

    ACCESSION_BOOK_REQUEST,
    ACCESSION_BOOK_SUCCESS,
    ACCESSION_BOOK_FAIL,
    ACCESSION_BOOK_RESET,

    ACCESSION_DETAILS_REQUEST,
    ACCESSION_DETAILS_SUCCESS,
    ACCESSION_DETAILS_FAIL,

    EDIT_BOOK_ACCESSION_REQUEST,
    EDIT_BOOK_ACCESSION_SUCCESS,
    EDIT_BOOK_ACCESSION_RESET,
    EDIT_BOOK_ACCESSION_FAIL,

    DELETE_BOOK_ACCESSION_REQUEST,
    DELETE_BOOK_ACCESSION_SUCCESS,
    DELETE_BOOK_ACCESSION_RESET,
    DELETE_BOOK_ACCESSION_FAIL,

    ACCESSION_REPORTS_REQUEST,
    ACCESSION_REPORTS_SUCCESS,
    ACCESSION_REPORTS_FAIL,

    ACCREDITATION_REPORTS_REQUEST,
    ACCREDITATION_REPORTS_SUCCESS,
    ACCREDITATION_REPORTS_FAIL,

    STATISTICAL_REPORTS_REQUEST,
    STATISTICAL_REPORTS_SUCCESS,
    STATISTICAL_REPORTS_FAIL,

    CHECK_USER_REQUEST,
    CHECK_USER_SUCCESS,
    CHECK_USER_FAIL,

    CLEAR_ERRORS
} from '../constants/bookConstants'
export const allBooksReducer = (state = { books: [] }, action) => {
    switch (action.type) {

        case ALL_BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload
            }

        case ALL_BOOKS_FAIL:
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

export const newBookReducer = (state = { book: {} }, action) => {
    switch (action.type) {

        case NEW_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_BOOK_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                book: action.payload.book,
                history: action.payload.history,
                user: action.payload.user
            }

        case NEW_BOOK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_BOOK_RESET:
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

export const importBooksReducer = (state = { Mrcbookdata: {} }, action) => {
    switch (action.type) {

        case IMPORT_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case IMPORT_BOOK_SUCCESS:
            return {
                loading: false,
                isImported: action.payload.success,
                Mrcbookdata: action.payload.Mrcbookdata,
            }

        case  IMPORT_BOOK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case IMPORT_BOOK_RESET:
            return {
                ...state,
                isImported: false
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

export const bookDetailsReducer = (state = { BookDetails: {} }, action) => {
    switch (action.type) {
        case BOOK_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case BOOK_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                BookDetails: action.payload,

            }
        case BOOK_DETAILS_FAIL:
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

export const bookReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BOOK_REQUEST:
        case UPDATE_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
                history: action.payload.history
            }
        case UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                history: action.payload.history
            }

        case DELETE_BOOK_FAIL:
        case UPDATE_BOOK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_BOOK_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_BOOK_RESET:
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

export const addBookAccessionReducer = (state = { accession: {} }, action) => {
    switch (action.type) {

        case ADD_BOOK_ACCESSION_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADD_BOOK_ACCESSION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                accession: action.payload.accession,
                history: action.payload.accession
            }

        case ADD_BOOK_ACCESSION_FAIL:
            return {
                ...state,
                add_book_error: action.payload
            }

        case ADD_BOOK_ACCESSION_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                add_book_error: null
            }

        default:
            return state
    }
}

export const bookAccessionReducer = (state = {}, action) => {
    switch (action.type) {

        case ACCESSION_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACCESSION_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                bookAccession: action.payload
            }
        case ACCESSION_BOOK_FAIL:
            return {
                ...state,
                accession_book_error: action.payload
            }
        case ACCESSION_BOOK_RESET:
            return {
                ...state,
                bookAccession: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                accession_book_error: null
            }

        default:
            return state
    }
}

export const accessionDetailsReducer = (state = { bookAccessions: {} }, action) => {
    switch (action.type) {
        case ACCESSION_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ACCESSION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                bookAccessions: action.payload,

            }
        case ACCESSION_DETAILS_FAIL:
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

export const accessionReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BOOK_ACCESSION_REQUEST:
        case EDIT_BOOK_ACCESSION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_BOOK_ACCESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                accessionDeleted: action.payload
            }
        case EDIT_BOOK_ACCESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                accessionEdited: action.payload
            }
        case DELETE_BOOK_ACCESSION_FAIL:
        case EDIT_BOOK_ACCESSION_FAIL:
            return {
                ...state,
                accession_error: action.payload
            }
        case DELETE_BOOK_ACCESSION_RESET:
            return {
                ...state,
                accessionDeleted: false
            }
        case EDIT_BOOK_ACCESSION_RESET:
            return {
                ...state,
                accessionEdited: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                accession_error: null
            }
        default:
            return state
    }
}

export const bookReportsReducer = (state = { books: [] }, action) => {
    switch (action.type) {

        case ACCESSION_REPORTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ACCESSION_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload
            }

        case ACCESSION_REPORTS_FAIL:
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

export const bookAccreditationReducer = (state = { books: [] }, action) => {
    switch (action.type) {

        case ACCREDITATION_REPORTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ACCREDITATION_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload
            }

        case ACCREDITATION_REPORTS_FAIL:
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

export const statisticalReportsReducer = (state = { books: [] }, action) => {
    switch (action.type) {

        case STATISTICAL_REPORTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case STATISTICAL_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload
            }

        case STATISTICAL_REPORTS_FAIL:
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

export const checkUserDetailsReducer = (state = { userdetails: {} }, action) => {
    switch (action.type) {

        case CHECK_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case CHECK_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userdetails: action.payload
            }

        case CHECK_USER_FAIL:
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