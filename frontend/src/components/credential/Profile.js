import React, { Fragment, useEffect } from 'react'
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import SideNavbarUnset from '../layout/SideNavbarUnset'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { profile } from '../../actions/userActions'

const Profile = () => {
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.profile)

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    return (
        <Fragment>
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />
                    {
                        user.role === "student" || user.role === "faculty" ? (
                            user.course === undefined | null ? (
                                <SideNavbarUnset />
                            ):(
                                <SideNavbarUser />
                            )
                            
                        ) : (
                            <SideNavbarAdmin />
                        )
                    }
                    <div className="dashboard-container">
                        <div className="profile-card--container">
                            <div className="profile-content">
                                <div className="student-information--one">
                                    <img src={user.avatar.url} alt="" />
                                    <div className="student-name">
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="gender">
                                        {(user.gender === 'Male') ?
                                            <i id="editprofile" className="fa-solid fa-mars text-primary" /> : <i id="editprofile" className="fa-solid fa-venus text-error" />}
                                    </div>
                                    <div className="tupt-id">
                                        <span>{(user.id_number === undefined | null) ? "not set" : user.id_number}</span>
                                    </div>
                                    <Link to={"/profile/update/" + user._id} className='edit-profile'>edit profile</Link>
                                    <Link to={"/user/updatepassword/"} className="change-password">Change Password</Link>
                                </div>
                                <div className="student-information--two">
                                    <h1>Student Information</h1>
                                    <div className="course align">
                                        <span>Course</span>
                                        <p>{(user.course === undefined | null) ? "not set" : user.course}</p>
                                    </div>
                                    <div className="section align">
                                        <span>Section</span>
                                        <p>{(user.section === undefined | null) ? "not set" : user.course+'-'+user.section}</p>
                                    </div>
                                    <div className="email align">
                                        <span>Email Address</span>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="phone-number align">
                                        <span>Phone Number</span>
                                        <p>(+63) {user.contact} {' '}</p>
                                    </div>
                                    <div className="address align">
                                        <span>Address</span>
                                        <p>{user.address}</p>
                                    </div>
                                    <div className="birthday align">
                                        <span>Birthday</span>
                                        <p>{(user.birthday === undefined | null) ? "not set" : dateFormat(user.birthday.split('T')[0], "dd-mm-yyyy")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default Profile