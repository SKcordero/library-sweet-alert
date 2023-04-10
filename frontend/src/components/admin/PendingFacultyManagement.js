import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import Swal from 'sweetalert2';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { acceptFaculty, declineFaculty, clearErrors } from '../../actions/userActions'
import { pendingFaculties } from '../../actions/userActions'
import { ACCEPT_FACULTY_RESET, DECLINE_FACULTY_RESET } from '../../constants/userConstants'

const PendingFacultyManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error} = useSelector(state => state.allPersonnels);
    const { pending_faculties } = useSelector(state => state.pendingFaculties);
    const { isDeclined } = useSelector(state => state.declineFaculties);
    const { isAccepted } = useSelector(state => state.acceptFaculties);

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(pendingFaculties());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeclined) {
            // alert.success('Faculty deleted successfully');
            Swal.fire({
                title: 'Pending Faculty Declined',
                text: 'Pending faculty request has been declined!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/admin/faculty/pending');
            dispatch({ type: DECLINE_FACULTY_RESET })
        }

        if (isAccepted) {
            // alert.success('Faculty account has been accepted');
            Swal.fire({
                title: 'Pending Faculty Accepted',
                text: 'Pending faculty request has been accepted!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/admin/faculty');
            dispatch({ type: ACCEPT_FACULTY_RESET })
        }


    }, [dispatch, alert, error, isDeclined, isAccepted, navigate])

    const acceptFacultyHandler = (id) => {
        // dispatch(acceptFaculty(id))
        Swal.fire({
            title: 'Accept User Request',
            text: 'Are you sure you want to accept this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(acceptFaculty(id))
            }
          });
    }
    
    const declineFacultyHandler = (id) => {
        // dispatch(declineFaculty(id))
        Swal.fire({
            title: 'Decline User Request',
            text: 'Are you sure you want to decline this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Decline',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(declineFaculty(id))
            }
          });
    }

    const colPendingFaculties = [
        {
            title: 'ID',
            field: 'id_number',
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Name',
            field: 'name',
            render: rowData => (
                <Fragment>
                    <div><p><Link to={`/detail/student/${rowData._id}`}>{rowData.name} </Link></p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Contact',
            field: 'contact',
            searchable: false,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Actions',
            field: '_id',
            cellStyle: {
                textAlign: "left",
            },
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Tooltip title="Approve">
                            <button className="btn btn-success py-1 px-2 ml-2" onClick={() => acceptFacultyHandler(rowData._id)}>
                                <i className="fa fa-check"></i>
                            </button>
                        </Tooltip>
                        <Tooltip title="Decline">
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => declineFacultyHandler(rowData._id)}>
                                <i className="fa fa-times"></i>
                            </button>
                        </Tooltip>
                    </div>
                    
                </Fragment>
            ),
            searchable: false
        },

    ]

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            {/*<div className="row">*/}
            <SideNavbarAdmin />
            <div className="dashboard-container">
                <div className="table-container">
                    <div className="top-table-elements-end d-flex align-items-center">
                        <div className="pesonnel-management-button">
                            <Link to='/admin/personnels'>
                                <i class="fa-solid fa-arrow-left" />
                                Personnel Management
                            </Link>
                        </div>
                    </div>
                    {loading ? <Loader /> : (

                        <ThemeProvider theme={defaultMaterialTheme}>
                            <MaterialTable
                                title='Faculty Pending List'
                                data={pending_faculties}
                                columns={colPendingFaculties}
                                localization={
                                    {
                                        toolbar: {
                                            searchPlaceholder: 'ID, Name...'
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
                                    emptyRowsWhenPaging: false,
                                }}
                            />
                        </ThemeProvider>
                    )}
                </div>
            </div>
        </Fragment>
    )
}
export default PendingFacultyManagement