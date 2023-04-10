import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import DeactivatedDashboard from '../layout//DeactivatedDashboard'
import DeactivatedUser from '../layout//DeactivatedUser'
import UnsetDashboard from '../layout/UnsetDashboard';
import PendingDashboard from '../layout/PendingDashboard';
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarEmpty from '../layout/SideNavbarEmpty'
import SideNavbarUnset from '../layout/SideNavbarUnset'

import { allStudentReturnedBook, clearErrors } from '../../actions/studentActions'

const BookSearch = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, studentreturnedbook } = useSelector(state => state.getStudentReturnedBook);

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allStudentReturnedBook());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, navigate])

    const handleCheckedChanged = (sub) => {
        const isChecked = subjects.includes(sub);

        if (!isChecked) {
            setSubjects([...subjects, sub]);
        } else {
            const updatedSubjects = [...subjects].filter(s => s !== sub);
            setSubjects(updatedSubjects);
        }
    }

    // const col = [
    //     {
    //         title: 'Call Number',
    //         field: 'call_number',
    //         searchable: false,
    //         render: rowData => (
    //             (rowData.Fil === true) ? <div><p>{"FIL " + rowData.call_number}</p></div> :
    //                 (rowData.Ref === true) ? <div><p>{"REF " + rowData.call_number}</p></div> :
    //                     (rowData.Bio === true) ? <div><p>{"BIO " + rowData.call_number}</p></div> :
    //                         (rowData.Res === true) ? <div><p>{"RES " + rowData.call_number}</p></div> :
    //                             <div><p>{"N/A " + rowData.call_number}</p></div>
    //         ),
    //         cellStyle: {
    //             textAlign: "left",
    //         },
    //     },
    //     {
    //         title: 'Book Title',
    //         field: 'title',
    //         render: rowData => (
    //             <Fragment>
    //                 <div>
    //                     {
    //                         <Link to={`/book/${rowData._id}`}>{rowData.title} </Link>
    //                     }

    //                 </div>
    //             </Fragment>
    //         ),
    //         cellStyle: {
    //             textAlign: "left",
    //             width: "500px"
    //         },
    //     },
    //     {
    //         title: 'Author',
    //         field: 'main_author',
    //         render: rowData => (
    //             <Fragment>
    //                 <div><p>{rowData.main_author}</p></div>
    //             </Fragment>
    //         ),
    //         cellStyle: {
    //             textAlign: "left",
    //         },

    //     },
    //     {
    //         title: 'Year Pub',
    //         field: 'yearPub',
    //         emptyValue: () => <em>null</em>,
    //         cellStyle: {
    //             textAlign: "left",
    //         },
    //     },
    //     {
    //         title: 'Subject(s)',
    //         field: 'subjects',
    //         // emptyValue:()=><em>null</em>,
    //         render: rowData => (
    //             (rowData.subjects === null || rowData.subjects === undefined) ? <em>null</em> :
    //                 <Fragment>
    //                     <div>{rowData.subjects.map((item) => (<p>{item}</p>))}</div>
    //                 </Fragment>
    //         ),
    //         cellStyle: {
    //             textAlign: "left",

    //         },
    //     },
    // ]

    return (
        <Fragment>
            <MetaData title={'My Borrowed Books'} />
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
                                            <div className="dashboard-container">
                                                
                                            </div>
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

export default BookSearch
