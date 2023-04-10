import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import Swal from 'sweetalert2';
import { logout } from '../../actions/userActions'

const DeactivatedDashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    // const { roleUpdated, error } = useSelector(state => state.updateUserRole)

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
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <div className="dashboard-container">
                        <div className='table-container text-center deactivated'>
                            <h1>Good Day!</h1>
                            <p>Your account is currently <strong>Deactivated</strong>.</p>
                            <p>This is due to either you have violated library policy or it is end of term.</p>
                            <p>If you think this is an error. Please Contact Library Personnel or speak them directly at the TUPT Library.</p>
                            <p>If you see this at the end of this term. Please evaluate at the TUPT Library Facility first in order to restore the system functionality.</p>
                            <button className='btn btn-danger' onClick={logoutHandler}>
                            {/* <Link to="/" onClick={logoutHandler}> */}
                                Logout <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            {/* </Link> */}
                            </button>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default DeactivatedDashboard