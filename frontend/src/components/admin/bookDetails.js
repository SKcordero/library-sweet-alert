import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { getBookDetails, clearErrors } from '../../actions/bookActions'

const BookDetails = () => {

    const dispatch = useDispatch();
    let { id } = useParams();
    // let loading = true;

    const { BookDetails, loading } = useSelector(state => state.bookDetails)

    useEffect(() => {
        // loading = true
        dispatch(getBookDetails(id))
    }, [dispatch])

    const dateEntered = BookDetails.date_entered
    const dateUpdated = BookDetails.date_updated
    
    const formattedDateEntered = dateEntered ? dateEntered.slice(0, 10) : '';
    const formattedDateUpdated = dateUpdated ? dateUpdated.slice(0, 10) : '';

    return (
        <Fragment>
            {/* {loading == true ? <Loader /> :( */}
            {loading || loading == undefined ? <Fragment /> : (
                <Fragment>
                    <MetaData title={'User Details'} />
                    <SideNavbarAdmin />
                    <div className="dashboard-container">
                        <div className="book-details__container">
                            <div className="book-details__nav">
                                <div className="book-title">
                                    {BookDetails.title}
                                </div>
                            </div>
                            <div className="book-details__content">
                                {((BookDetails.book_image == null || undefined) || (BookDetails.book_image.url == null || undefined)) ?
                                    <img alt="" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png" />
                                    :
                                    <img alt="" src={BookDetails.book_image.url} />
                                }
                                <div className="book-details-wrapper">
                                    <h3>Title & Statement Responsibility Area</h3>
                                    <ul>
                                        <li>Responsibility: {BookDetails.responsibility}</li>
                                        <li>Uniform Title: {BookDetails.uniform_title}</li>
                                        <li>Parallel Title: {BookDetails.parallel_title}</li>
                                        <li>Main Author: {BookDetails.main_author}</li>
                                        <li>Contributors: {BookDetails.contributors}</li>
                                        <li>Corporate Author: {BookDetails.corp_author}</li>
                                    </ul>
                                    <h3>Local & Other Information</h3>
                                    <ul>
                                        <li>Call Number: {BookDetails.call_number}</li>
                                        <li>Language: {BookDetails.languange}</li>
                                        <li>Library/Location: {BookDetails.location}</li>
                                        <li>Entered By: {BookDetails.entered_by}</li>
                                        <li>Updated By: {BookDetails.updated_by}</li>
                                        <li>Date Entered: {formattedDateEntered}</li>
                                        <li>Date Updated: {formattedDateUpdated}</li>
                                        <li>Copy: {BookDetails.copy}</li>
                                        <li>On Shelf: {BookDetails.on_shelf}</li>
                                        <li>Out: {BookDetails.out}</li>
                                        <li>Times Out: {BookDetails.times_out}</li>
                                        <li>ID: {BookDetails.id}</li>
                                        <li>Subjects: {BookDetails.subject}</li>
                                        <li>Times Borrowed: {BookDetails.borrow_count}</li>
                                        <li>Ratings: {BookDetails.ratings}</li>
                                    </ul>
                                </div>
                                <div className="book-details-wrapper">
                                    <h3>Published, ISBN, Description etc.</h3>
                                    <ul>
                                        <li>Place of Publication: {BookDetails.placePub}</li>
                                        <li>Publisher: {BookDetails.publisher}</li>
                                        <li>Year of Publication: {BookDetails.yearPub}</li>
                                        <li>Edition: {BookDetails.edition}</li>
                                        <li>Pages/Extent: {BookDetails.pages}</li>
                                        <li>Other Details: {BookDetails.other_details}</li>
                                        <li>Dimension: {BookDetails.dimension}</li>
                                        <li>Acc. Materials: {BookDetails.acc_materials}</li>
                                        <li>Series: {BookDetails.series}</li>
                                        <li>General Notes: {BookDetails.gen_notes}</li>
                                        <li>ISBN: {BookDetails.isbn}</li>
                                    </ul>
                                    <h3>Abstract & Contents Notes</h3>
                                    <ul>
                                        <li>Abstract: {BookDetails.abstract}</li>
                                        <li>Content Notes: {BookDetails.content_notes}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>

    )

}

export default BookDetails