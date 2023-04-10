import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'
import Loader from '../layout/Loader'
import Swal from 'sweetalert2';
import { counterHistoryLog, seenHistoryLog } from '../../actions/personnelActions'

const SideNavbarAdmin = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth)
    const { history } = useSelector(state => state.counterHistoryLog)

    useEffect(() => {
        dispatch(counterHistoryLog());
    }, [dispatch])

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

    const seenHandler = () => {
        dispatch(seenHistoryLog())
    }

    return (
        <Fragment>
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <div id="layout">
                        <a href="#menu" id="menuLink" class="menu-link">
                            <span><i className='fa-solid fa-bars'></i></span>
                        </a>
                        <div id="menu">
                            <div class="pure-menu">
                                <img src="/images/TUPT-Logo.png" width='35' height='35' alt="" />

                                <ul class="pure-menu-list">
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/dashboard">
                                                <i className="fa-solid fa-gauge"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>Dashboard</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/admin/personnels">
                                                <i class="fa-solid fa-user-gear"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>User Management</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/admin/books">
                                                <i class="fa-solid fa-book"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>Book Management</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/appointments">
                                                <i class="fa-solid fa-book-open"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>Book Requests</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/books/borrowed">
                                                <i className="fa-solid fa-book-reader"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>Borrowed & Returned</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/historyLog" onClick={() => seenHandler()}>
                                                <i className="fa-solid fa-clock-rotate-left"></i>
                                                <span className='custom-history'>{history}</span>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>History Logs</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/admin/accessionReport">
                                                <i className="fa-solid fa-file"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>Reports</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/admin/penalty">
                                                <i className="fa-solid fa-coins"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>Penalty Clearance</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="pure-menu-item">
                                        <div className="dropdown">
                                            <Link to="/admin/evaluation">
                                                <i className="fa-solid fa-clipboard-list"></i>
                                            </Link>
                                            <div className="dropdown-content text-center">
                                                <span>Evaluation</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="sidenav-footer">
                                    <Link to="/" onClick={logoutHandler}>
                                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}

export default SideNavbarAdmin