import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import { Link } from 'react-router-dom'

import DeactivatedUser from '../layout/DeactivatedUser'
const UserDashboard = () => {
    const [show, setShow] = useState(true);
    const { user, loading } = useSelector(state => state.auth)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    {(user.course === undefined | null) ?
                        (
                            <DeactivatedUser />
                        ) : (
                            <div className='dashboard-container'>
                                <div className="dashboard-overview">
                                    <div className="dashboard-header">
                                        <h1 className='pt-2 pb-4'>Dashboard Overview</h1>
                                        <div className="profile pt-2 pb-4">
                                            {
                                                user.avatar.url == null | undefined ?
                                                    (
                                                        <img className="profile-img" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1670251835/TUPT_Library/Resources/profile_image_mvaoy5.png" alt="" />
                                                    ) :
                                                    (
                                                        <img className="profile-img" src={user.avatar.url} alt="" />
                                                    )
                                            }
                                            <span>Welcome, <Link to="/profile" >{user.name}</Link> |<strong>{user.role}</strong></span>
                                        </div>
                                    </div>
                                    <div className="overview-cards">
                                        <div className="card card1">
                                            <div className="card-content">
                                                <i className="fa-solid fa-book-open" id="fa-book-open"></i>
                                                <span>1.1k</span>
                                                <h1>Borrowed Books</h1>
                                            </div>
                                        </div>
                                        <div className="card card2">
                                            <div className="card-content">
                                                <i className="fa-solid fa-book-open-reader" id="fa-book-open-reader"></i>
                                                <span>3.3k</span>
                                                <h1>Pending Book Approval</h1>
                                            </div>
                                        </div>
                                        <div className="card card3">
                                            <div className="card-content">
                                                <i className="fa-solid fa-user" id="fa-user"></i>
                                                <span>5.5k</span>
                                                <h1>Penaty</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <hr />
                                    <div className="dashboard-header">
                                        <h1 className='pt-2 pb-4'>Recent Notification</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Fragment >
            )}
        </Fragment >
    )
}
export default UserDashboard