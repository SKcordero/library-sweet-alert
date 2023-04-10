import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import { logout } from '../../actions/userActions'
import Swal from 'sweetalert2';


const UserDashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        // alert.success('Logged out successfully.')
        Swal.fire({
            toast: true,
            position: 'top-end',
            title: 'Logged out successfully!',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
    }


    return (
        <Fragment>
            <div className='dashboard-container'>
                <div className='form-container d-flex justify-content-center align-items-center flex-column mt-5'>
                    <div className="pendingdashboard text-center py-5 mt-5">
                        <h1>Your account is still pending for approval</h1>
                    </div>
                    <button onClick={logoutHandler} className='btn btn-danger text-white d-flex justify-content-center align-items-center'>
                        Logout
                        <i className="fa-solid fa-arrow-right-to-bracket ml-2"></i>
                    </button>

                </div>
            </div>
        </Fragment>
    )
}
export default UserDashboard