import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { borrowedBooksLength, pendingBookRequests, clearErrors } from '../../actions/borrowActions'
import { getPenaltyCheck } from '../../actions/personnelActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import ReturnedBooksCharts from './ReturnedBooksChart'
import SectionBorrowedCharts from './SectionBorrowedChart'
import BookLeaderboards from './BookLeaderboards'
import BorrowerLeaderboards from './BorrowerLeaderboards'
import Loader from '../layout/Loader'

const AdminDashboard = () => {

    // const myArray = [1]
    // const myArrayLength = myArray.length
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, borrowedbooksLength } = useSelector(state => state.borrowedBooksLength);
    const { pendingBooksRequests } = useSelector(state => state.pendingBookRequests);
    const { penalty_count } = useSelector(state => state.penaltyCheck);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(borrowedBooksLength());
        dispatch(pendingBookRequests());
        dispatch(getPenaltyCheck());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    console.log(penalty_count)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
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
                                    <span>Welcome, {user.name} |<strong className='role_text'>{user.role}</strong></span>
                                </div>
                            </div>
                            <div className="overview-cards">
                                <div className="card card1">
                                    <div className="card-content">
                                        <i className="fa-solid fa-book-open" id="fa-book-open"></i>
                                        <span>{pendingBooksRequests}</span>
                                        <Link to="/appointments"><h1>Book Requests</h1></Link>
                                    </div>
                                </div>
                                <div className="card card2">
                                    <div className="card-content">
                                        <i className="fa-solid fa-book-open-reader" id="fa-book-open-reader"></i>
                                        <span>{borrowedbooksLength}</span>
                                        <Link to="/books/borrowed"><h1>Borrowed Books</h1></Link>
                                    </div>
                                </div>
                                <div className="card card3">
                                    <div className="card-content">
                                        <i className="fa-solid fa-user" id="fa-user"></i>
                                        <span>{penalty_count}</span>
                                        <Link to="/admin/penalty"><h1>Student Penalties</h1></Link> 
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <hr/>
                        </div>
                        <div className="dashboard-analytics__container">
                            <div className="dashboard-header">
                                <h1 className="overview pt-2 pb-4">Analytics</h1>
                            </div>
                            <div className="analytics">
                                {/* <SectionBorrowedCharts />
                                <ReturnedBooksCharts />
                                <BookLeaderboards /> */}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default AdminDashboard