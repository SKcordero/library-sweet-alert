import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import dateFormat from 'dateformat';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { DECLINE_BORROW_RESET, ACCEPT_BORROW_RESET } from '../../constants/personnelConstants'

import { allBorrow, acceptBorrow, declineBorrow, clearErrors } from '../../actions/personnelActions'

const Appointments = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { isDeclined } = useSelector(state => state.declineBorrower)
    const { isAccepted } = useSelector(state => state.acceptBorrower)

    const { loading, error, borrowers } = useSelector(state => state.allBorrow);

    const declinedHandler = (id) => {
        // dispatch(declineBorrow(id))
        Swal.fire({
            title: 'Decline Appointment',
            text: 'Are you sure you want to decline this appointment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Decline',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(declineBorrow(id))
            }
          });
    }

    const acceptedHandler = (id) => {
        // dispatch(acceptBorrow(id))
        Swal.fire({
            title: 'Accept Appointment',
            text: 'Are you sure you want to accept this appointment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(acceptBorrow(id))
            }
          });
    }

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allBorrow());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isDeclined) {
            // alert.success('Appointment Declined');
            Swal.fire({
                title: 'Appointment Declined',
                text: 'Appointment has been declined!',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/appointments');
            dispatch({ type: DECLINE_BORROW_RESET })
        }
        if (isAccepted) {
            // alert.success('Appointment Accepted');
            Swal.fire({
                title: 'Appointment Accepted',
                text: 'Appointment has been accepted, Check Borrowed Books Tab!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/appointments');
            dispatch({ type: ACCEPT_BORROW_RESET })
        }

    }, [dispatch, alert, error, navigate, isDeclined, isAccepted])

    const col = [
        {
            title: 'Name',
            field: 'userId.name',
            render: rowData => (
                <Fragment>
                    <div><p><Link to={`/detail/student/${rowData.userId._id}`}>{rowData.userId.name} </Link></p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left"
            },
        },
        {
            title: 'Book',
            field: 'bookId.title',
            // width: '10%',
            render: rowData => (
                rowData.bookId.map((item, index) => (
                    <Fragment>
                        <div><p><Link to={`/admin/single/book/${item._id}`}>{item.title} </Link></p></div>
                    </Fragment>
                ))
            ),
            cellStyle: {
                textAlign: "left"
            },
        },
        {
            title: 'Appointment',
            field: 'borrower_appointment',
            // width: '20%',
            render: rowData => (
                <Fragment>
                    <div><p>{dateFormat(rowData.appointmentDate, "mmmm dd, yyyy")}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            title: 'Due Date',
            field: 'borrower_dueDate',
            // width: '20%',
            render: rowData => (
                <Fragment>
                    <div><p>{dateFormat(rowData.dueDate, "mmmm dd, yyyy")}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            title: 'Status',
            field: 'status',
            width: '10%',
            cellStyle: {
                textAlign: "left",
            }
        },
        {
            title: 'Actions',
            field: '_id',
            // width: 180,
            render: rowData => (
                <Fragment>
                    {/* <div className="icon-buttons"> */}
                    <Tooltip title="Accept">
                        <button className="btn btn-success py-1 px-2 ml-2 fa-regular fa-circle-check fa-2x" onClick={() => acceptedHandler(rowData._id)}>
                        </button>
                    </Tooltip>

                    <Tooltip title="Decline">
                        <button className="btn btn-danger py-1 px-2 ml-2 fa-regular fa-circle-xmark fa-2x" onClick={() => declinedHandler(rowData._id)}>
                        </button>
                    </Tooltip>
                    {/* </div> */}
                </Fragment>
            ),
            searchable: false,
            cellStyle: {
                textAlign: "left",
            },
            headerStyle: {
                textAlign: 'center'
            }
        },

    ]

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> : (
                <div className="dashboard-container">
                    <div className="table-container">
                    <div className="col-12">
                        {loading ? <Loader /> : (
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <MaterialTable
                                    title='Book Requests'
                                    data={borrowers}
                                    columns={col}
                                    localization={
                                        {
                                            toolbar: {
                                                searchPlaceholder: 'Name...'
                                            }
                                        }
                                    }
                                    options={{
                                        pageSize: 10,
                                        headerStyle: {
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            backgroundColor: '#BA0202',
                                            color: '#ffffff',
                                        },
                                        rowStyle: {
                                            fontSize: 15,
                                            backgroundColor: '#F9F5F5',
                                        },
                                        emptyRowsWhenPaging: false
                                    }}
                                />
                            </ThemeProvider>
                        )}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default Appointments