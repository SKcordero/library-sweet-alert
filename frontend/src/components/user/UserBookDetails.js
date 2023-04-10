import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import DeactivatedDashboard from '../layout//DeactivatedDashboard'
import DeactivatedUser from '../layout//DeactivatedUser'
import UnsetDashboard from '../layout/UnsetDashboard';
import PendingDashboard from '../layout/PendingDashboard';
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarEmpty from '../layout/SideNavbarEmpty'
import SideNavbarUnset from '../layout/SideNavbarUnset'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { getStudentBookDetails, clearErrors } from '../../actions/studentActions'
import { borrowBooks, checkBorrowBooks, cancelBorrowBooks } from '../../actions/borrowActions'
import { BORROW_BOOK_RESET, CANCELBORROW_BOOK_RESET } from '../../constants/borrowConstants'

const StudentBookDetails = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let { id } = useParams();
    let navigate = useNavigate();

    const { loading, error, studentbook } = useSelector(state => state.studentBookDetails);
    const { user } = useSelector(state => state.auth);
    const { success } = useSelector(state => state.borrowBook);
    const { checkbook } = useSelector(state => state.checkBorrowBook);
    const { isCancel } = useSelector(state => state.cancelBorrowBook);

    useEffect(() => {
        dispatch(checkBorrowBooks(user._id, id));
        dispatch(getStudentBookDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            setShow(false);
            // alert.success('Added to Pending borrowed book');
            Swal.fire({
                title: 'Book Requested',
                text: 'This book has been requested, Kindly check the Book Requests Tab.',
                icon: 'success',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            dispatch({ type: BORROW_BOOK_RESET })
        }

        if (isCancel) {
            // setShow(false);
            // alert.success('Book borrowed canceled');
            Swal.fire({
                title: 'Book Removed',
                text: 'This book has been removed from your Book Requests Tab.',
                icon: 'success',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            dispatch({ type: CANCELBORROW_BOOK_RESET })
        }

    }, [dispatch, alert, error, navigate, success, isCancel])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBorrow = (e) => {
        Swal.fire({
            title: 'Request Book',
            text: 'Are you sure you want to request this book?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              e.preventDefault();
                const formData = new FormData();
                formData.set('userId', user._id);
                formData.set('bookId', studentbook._id);

                dispatch(borrowBooks(formData));
            }
          });
    };

    const cancelBookHandler = () => {
        // console.log('test')
        // dispatch(cancelBorrowBooks(user._id, id))

        Swal.fire({
            title: 'Remove Book from Requests',
            text: 'Are you sure you want to remove this book?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cancelBorrowBooks(user._id, id))
            }
          });
    }

    return (
        <Fragment>
            <MetaData title={'Book Details'} />
            {
                (user.status === 'deactivated') ?
                    (
                        <Fragment>
                            <SideNavbarEmpty />
                            <DeactivatedDashboard />
                        </Fragment>
                    ) : (
                        user.role === 'unset' ? (
                            <div>
                                <SideNavbarUnset />
                                <UnsetDashboard />
                            </div>
                        ) : (
                            user.role === 'request' ? (
                                <div>
                                    <SideNavbarEmpty />
                                    <PendingDashboard />
                                </div>
                            ) : (
                                user.course === undefined | null ? (
                                    <Fragment>
                                        <SideNavbarUnset />
                                        <DeactivatedUser />
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <SideNavbarUser />
                                        {loading || loading === undefined ? <Loader /> : (
                                            <Fragment>
                                                {(user.course === undefined | null) ?
                                                    (
                                                        <DeactivatedUser />
                                                    ) : (
                                                        <div className="dashboard-container">
                                                            <div className="card-container">
                                                                <Link to='/books' className='btn button-back'><i class="fa-solid fa-arrow-left"></i>Back</Link>
                                                                <div className="userbookdetails">
                                                                    {((studentbook.book_image == null || undefined) || (studentbook.book_image.url == null || undefined)) ?
                                                                        <img alt="" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png" />
                                                                        :
                                                                        <img alt="" src={studentbook.book_image.url} />
                                                                    }
                                                                    <h2><strong>{studentbook.call_number}</strong></h2>
                                                                    <h3>
                                                                        {studentbook.title}{" / "}{studentbook.main_author}{" "}{studentbook.publisher}{" "}{studentbook.yearPub}
                                                                    </h3>
                                                                    <div className='mt-2'>
                                                                        {
                                                                            checkbook.approve === true ?
                                                                                (
                                                                                    checkbook.check === true ?
                                                                                        (// check if book is in the user's borrow
                                                                                            <Link to={`/borrow/books`} id="cancel_btn" className="btn btn-warning py-1 px-2 ml-2">Check Due Date
                                                                                            </Link>
                                                                                        ) : (
                                                                                            <button disabled='true' id="unavailable_btn" className="btn btn-primary py-1 px-2 ml-2">Unavailable
                                                                                            </button>
                                                                                        )
                                                                                ) : (
                                                                                    checkbook.check === true ?
                                                                                        (
                                                                                            <button id="cancel_btn" className="btn btn-danger py-1 px-2 ml-2" onClick={() => cancelBookHandler()}>Cancel
                                                                                            </button>
                                                                                        ) : (
                                                                                            checkbook.pendinglimit === true ?
                                                                                                (//status pending
                                                                                                    <button disabled='true' id="unavailable_btn" className="btn btn-primary py-1 px-2 ml-2">Unavailable
                                                                                                    </button>
                                                                                                ) : (
                                                                                                    studentbook.on_shelf <= 0 || studentbook.on_shelf == null ?
                                                                                                        (//no available copies
                                                                                                            <button disabled='true' id="unavailable_btn" className="btn btn-primary py-1 px-2 ml-2">Unavailable
                                                                                                            </button>
                                                                                                        ) : (
                                                                                                            <button id="request_btn" className="btn btn-primary py-1 px-2 ml-2" onClick={handleBorrow}>Borrow Schedule
                                                                                                            </button>
                                                                                                        )
                                                                                                )
                                                                                        )
                                                                                )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <Modal className="Modal-Confirm" show={show} onHide={handleClose}>
                                                                <Modal.Header>
                                                                    <Modal.Title><h2>Borrow Confirmation</h2></Modal.Title>

                                                                    <Button onClick={handleClose}><i className="fa fa-times-circle"></i></Button>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <h1>Do you want to Borrow this Book?</h1>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="warning" onClick={handleClose}>NO
                                                                    </Button>
                                                                    <Button variant="primary" onClick={handleBorrow}>YES
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal> */}
                                                        </div>
                                                    )
                                                }


                                            </Fragment>
                                        )}
                                    </Fragment>
                                )
                            )
                        )
                    )
            }
        </Fragment >
    )
}
export default StudentBookDetails