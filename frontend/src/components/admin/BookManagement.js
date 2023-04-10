import axios from 'axios';
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allBooks, importBook, changeBookAccession, deleteBook, clearErrors } from '../../actions/bookActions'
import { DELETE_BOOK_RESET, IMPORT_BOOK_RESET, ACCESSION_BOOK_RESET } from '../../constants/bookConstants'
// import book from '../../../../backend/models/book';

const BookManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, books } = useSelector(state => state.allBooks);
    const { isImported, Mrcbookdata } = useSelector(state => state.importBooks);
    const { bookAccession, accession_book_error } = useSelector(state => state.bookAccession)
    const { isDeleted } = useSelector(state => state.book)
    // const { userdetails  } = useSelector(state => state.checkUserDetails)

    // const subjectArr = books.bookSubjects
    const subjectArr = [
        'Automative',
        'Architecture',
        'Biology',
        'Chemistry',
        'Civil',
        'Computer',
        'Earth Science',
        'Economics',
        'Education',
        'Electrical',
        'Electronics',
        'Encyclopedia',
        'English',
        'Environmental Science',
        'Fiction',
        'Filipiniana',
        'GenRef/Hand-outs',
        'Instrumentation',
        'Language',
        'Literature',
        'Management',
        'Math',
        'Mechanical',
        'Philosophy/Psychology',
        'Physics',
        'Social Sciences',
        'Thesis'
    ];
    const [subjects, setSubjects] = useState([]);
    const [yearPubStart, setyearPubStart] = useState(books.lowestYearPub);
    const [yearPubEnd, setyearPubEnd] = useState(books.highestYearPub);
    const [new_yearValue, setnew_yearValue] = useState([yearPubStart, yearPubEnd]);
    const [file, setFile] = useState(null);

    const [tuptId, setTuptId] = useState('');
    const [accession_number, setAccession_number] = useState('');

    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');
    const [bookImage, setBookImage] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    // console.log( yearPubStart, yearPubEnd)

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allBooks())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            // alert.success('Book deleted successfully');
            Swal.fire({
                title: 'Book Deleted',
                text: 'Book deleted successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            navigate('/admin/books');
            dispatch({ type: DELETE_BOOK_RESET })
        }

        if (isImported) {
            // alert.success('Book imported successfully');
            Swal.fire({
                title: 'Book Imported',
                text: 'Book imported successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            navigate('/admin/books');
            dispatch({ type: IMPORT_BOOK_RESET })
        }
        if (bookAccession) {
            // alert.success('Book successfully lended');
            Swal.fire({
                title: 'Book Lent',
                text: 'Book has been successfully lent!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            navigate(`/admin/books`);
            dispatch({ type: ACCESSION_BOOK_RESET })
        }

        if (accession_book_error) {
            // alert.error(accession_book_error);
            Swal.fire({
                title: 'Book Lent Unsuccessful',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, navigate, new_yearValue, isDeleted, isImported, bookAccession, accession_book_error])



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
        console.log(subjects, yearPubStart, yearPubEnd)
        console.log(subjects, books.lowestYearPub, books.highestYearPub)

        const formData = new FormData();
        if (yearPubStart != undefined) {
            formData.set('minYear', yearPubStart)
        } else {
            formData.set('minYear', books.lowestYearPub)
        }

        if (yearPubEnd != undefined) {
            formData.set('maxYear', yearPubEnd)
        } else {
            formData.set('maxYear', books.highestYearPub)
        }
        subjects.forEach(subject =>
            formData.append('subjects', subject)
        )
        dispatch(allBooks(formData))
    }

    const filterYearPub = (e) => {
        console.log(subjects, yearPubStart, yearPubEnd)
        const formData = new FormData();
        formData.set('minYear', yearPubStart)
        formData.set('maxYear', yearPubEnd)
        subjects.forEach(subject =>
            formData.append('subjects', subject)
        )
        dispatch(allBooks(formData))
        // dispatch(allBooks(new_yearValue));
    };

    const clearYearPub = (e) => {
        setyearPubStart(books.lowestYearPub)
        setyearPubEnd(books.highestYearPub)
        setSubjects([])
        setnew_yearValue([yearPubStart, yearPubEnd])
    };

    const deleteBookHandler = (id) => {
        // dispatch(deleteBook(id))
        Swal.fire({
            title: 'Delete Book',
            text: 'Are you sure you want to delete this book?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBook(id))
            }
        });

    }

    const onFileChange = (e) => {
        setFile(e.target.files[0])
        // const file = e.target.files[0];
        // setFile(file)
        // this.setFile({ file });
    }

    const addRef = useRef(null);
    const importMRC = () => {

        const handleAddFile = (e) => {
            e.preventDefault();
            console.log(file)
            const formData = new FormData();
            formData.append('file', file)
            formData.set('test', "test")
            dispatch(importBook(formData));
        };

        const form = document.createElement('form');
        const inputField = document.createElement('div');
        const inputFieldComponent = (
            <input
                type='file'
                id='file'
                name='file'
                ref={addRef}
                onChange={onFileChange}
            />
        );
        ReactDOM.render(inputFieldComponent, inputField);

        form.innerHTML = `
          <form name="importMRC" encType="multipart/form-data">
            <div>
             
              <div id="inputField_container"></div>
            </div>
          </form>
        `;

        const inputFieldContainer = form.querySelector('#inputField_container');
        inputFieldContainer.appendChild(inputField);

        Swal.fire({
            title: 'Import .mrc file',
            html: form,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Import',
            cancelButtonText: 'Cancel',
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(file)
        const formData = new FormData();
        formData.append('file', file)
        formData.set('test', "test")
        dispatch(importBook(formData));
    }

    const giveAccessionHandler = () => {
        // e.preventDefault()
        const formData = new FormData();
        formData.set('accession', accession_number)
        formData.set('tuptId', tuptId.toLocaleUpperCase())
        formData.set('func', 'give');
        dispatch(changeBookAccession(formData))
    }

    // const checkUser = (userData) => {
    //     axios({
    //         method: "post",
    //         url: `/api/v1/admin/books`,
    //         data: userData,
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     })
    // }

    const lendBookHandler = () => {
        Swal.fire({
            title: 'User Info',
            input: 'text',
            text: 'Enter a TUP-T ID number',
            inputPlaceholder: 'TUPT-ID',
            showCancelButton: true,
            confirmButtonText: 'Next',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter a TUP-T ID number';
                }
            },
        }).then((tuptIdResult) => {
            if (tuptIdResult.isConfirmed) {
                Swal.fire({
                    title: 'Book Info',
                    input: 'text',
                    text: 'Enter an accession number',
                    inputPlaceholder: 'Accession Number',
                    showCancelButton: true,
                    confirmButtonText: 'Next',
                    cancelButtonText: 'Cancel',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Please enter an accession number';
                        }
                    },
                }).then((accessionResult) => {
                    if (accessionResult.isConfirmed) {
                        const userForm = new FormData();
                        userForm.set('userId', tuptIdResult.value.toLocaleUpperCase());
                        userForm.set('accessionId', accessionResult.value.toLocaleUpperCase());
                        Swal.fire({
                            title: 'Please wait',
                            text: 'Fetching user details...',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showConfirmButton: false,
                        });
                        axios({
                            method: "post",
                            url: `/api/v1/check/user`,
                            data: userForm,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }).then((response) => {
                            // if (response && response.data.success) {
                            if (response.data.success) {
                                if (response.data.userdetails === null && response.data.bookdetails !== null) {
                                    Swal.update({
                                        title: 'Error',
                                        text: 'Failed to fetch user details. Please try again.',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        showConfirmButton: true,
                                        confirmButtonText: 'OK',
                                    });
                                } else if (response.data.bookdetails === null && response.data.userdetails !== null) {
                                    Swal.update({
                                        title: 'Error',
                                        text: 'Failed to fetch book details. Please try again.',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        showConfirmButton: true,
                                        confirmButtonText: 'OK',
                                    });
                                } else if (response.data.bookdetails === null && response.data.userdetails === null) {
                                    Swal.update({
                                        title: 'Error',
                                        text: 'Failed to fetch user and book details. Please try again.',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        showConfirmButton: true,
                                        confirmButtonText: 'OK',
                                    });
                                } else {
                                    Swal.fire({
                                        title: 'Confirm',
                                        html: `Please confirm the following details before proceeding: <br><br>
                                            TUP-T ID: <b>${tuptIdResult.value}</b><br>
                                            Name: <b>${response.data.userdetails.name}</b><br>
                                            Accession Number: <b>${accessionResult.value}</b><br>
                                            Book Title: <b>${response.data.bookdetails.title}</b>`,
                                        showCancelButton: true,
                                        confirmButtonText: 'Confirm',
                                        cancelButtonText: 'Cancel',
                                    }).then((confirmResult) => {
                                        if (confirmResult.isConfirmed) {
                                            const formData = new FormData();
                                            formData.set('accession', accessionResult.value);
                                            formData.set('tuptId', tuptIdResult.value.toLocaleUpperCase());
                                            formData.set('func', 'give');
                                            dispatch(changeBookAccession(formData));
                                        }
                                    });
                                }
                            } else {
                                Swal.update({
                                    title: 'Error',
                                    text: 'There seems to be an error with this function. Please try again.',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    showConfirmButton: true,
                                    confirmButtonText: 'OK',
                                });
                            }
                        });
                    }
                });
            }
        });
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
                            <Link to={`/admin/single/book/${rowData._id}`}>{rowData.title} </Link>
                        }

                    </div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
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
            title: 'Year',
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
                        <div>{rowData.subjects.map((item) => (
                            // <Link to={`/book/category/${item}`}>{item} </Link>
                            <p>{item}</p>
                        ))}</div>
                    </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Stock',
            field: 'copy',
            searchable: false,
            width: '50',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'In',
            field: 'on_shelf',
            searchable: false,
            width: '50',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Out',
            field: 'out',
            searchable: false,
            width: '50',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Accession Number(s)',
            field: '_id',
            searchable: false,
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Link to={`/accession/detail/${rowData._id}`} className="btn btn-primary py-1 px-2">
                            <i class="fa-regular fa-eye"></i>
                        </Link>
                    </div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
            headerStyle: {
                textAlign: 'center'
            }
        },
        {
            title: 'Actions',
            field: '_id',
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Tooltip className="" title="Edit">
                            <Link to={`/admin/book/${rowData._id}`} className="btn btn-warning py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                        </Tooltip>

                        <Tooltip className="" title="Delete">
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBookHandler(rowData._id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Tooltip>
                    </div>

                </Fragment>
            ),
            searchable: false,
            headerStyle: {
                textAlign: 'center'
            }
        },


    ]

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            <div className='col-12'>
                {loading || loading === undefined ? <Loader /> : (
                    <div className="dashboard-container">
                        <div className='table-container'>
                            <div className='book-align'>
                                <div className='book-add'>
                                    <Link to={"/book/new"} className="btn btn-primary mr-3">Add Book</Link>
                                    {/* <Link to='/' className="btn btn-primary">Import MRC</Link> */}
                                    <button className="btn btn-primary mr-3" onClick={importMRC}>
                                        Import MRC
                                    </button>
                                    <button className="btn btn-primary mr-3" onClick={lendBookHandler}>
                                        Lend Book
                                    </button>


                                    {/* <form id="importMRC" name="importMRC" onSubmit={submitHandler} encType="multipart/form-data" className="form-book-management">
                                        <div className="modal fade" data-backdrop="false" id={"ImportBookModal"} tabindex="-1" role="dialog" aria-labelledby="ImportBookModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h3 className="modal-title" id="ImportBookModalLabel">Import Book</h3>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Please upload a file
                                                    </div>
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        name="file"
                                                        onChange={onFileChange}
                                                    />
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                        <button className="btn btn-success" type="button" onClick={submitHandler} data-dismiss="modal">Import</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form > */}


                                    {/* <form id="lendBook" name="lendBook" onSubmit={giveAccessionHandler} encType="multipart/form-data" >
                                        <div className="modal fade" id={"bookLendModal"} tabindex="-1" role="dialog" aria-labelledby="bookLendLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h3 className="modal-title" id="DeleteAccessionModalLabel">Lend a Book</h3>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div>

                                                        <div className="modal-body">
                                                            <div className='row'>
                                                                <div className='col-md-6'>
                                                                    <div className='lendImage'>

                                                                    </div>
                                                                    <label htmlFor="tuptId_field" className="col-sm-12 col-form-label">TUP-T ID</label>
                                                                    <div className="col-sm-12">
                                                                        <input
                                                                            type="text"
                                                                            id="tuptId_field"
                                                                            className="form-control"
                                                                            name='tuptId'
                                                                            value={tuptId}
                                                                            onChange={(e) => setTuptId(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div>
                                                                        <h6>{ }</h6>
                                                                    </div>
                                                                    <label htmlFor="accession_number_field" className="col-sm-12 col-form-label">Accession Number</label>
                                                                    <div className="col-sm-12">
                                                                        <input
                                                                            type="text"
                                                                            id="accession_number_field"
                                                                            className="form-control"
                                                                            name='accession_number'
                                                                            value={accession_number}
                                                                            // onChange={(e) => bookImageHandler(e.target.value)}
                                                                            onChange={(e) => setAccession_number(e.target.value)}
                                                                        // onChange={bookImageHandler}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-primary" onClick={giveAccessionHandler} data-dismiss="modal">Lend</button>
                                                        <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form> */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3'>
                                    <h5 className='text-center mb-3'>Year Published</h5>
                                    <div className='row' style={{ marginBottom: 10 }}>
                                        <TextField id="yearStart" label="Start Year" defaultValue={books.lowestYearPub} value={yearPubStart} onChange={(e) => setyearPubStart(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginRight: '10px', width: '80px' }} />
                                        <span style={{ paddingTop: '1em' }}>&#8212;</span>
                                        <TextField id="yearEnd" label="End  Year" defaultValue={books.highestYearPub} value={yearPubEnd} onChange={(e) => setyearPubEnd(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginLeft: '10px', width: '80px' }} />
                                    </div>

                                    <div className='row' style={{ marginBottom: 10 }}>
                                        <button type="button" className="btn btn-primary" onClick={filterYearPub} style={{ display: 'block', margin: '0 auto', marginRight: '5px' }}>Filter  <i class="fa-solid fa-filter"></i></button>

                                        <button type="button" className="btn btn-danger" onClick={clearYearPub} style={{ display: 'block', margin: '0 auto', marginLeft: '5px' }}>Clear  <i class="fa-solid fa-filter-circle-xmark"></i></button>
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
                                        {
                                            // books.bookSubjects && books.bookSubjects.length > 0 ? (

                                            subjectArr.map((subject, index) => (
                                                <div className="col-sm-3" key={index}>
                                                    <input type="checkbox" id="checkbox" name="checkbox" value={subject} checked={subjects.includes(subject)} onChange={() => handleCheckedChanged(subject)} /> {subject}
                                                </div>
                                            ))

                                            // ) : (
                                            //     <li>Subjects not Found</li>
                                            // )
                                        }
                                    </div>
                                </div>
                            </div>


                            {loading ? <Loader /> : (
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <MaterialTable
                                        title='Books List'
                                        data={books.book}
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
            </div>
        </Fragment>
    )
}
export default BookManagement