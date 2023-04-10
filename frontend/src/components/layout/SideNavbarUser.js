import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Swal from 'sweetalert2';
import { logout } from '../../actions/userActions'
import { counterNotification, seenNotification } from '../../actions/userActions'

import Loader from '../layout/Loader'
const SideNavbarUser = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { notification } = useSelector(state => state.counterNotification)
    const { isSeen } = useSelector(state => state.seenNotification)
    const { user, loading } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(counterNotification(id));
    }, [dispatch])
    
    const logoutHandler = () => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            title: 'Logged out successfully!',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          dispatch(logout());
    }

    const seenHandler = (id) => {
        dispatch(seenNotification(id))
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
                                    <Link to="/dashboard">
                                        <i className="fa-solid fa-gauge"></i>
                                    </Link>
                                    <div className="dropdown-content text-center">
                                        <span>Dashboard</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown">
                                    <Link to={"/notification/" + user._id} onClick={() => seenHandler(notification._id)}>
                                        <i class="fa-solid fa-bell"></i>
                                        <span className='custom-notif'>{notification}</span>
                                    </Link>
                                    <div className="dropdown-content text-center">
                                        <span>Notification</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown">
                                    <Link to="/books">
                                        <i className="fa-solid fa-book"></i>
                                    </Link>
                                    <div className="dropdown-content text-center">
                                        <span>Books</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown">
                                    <Link to="/borrow/request">
                                        <i className="fa-solid fa-book-open"></i>
                                    </Link>
                                    <div className="dropdown-content text-center">
                                        <span>Book Requests</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown">
                                    <Link to="/borrow/books">
                                        <i className="fa-solid fa-book-reader"></i>
                                    </Link>
                                    <div className="dropdown-content text-center">
                                        <span>Borrowed Books</span>
                                    </div>
                                </div>
                            </li>
                            {(user.role === 'student')? (
                                <li>
                                <div className="dropdown">
                                    <Link to="/profile/penalty">
                                        <i className="fa-solid fa-coins"></i>
                                    </Link>
                                    <div className="dropdown-content text-center">
                                        <span>Penalties</span>
                                    </div>
                                </div>
                            </li>
                            ):(
                                <Fragment></Fragment>
                            )}

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