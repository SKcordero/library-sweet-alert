import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getBookLeaderboards, clearErrors } from '../../actions/borrowActions'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const BookLeaderboards = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, bookCounts } = useSelector(state => state.bookLeaderboards);

    useEffect(() => {
        dispatch(getBookLeaderboards());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={'Dashboard'} />
            {loading || loading === undefined ? <Loader /> : (
                <div className="leaderboard">
                    <div className="leaderboard-header">
                        Most Borrowed Books
                    </div>
                    <div className="leaderboard-content">
                        <div className="leaderboard-thead">
                            <span></span>
                            <span>Book Name</span>
                            <span>Lended</span>
                        </div>
                        {bookCounts.map((data) =>
                            <div>
                                <div className="leaderboard-info">
                                    {(data.book_image === null || data.book_image === undefined) ? (
                                        <img src="../images/default-book.png" alt="" />
                                    ) : (
                                        (data.book_image.url === null || data.book_image.url === undefined) ? (
                                            <img src="../images/default-book.png" alt="" />
                                        ) : (
                                            <img src={data.book_image.url} alt="" />
                                        )
                                    )}
                                    <div className="book-name">
                                        <Link to={`/admin/single/book/${data._id._id}`}>
                                            {data.title}
                                        </Link>
                                    </div>
                                    <div className="lended-books">{data.count}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </Fragment >
    )
}
export default BookLeaderboards