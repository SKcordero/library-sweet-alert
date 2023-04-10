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

import { allFaculties, deleteFaculty, clearErrors } from '../../actions/userActions'
import { DELETE_FACULTY_RESET } from '../../constants/userConstants'

const FacultyManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error} = useSelector(state => state.allPersonnels);
    const { faculties } = useSelector(state => state.allFaculties);
    const { isDeleted } = useSelector(state => state.deleteFaculties)

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allFaculties());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            // alert.success('Faculty deleted successfully');
            Swal.fire({
                title: 'Faculty Member Deleted',
                text: 'Faculty member deleted successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/admin/faculty');
            dispatch({ type: DELETE_FACULTY_RESET })
        }


    }, [dispatch, alert, error, isDeleted, navigate])

    // const deleteFacultyHandler = (id) => {
    //     dispatch(deleteFaculty(id))
    // }

    const deleteFacultyHandler = (id) => {
        // dispatch(deleteFaculty(id))
        Swal.fire({
            title: 'Delete Faculty Member',
            text: 'Are you sure you want to delete this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteFaculty(id))
            }
          });
    }

    const colFaculties = [
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
                        <Tooltip title="Delete">
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteFacultyHandler(rowData._id)}>
                                <i className="fa fa-trash"></i>
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
                        <div className="pesonnel-management-button">
                            <Link to='/admin/faculty/pending'>
                                Pending Faculty Management 
                                <i class="fa-solid fa-arrow-right" />
                            </Link>
                        </div>
                    </div>
                    {loading ? <Loader /> : (

                        <ThemeProvider theme={defaultMaterialTheme}>
                            <MaterialTable
                                title='Faculty List'
                                data={faculties}
                                columns={colFaculties}
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
export default FacultyManagement