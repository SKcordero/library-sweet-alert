import axios from 'axios';
import {
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL,

    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
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

export const getStudentDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_STUDENT_REQUEST })
        const { data } = await axios.get(`/api/v1/getstudent/${id}`)
        dispatch({
            type: GET_STUDENT_SUCCESS,
            payload: data.student
        })
    } catch (error) {
        dispatch({
            type: GET_STUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateStudent = (id, studentData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_STUDENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/profile/update/${id}`, studentData, config)

        dispatch({
            type: UPDATE_STUDENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_STUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allStudentBooks = (bookData) => async (dispatch) => {
    try {

        dispatch({ type: ALL_STUDENTBOOKS_REQUEST })

        // let link = `/api/v1/books?&yearPub[lte]=${yearPub[1]}&yearPub[gte]=${yearPub[0]}`

        // if (subjects) {
        //     link = `/api/v1/books?&yearPub[lte]=${yearPub[1]}&yearPub[gte]=${yearPub[0]}&subjects=${subjects}`
        // }
        // const { data } = await axios.get('/api/v1/admin/books')

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.post(`/api/v1/books`, bookData, config)

        dispatch({
            type: ALL_STUDENTBOOKS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_STUDENTBOOKS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getStudentBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: STUDENTBOOK_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/book/${id}`)
        dispatch({
            type: STUDENTBOOK_DETAILS_SUCCESS,
            payload: data.studentbook
        })
    } catch (error) {
        dispatch({
            type: STUDENTBOOK_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allStudentBorrowBook = () => async (dispatch) => {
    try {

        dispatch({ type: BORROWBOOK_REQUEST })

        const { data } = await axios.get('/api/v1/borrow/request')

        dispatch({
            type: BORROWBOOK_SUCCESS,
            payload: data.studentborrowbook
        })

    } catch (error) {
        dispatch({
            type: BORROWBOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allStudentReturnedBook = () => async (dispatch) => {
    try {

        dispatch({ type: RETURNEDBOOK_REQUEST })

        const { data } = await axios.get('/api/v1/returned/request')

        dispatch({
            type: RETURNEDBOOK_SUCCESS,
            payload: data.studentreturnedbook
        })

    } catch (error) {
        dispatch({
            type: RETURNEDBOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allStudentAppointmentBook = () => async (dispatch) => {
    try {

        dispatch({ type: APPOINTMENTBOOK_REQUEST })

        const { data } = await axios.get('/api/v1/borrow/books')

        dispatch({
            type: APPOINTMENTBOOK_SUCCESS,
            payload: data.studentappointmentbook
        })

    } catch (error) {
        dispatch({
            type: APPOINTMENTBOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPenaltySlip = () => async (dispatch) => {
    try {

        dispatch({ type: PENALTYSLIP_REQUEST })

        const { data } = await axios.get('/api/v1/profile/penalty')

        dispatch({
            type: PENALTYSLIP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PENALTYSLIP_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}