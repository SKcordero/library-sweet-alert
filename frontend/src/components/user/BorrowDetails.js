import React, { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
// import DatePicker from 'react-calendar';
import dateFormat from 'dateformat';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import ReactDOM  from 'react-dom';
import DeactivatedDashboard from '../layout//DeactivatedDashboard'
import DeactivatedUser from '../layout//DeactivatedUser'
import UnsetDashboard from '../layout/UnsetDashboard';
import PendingDashboard from '../layout/PendingDashboard';
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarEmpty from '../layout/SideNavbarEmpty'
import SideNavbarUnset from '../layout/SideNavbarUnset'



import { allStudentBorrowBook, clearErrors } from '../../actions/studentActions'
import { confirmBorrowBooks, cancelAllBorrowBooks } from '../../actions/borrowActions'
import { CONFIRM_BOOK_RESET } from '../../constants/borrowConstants'
import { CANCEL_ALL_BORROW_BOOK_RESET } from '../../constants/borrowConstants'


const BorrowDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    // let navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { loading, error, studentborrowbooks } = useSelector(state => state.allStudentBorrowBook);
    const { isConfirm } = useSelector(state => state.confirmBorrowBook);
    const { isCancelAll } = useSelector(state => state.cancelAllBorrowBook);

    useEffect(() => {
        dispatch(allStudentBorrowBook());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isConfirm) {
            setShow1(false);
            // alert.success('Book borrowed confirm');
            Swal.fire({
                title: 'Appointment Confirmed!',
                text: 'Kindly wait for you appointment to be approved before proceeding to the library, Thank you!',
                icon: 'success',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            dispatch({ type: CONFIRM_BOOK_RESET })
        }
        if (isCancelAll) {
            // setShow2(false);
            // alert.success('All Book borrowed canceled');
            Swal.fire({
                title: 'Appointment Canceled!',
                text: 'You have successfully canceled your appointment!',
                icon: 'success',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            dispatch({ type: CANCEL_ALL_BORROW_BOOK_RESET })
        }
    }, [dispatch, alert, error, isConfirm, isCancelAll])

    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    // const dueDate = new Date();
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    


    const handleConfirm = (e) => {
        let datepicker;
      
        Swal.fire({
          title: "Select Appointment Schedule",
          input: 'text',
          showCancelButton: true,
          confirmButtonText: "Continue",
          cancelButtonText: "Cancel",
          focusConfirm: false,
          preConfirm: () => {
            const selectedDate = datepicker.getDate();
            const selectedDay = selectedDate.getDay();
            const formData = new FormData();
      
            if (selectedDay === 6 || selectedDay === 0) {
              setShow1(false);
              Swal.fire({
                title: 'Invalid appointment date',
                text: 'Weekend is not a valid appointment date',
                icon: 'error',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            } else {
              const dueDate = new Date(selectedDate);
      
              if (selectedDay === 5) {
                dueDate.setTime(selectedDate.getTime() + (3 * 24 * 3600000));
              } else {
                dueDate.setTime(selectedDate.getTime() + (24 * 3600000));
              }
      
              formData.set('userId', user._id);
              formData.set('appointmentDate', selectedDate.toISOString());
              formData.set('dueDate', dueDate);
      
              Swal.fire({
                title: "Confirm Appointment",
                html: `Appointment Date: <b>${dateFormat(selectedDate, 'mmmm dd, yyyy')}</b> <br/>
                       Due Date will be on: <b>${dateFormat(dueDate, 'mmmm dd, yyyy')}</b> <br/> <br/>
                Do you want to continue?`,
                showCancelButton: true,
                confirmButtonText: "Continue",
                cancelButtonText: "Cancel",
                focusConfirm: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  console.group(selectedDate, dueDate);
                  dispatch(confirmBorrowBooks(formData));
                }
              });
            }
          },
          didOpen: () => {
            const input = Swal.getInput();
            const pickerOptions = {
              field: input,
              minDate: new Date(),
              disableWeekends: true,
              onSelect: () => {
                datepicker.hide();
              },
            };
            datepicker = new Pikaday(pickerOptions);
            datepicker.setDate(new Date());
            setTimeout(() => datepicker.show(), 400);
          },
          didClose: () => {
            datepicker.destroy();
          },
          inputValidator: (value) => {
            if (!value) {
              return 'You need to select a date';
            }
          }
        });
      };

    const handleCancel = () => {
        // console.log('cancel')

        Swal.fire({
            title: 'Cancel Request',
            text: 'Are you sure you want to cancel this request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Cancel',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.set('userId', user._id);
                dispatch(cancelAllBorrowBooks(formData));
            }
          });
    }
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return (
        <Fragment>
            <MetaData title={'Book Request'} />
            {(user.status === 'deactivated') ?
                (
                    <Fragment>
                        <SideNavbarEmpty />
                        <DeactivatedDashboard />
                    </Fragment>
                ) : (user.role === 'unset' ? (
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
                                        {studentborrowbooks ? (
                                            <Fragment>
                                                <div className="dashboard-container">
                                                    <div className='card-container'>
                                                        <h2 className='text-center mt-3'>Book Requests</h2>
                                                        <div className='book-requests-container'>
                                                            <div className="book-card">
                                                                {studentborrowbooks.bookId && studentborrowbooks.bookId.map(data => (
                                                                    <div key={studentborrowbooks.bookId}>
                                                                        <div className='card-header'>
                                                                            {(data.book_image.url == null || undefined) ?
                                                                                <img alt="" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png" />
                                                                                :
                                                                                <img alt="" src={data.book_image.url} />
                                                                            }
                                                                        </div>
                                                                        <h3>{data.title}</h3>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className='borrowdetails-buttons-container'>
                                                                <div className='borrowdetails-buttons d-flex flex-column text-center'>
                                                                    <span>Schedule: {(studentborrowbooks.appointmentDate == null || undefined) ? 'not set' : dateFormat(studentborrowbooks.appointmentDate, "mmmm dd, yyyy")}</span>
                                                                    <span>Duedate: {(studentborrowbooks.dueDate == null || undefined) ? 'not set' : dateFormat(studentborrowbooks.dueDate, "mmmm dd, yyyy")}</span>
                                                                    <span>Status: {studentborrowbooks.status}</span>
                                                                </div>
                                                                {studentborrowbooks.status === "To Confirm" ? (
                                                                    <div className='book-request-buttons d-flex justify-content-center'>
                                                                        <button id="confirm_btn" className="btn btn-primary py-1 px-2 ml-2" onClick={handleConfirm}>Borrow Schedule
                                                                        </button>
                                                                        <button id="confirm_btn" className="btn btn-danger py-1 px-2 ml-2" onClick={handleCancel}>Cancel Schedule
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <button id="confirm_btn" className="btn btn-danger py-1 px-2 ml-2" onClick={handleCancel}>Cancel Schedule
                                                                    </button>
                                                                )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Modal className="Modal-Confirm" show={show1} onHide={handleClose1}>
                                                    <Modal.Header>
                                                        <Modal.Title><h2>SET APPOINTMENT DATE</h2></Modal.Title>

                                                        <Button onClick={handleClose1}><i className="fa fa-times-circle"></i></Button>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        {/* <DatePicker minDate={new Date()} filterDate={isWeekday} value={startDate} onChange={(date) => setStartDate(date)} /> */}
                                                        <DatePicker minDate={new Date()} filterDate={isWeekday} value={dateFormat(startDate, "dd-mm-yyyy")} onChange={(date) => setStartDate(date)} />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="warning" onClick={handleClose1}>CANCEL
                                                        </Button>
                                                        <Button variant="primary" onClick={handleConfirm}>CONFIRM
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                                <Modal className="Modal-Cancel" show={show2} onHide={handleClose2}>
                                                    <Modal.Header>
                                                        <Modal.Title><h2>Confirm Cancelation</h2></Modal.Title>
                                                        <Button onClick={handleClose2}><i className="fa fa-times-circle"></i></Button>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="warning" onClick={handleClose2}>CANCEL
                                                        </Button>
                                                        <Button variant="primary" onClick={handleCancel}>CONFIRM
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <div className='dashboard-container'>
                                                    <div className="table-container">
                                                        <h1>Borrowed Books</h1>
                                                        <hr />
                                                        <h1>No Borrowed Books</h1>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )}
                                    </Fragment>
                                )}

                            </Fragment>
                        )
                    )
                )
                )}
        </Fragment >
    )
}
export default BorrowDetails