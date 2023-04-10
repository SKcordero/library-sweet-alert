import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import Swal from 'sweetalert2';
import Loader from './Loader'
const SideNavbarRequest = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    // const { user, loading } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.auth)

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
                    <nav className="sidenav-container">
                        <div className="sidenav-footer">
                            <Link to="/" onClick={logoutHandler}>
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </Link>
                        </div>
                    </nav>
                    
                </Fragment>
            )}
        </Fragment>
    )
}
export default SideNavbarRequest