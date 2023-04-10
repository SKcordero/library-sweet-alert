import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import Swal from 'sweetalert2';
import Loader from '../layout/Loader'
const SideNavbarUser = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
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
                    <div className="sidenav-container">
                        <div className="sidenav-header s-align">
                            <Link to="/dashboard">
                                <img src="/images/TUPT-Logo.png" alt="" />
                            </Link>
                        </div>
                        <ul className="menu-container">
                            <li>
                                <div className="dropdown">
                                    <Link to="/profile">
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                    <div className="dropdown-content text-center">
                                        <span>View Profile</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="sidenav-footer s-align">
                            <Link to="/" onClick={logoutHandler}>
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}

export default SideNavbarUser