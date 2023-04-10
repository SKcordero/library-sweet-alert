import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import Swal from 'sweetalert2';
import { userRole, updateRole,  clearErrors } from '../../actions/userActions'
import { UPDATE_ROLE_RESET } from '../../constants/userConstants';

const UnsetDashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { user , loading} = useSelector(state => state.getUserRole);
    const { roleUpdated, error } = useSelector(state => state.updateUserRole)

    useEffect(() => {
        dispatch(userRole())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (roleUpdated) {
            // alert.success('Role updated');
            Swal.fire({
                title: 'Role Updated',
                text: 'Role updated successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            dispatch({ type: UPDATE_ROLE_RESET })
            navigate(0);
        }

    }, [dispatch,  roleUpdated, alert, error, navigate])

    const roleStudent = () => {
        Swal.fire({
            title: 'Student Role',
            text: 'Your role will be set as student, do you want to continue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
                console.group(user)
                const formData = new FormData();
                formData.set('userId', user._id)
                formData.set('role', 'student')

                dispatch(updateRole(formData))
            }
          });
    }

    const roleFaculty = () => {
        Swal.fire({
            title: 'Faculty Role',
            text: 'Your role will be set as faculty, do you want to continue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.set('userId', user._id)
                formData.set('role', 'faculty')

                dispatch(updateRole(formData))
            }
          });
    }

    return (
        <Fragment>
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <div className="management-content">
                        <div className='content-center'>
                            <h1>Good Day!</h1>
                            <h4>Please Select your role</h4>
                            <div clas="row button_row">
                                <button className='btn btn-student' onClick={() => roleStudent()}>
                                    <img className='student_icon' alt='student_icon' src='https://res.cloudinary.com/dxcrzvpbz/image/upload/v1678173852/TUPT_Library/Resources/student_icon_jd86nl.png' />
                                    STUDENT
                                </button>

                                <button className='btn btn-faculty' onClick={() => roleFaculty()}>
                                    <img className="faculty_icon" alt='faculty_icon' src=' https://res.cloudinary.com/dxcrzvpbz/image/upload/v1678175171/TUPT_Library/Resources/faculty_icon_l43sn5.png' />
                                    FACULTY
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default UnsetDashboard