import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table'
import Swal from 'sweetalert2';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { Button } from "react-bootstrap";

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import {  getAllActiveStudents, getAllInactiveStudents, checkPassword, deleteStudent, clearErrors } from '../../actions/personnelActions'
import { activateUsers, deactivatedUsers, endterm } from '../../actions/userActions'
import { DELETE_STUDENT_RESET, CHECK_PASSWORD_RESET } from '../../constants/personnelConstants'
import { ACTIVATE_USER_RESET, DEACTIVATED_USER_RESET, END_TERM_USER_RESET } from '../../constants/userConstants'

const RegisteredUsers = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error } = useSelector(state => state.allPersonnels);
    const { active_students } = useSelector(state => state.allActiveStudents);
    const { isChecked, check_error} = useSelector(state => state.checkUserPassword);
    const { StudentDeleted } = useSelector(state => state.student);
    const { isActivated } = useSelector(state => state.activateUser);
    const { isDeactivated } = useSelector(state => state.deactivateUser);
    const { isEndterm } = useSelector(state => state.endtermuser)

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(getAllActiveStudents());
        dispatch(getAllInactiveStudents());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isChecked) {
            // alert.success('Student deleted successfully');
            navigate('/active/student');
            dispatch({ type: CHECK_PASSWORD_RESET })
            dispatch(endterm())
        }

        if (StudentDeleted) {
            // alert.success('Student deleted successfully');
            Swal.fire({
                title: 'Student Deleted',
                text: 'Student deleted successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/active/student');
            dispatch({ type: DELETE_STUDENT_RESET })
        }

        if (isActivated) {
            Swal.fire({
                title: 'Account Activated',
                text: 'Student account has been activated!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              navigate('/active/student');
              dispatch({ type: ACTIVATE_USER_RESET });
          }

        if (isDeactivated) {
            // alert.error('Student account has been deactivated');
            Swal.fire({
                title: 'Account Deactivated',
                text: 'Student account has been deactivated!',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/active/student');
            dispatch({ type: DEACTIVATED_USER_RESET })
        }

        if (isEndterm) {
            // alert.error('All student account has been deactivated');
            Swal.fire({
                title: 'Term Ended',
                text: 'All student accounts has been deactivated!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/active/student');
            dispatch({ type: END_TERM_USER_RESET })
        }

        if (check_error) {
            // alert.error('All student account has been deactivated');
            Swal.fire({
                title: 'Incorrect password',
                text: 'Ending of term failed!',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/active/student');
            dispatch({ type: CHECK_PASSWORD_RESET })
        }

        

    }, [dispatch, alert, error, isChecked, StudentDeleted, isActivated, isDeactivated, isEndterm, check_error, navigate])

    const deleteStudentHandler = (id) => {
        // dispatch(deleteStudent(id))
        Swal.fire({
            title: 'Delete User',
            text: 'Are you sure you want to delete this student?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteStudent(id))
            }
          });
    }

    const acvateUserHandler = (id) => {
        // dispatch(activateUsers(id))
        Swal.fire({
            title: 'Activate User',
            text: 'Are you sure you want to activate this account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Activate',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(activateUsers(id))
            }
          });
    }

    const deacvateUserHandler = (id) => {
        // dispatch(deactivatedUsers(id))
        Swal.fire({
            title: 'Deactivate User',
            text: 'Are you sure you want to deactivate this account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Deactivate',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deactivatedUsers(id))
            }
          });
    }

    const endtermhandler = () => {
        Swal.fire({
          title: 'End The Term?',
          text: 'Enter your password to confirm',
          icon: 'warning',
          input: 'password',
          inputPlaceholder: 'Enter password',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
          },
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const enteredPassword = result.value;
            //   console.log(enteredPassword)
              const formData = new FormData();
              formData.set('password', enteredPassword)
              dispatch(checkPassword(formData));
            } catch (error) {
              console.log(error);
            }
          }
        });
      };

    const colStudents = [
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
            title: 'Course',
            field: 'course',
        },
        {
            title: 'Section',
            field: 'section',
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
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteStudentHandler(rowData._id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Tooltip>
                        {rowData.status == 'active' ?
                            <Tooltip title="Deactivate">
                                <button className="btn btn-success py-1 px-2 ml-2" onClick={() => deacvateUserHandler(rowData._id)}>
                                    <i className="fa fa-unlock"></i>
                                </button>
                            </Tooltip>

                            :
                            <Tooltip title="Activate">
                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => acvateUserHandler(rowData._id)}>
                                    <i className="fa fa-lock"></i>
                                </button>
                            </Tooltip>
                        }
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
                        <div>
                            <Button data-toggle="modal" className='ml-5 btn-danger' onClick={() => endtermhandler()}>
                                End Term
                            </Button>
                        </div>
                    </div>
                    {loading ? <Loader /> : (

                        <ThemeProvider theme={defaultMaterialTheme}>
                            <MaterialTable
                                title='Students List'
                                data={active_students.active_students}
                                columns={colStudents}
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
export default RegisteredUsers