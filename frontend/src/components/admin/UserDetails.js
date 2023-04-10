import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { getUserDetail, clearErrors } from '../../actions/personnelActions'

const UserDetails = () => {

    const dispatch = useDispatch();
    let { id } = useParams();

    const { userdetail, loading } = useSelector(state => state.userDetail)

    useEffect(() => {
        dispatch(getUserDetail(id))
    }, [dispatch])

    // { console.log(loading) }
    return (
        <Fragment>
            <MetaData title={'User Details'} />
            <SideNavbarAdmin />
            {loading || loading == undefined ? <Loader /> : (
                <Fragment>
                    <div className="dashboard-container">
                        <div className="user-container">
                        <h5>List of Borrowed Books</h5>
                        <h4>{userdetail.userinfo.name}</h4>
                            {userdetail.returnedBooks && userdetail.returnedBooks.map(data => (
                                <Fragment>
                                    <div className="list-returned-container">
                                        <div className="list-returned__books">
                                            <div>
                                                {data.bookId.map(datanew => (
                                                    <h3>{datanew.title}</h3>
                                                ))}
                                            </div>
                                            <p className='ml-auto'>Date Returned: {(data.returnedDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })).substring(0, 10)}</p>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>

    )

}

export default UserDetails