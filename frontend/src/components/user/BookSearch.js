import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
// import Tooltip from '@mui/material/Tooltip';
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

import { allStudentBooks, clearErrors } from '../../actions/studentActions'

const BookSearch = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, studentbooks } = useSelector(state => state.allStudentBooks);
    const { user } = useSelector(state => state.auth)

    const subjectArr = studentbooks.bookSubjects

    const [subjects, setSubjects] = useState([]);

    const [yearPubStart, setyearPubStart] = useState(studentbooks.lowestYearPub);
    const [yearPubEnd, setyearPubEnd] = useState(studentbooks.highestYearPub);

    const [new_yearValue, setnew_yearValue] = useState([yearPubStart, yearPubEnd]);

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allStudentBooks());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, new_yearValue, navigate])

    const handleCheckedChanged = (sub) => {
        const isChecked = subjects.includes(sub);

        if (!isChecked) {
            setSubjects([...subjects, sub]);
        } else {
            const updatedSubjects = [...subjects].filter(s => s !== sub);
            setSubjects(updatedSubjects);
        }
    }

    const filterSubjects = () => {
        const formData = new FormData();
        if (yearPubStart != undefined) {
            formData.set('minYear', yearPubStart)
        } else {
            formData.set('minYear', studentbooks.lowestYearPub)
        }

        if (yearPubEnd != undefined) {
            formData.set('maxYear', yearPubEnd)
        } else {
            formData.set('maxYear', studentbooks.highestYearPub)
        }
        subjects.forEach(subject =>
            formData.append('subjects', subject)
        )
        dispatch(allStudentBooks(formData))
    }

    const filterYearPub = (e) => {
        console.log(subjects, yearPubStart, yearPubEnd)
        const formData = new FormData();
        formData.set('minYear', yearPubStart)
        formData.set('maxYear', yearPubEnd)
        subjects.forEach(subject =>
            formData.append('subjects', subject)
        )
        dispatch(allStudentBooks(formData))
        // dispatch(allBooks(new_yearValue));
    };

    const clearYearPub = (e) => {
        setyearPubStart(studentbooks.lowestYearPub)
        setyearPubEnd(studentbooks.highestYearPub)
        setSubjects([])
        setnew_yearValue([yearPubStart, yearPubEnd])
    };

    const col = [
        {
            title: 'Call Number',
            field: 'call_number',
            searchable: false,
            render: rowData => (
                (rowData.Fil === true) ? <div><p>{"FIL " + rowData.call_number}</p></div> :
                    (rowData.Ref === true) ? <div><p>{"REF " + rowData.call_number}</p></div> :
                        (rowData.Bio === true) ? <div><p>{"BIO " + rowData.call_number}</p></div> :
                            (rowData.Res === true) ? <div><p>{"RES " + rowData.call_number}</p></div> :
                                <div><p>{"N/A " + rowData.call_number}</p></div>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Book Title',
            field: 'title',
            render: rowData => (
                <Fragment>
                    <div>
                        {
                            <Link to={`/book/${rowData._id}`}>{rowData.title} </Link>
                        }

                    </div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
                width: "500px"
            },
        },
        {
            title: 'Author',
            field: 'main_author',
            render: rowData => (
                <Fragment>
                    <div><p>{rowData.main_author}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },

        },
        {
            title: 'Year Pub',
            field: 'yearPub',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Subject(s)',
            field: 'subjects',
            // emptyValue:()=><em>null</em>,
            render: rowData => (
                (rowData.subjects === null || rowData.subjects === undefined) ? <em>null</em> :
                    <Fragment>
                        <div>{rowData.subjects.map((item) => (<p>{item}</p>))}</div>
                    </Fragment>
            ),
            cellStyle: {
                textAlign: "left",

            },
        },
    ]

    return (
        <Fragment>
            <MetaData title={'Books'} />
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
                                                <div className="table-container">
                                                    <div className='row'>
                                                        <div className='col-md-3'>
                                                            <h4 className='text-center mb-3'>Year Published</h4>
                                                            <div className='row' style={{ marginBottom: 10 }}>
                                                                <TextField id="yearStart" label="Start Year" defaultValue={studentbooks.lowestYearPub} value={yearPubStart} onChange={(e) => setyearPubStart(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginRight: '10px', width: '80px' }} />
                                                                <span style={{ paddingTop: '1em' }}>&#8212;</span>
                                                                <TextField id="yearEnd" label="End Year" defaultValue={studentbooks.highestYearPub} value={yearPubEnd} onChange={(e) => setyearPubEnd(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginLeft: '10px', width: '80px' }} />
                                                            </div>

                                                            <div className='row' style={{ marginBottom: 10 }}>
                                                                <button type="button" className="btn btn-primary " onClick={filterYearPub} style={{ display: 'block', margin: '0 auto', marginRight: '5px' }}>Filter  <i class="fa-solid fa-filter"></i></button>

                                                                <button type="button" className="btn btn-danger " onClick={clearYearPub} style={{ display: 'block', margin: '0 auto', marginLeft: '5px' }}>Clear  <i class="fa-solid fa-filter-circle-xmark"></i></button>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-9'>
                                                            <div className='row'>
                                                                <div className='col mb-4'>
                                                                    <h4 className='text-center'>Filter by Subject</h4>
                                                                </div>
                                                                <div className='col'>
                                                                    <div className='row'>
                                                                        <button type="button" className="btn btn-primary" onClick={filterSubjects}>Filter  <i class="fa-solid fa-filter"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                {studentbooks.bookSubjects && studentbooks.bookSubjects.length > 0 ? (

                                                                    subjectArr.map((subject, index) => (
                                                                        <div className="col-sm-3" key={index}>
                                                                            <input type="checkbox" id="checkbox" name="checkbox" value={subject} checked={subjects.includes(subject)} onChange={() => handleCheckedChanged(subject)} /> {subject}
                                                                        </div>
                                                                    ))

                                                                ) : (
                                                                    <li>Subjects not Found</li>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>



                                                    {loading || loading === undefined ? <Loader /> : (
                                                        <ThemeProvider theme={defaultMaterialTheme}>
                                                            <MaterialTable
                                                                title='Books List'
                                                                data={studentbooks.studentbook}
                                                                columns={col}
                                                                localization={
                                                                    {
                                                                        toolbar: {
                                                                            searchPlaceholder: 'Book,Year,Author,Subject...'
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
