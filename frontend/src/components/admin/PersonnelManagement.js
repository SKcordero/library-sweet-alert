import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import Swal from 'sweetalert2';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import {
    allPersonnels,
    deletePersonnel,
    clearErrors
} from '../../actions/personnelActions'
import { DELETE_PERSONNEL_RESET, UPDATE_PERSONNEL_RESET } from '../../constants/personnelConstants'


const PersonnelManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, personnels } = useSelector(state => state.allPersonnels);
    const { PersonnelDeleted, isUpdated } = useSelector(state => state.personnel);

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allPersonnels());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (PersonnelDeleted) {
            // alert.success('Personnel deleted successfully');
            Swal.fire({
                title: 'Personnel Deleted',
                text: 'Personnel deleted successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/admin/personnels');
            dispatch({ type: DELETE_PERSONNEL_RESET })
        }

        if (isUpdated) {
            // alert.success('Personnel updated successfully');
            Swal.fire({
                title: 'Personnel Updated',
                text: 'Personnel updated successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/admin/personnels');
            dispatch({ type: UPDATE_PERSONNEL_RESET })
        }

    }, [dispatch, alert, error, PersonnelDeleted, isUpdated, navigate])

    const deletePersonnelHandler = (id) => {
        Swal.fire({
          title: 'Delete User',
          text: 'Are you sure you want to delete this personnel?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deletePersonnel(id))
          }
        });
      };
    
    const colPersonnels = [
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
            width: 180,
            cellStyle: {
                textAlign: "left",
            },
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Tooltip title="Edit">
                            <Link to={`/admin/personnel/${rowData._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePersonnelHandler(rowData._id)}>
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
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> : (
                <div className="dashboard-container">
                    <div className="table-container">
                        <div className="top-table-elements-end">
                            <span className='add-button'>
                                <Link to={"/personnel/new"}>
                                    <i class="fa-solid fa-circle-plus"></i>
                                    Add Personnel
                                </Link>
                            </span>
                            <div className="student-management-button">
                                <Link to='/admin/faculty'>
                                    Faculty Management
                                    <i class="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>

                            <div className="student-management-button">
                                <Link to='/active/student'>
                                    Student Management
                                    <i class="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                        {loading ? <Loader /> : (
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <MaterialTable
                                    title='Personnels List'
                                    data={personnels}
                                    columns={colPersonnels}
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
            )
            }
        </Fragment >
    )
}
export default PersonnelManagement