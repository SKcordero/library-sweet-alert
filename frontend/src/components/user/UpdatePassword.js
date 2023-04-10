import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import DeactivatedDashboard from '../layout//DeactivatedDashboard'
import DeactivatedUser from '../layout//DeactivatedUser'
import UnsetDashboard from '../layout/UnsetDashboard';
import PendingDashboard from '../layout/PendingDashboard';
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarEmpty from '../layout/SideNavbarEmpty'
import SideNavbarUnset from '../layout/SideNavbarUnset'

import { updatePassword, clearErrors } from '../../actions/studentActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/studentConstants'

const UpdatePassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const { user, loading } = useSelector(state => state.auth);
    const { error, isUpdated } = useSelector(state => state.changeStudentDetails)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            // alert.success('Password updated successfully')
            Swal.fire({
                title: 'Password Updated',
                text: 'You have successfully updated your password!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/profile')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
        
    }

    return (
        <Fragment>
            <MetaData title={'Password Update'} />
            {
                (user.status === 'deactivated') ?
                    (
                        <Fragment>
                            <SideNavbarEmpty />
                            <DeactivatedDashboard />
                        </Fragment>
                    ) : (
                        user.role === 'unset' ? (
                            <div>
                                <SideNavbarUnset />
                                <UnsetDashboard />
                            </div>
                        ) : (
                            user.role === 'request' ? (
                                <div>
                                    <SideNavbarEmpty />
                                    <PendingDashboard />
                                </div>
                            ) : (
                                user.course === undefined | null ? (
                                    <Fragment>
                                        <SideNavbarUnset />
                                        {loading || loading === undefined ? <Loader /> : (
                                            <div className='dashboard-container'>
                                                <div className='changepassword-container'>
                                                    <Link to='/profile' className='btn button-back'><i class="fa-solid fa-arrow-left"></i>Back</Link>

                                                    <div className="wrapper">
                                                        {/* <div className="col-10 col-lg-5"> */}
                                                        <form className="form-password Details shadow-lg py-4" onSubmit={submitHandler}>
                                                            <h2 className="py-4 text-center">Update Password</h2>
                                                            <div className='form-group-container p-4'>
                                                                <div className="form-group">
                                                                    <label for="old_password_field">Old Password</label>
                                                                    <input
                                                                        type="password"
                                                                        id="old_password_field"
                                                                        className="form-control"
                                                                        value={oldPassword}
                                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="new_password_field">New Password</label>
                                                                    <input
                                                                        type="password"
                                                                        id="new_password_field"
                                                                        className="form-control"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary update-btn btn-block mt-4 mb-3 w-50" >Update Password</button>
                                                        </form>
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <SideNavbarUser />
                                        {loading || loading === undefined ? <Loader /> : (
                                            <div className='dashboard-container'>
                                                <div className='changepassword-container'>
                                                    <Link to='/profile' className='btn button-back'><i class="fa-solid fa-arrow-left"></i>Back</Link>

                                                    <div className="wrapper">
                                                        {/* <div className="col-10 col-lg-5"> */}
                                                        <form className="form-password Details shadow-lg py-4" onSubmit={submitHandler}>
                                                            <h2 className="py-4 text-center">Update Password</h2>
                                                            <div className='form-group-container p-4'>
                                                                <div className="form-group">
                                                                    <label for="old_password_field">Old Password</label>
                                                                    <input
                                                                        type="password"
                                                                        id="old_password_field"
                                                                        className="form-control"
                                                                        value={oldPassword}
                                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="new_password_field">New Password</label>
                                                                    <input
                                                                        type="password"
                                                                        id="new_password_field"
                                                                        className="form-control"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary update-btn btn-block mt-4 mb-3 w-50" >Update Password</button>
                                                        </form>
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </Fragment>
                                )
                            )
                        )
                    )
            }
        </Fragment >
    )
}

export default UpdatePassword