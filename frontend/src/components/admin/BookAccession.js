import axios from 'axios';
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import dateFormat from 'dateformat';
import ReactDOM from 'react-dom';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';

import { getBookAccession, addBookAccession, changeBookAccession, editBookAccession, deleteBookAccession, clearErrors } from '../../actions/bookActions'
import { ADD_BOOK_ACCESSION_RESET, ACCESSION_BOOK_RESET, DELETE_BOOK_ACCESSION_RESET, EDIT_BOOK_ACCESSION_RESET } from '../../constants/bookConstants'

const BookAccession = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();

  const { bookAccessions, loading } = useSelector(state => state.accessionDetails)
  const { success } = useSelector(state => state.addBookAccession)
  const { accessionDeleted, accessionEdited, bookAccessionNum, accession_error } = useSelector(state => state.accessionReducer)
  const { bookAccession, accession_book_error } = useSelector(state => state.bookAccession)

  const defaultMaterialTheme = createTheme({});

  useEffect(() => {
    dispatch(getBookAccession(id));

    if (accession_book_error) {
      // alert.error(accession_book_error);
      Swal.fire({
        title: 'No User Found',
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      dispatch(clearErrors())
    }

    if (success) {
      // alert.success('Book accession created successfully');
      Swal.fire({
        title: 'Accession Created',
        text: 'Book accession created successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(`/accession/detail/${id}`);
      dispatch({ type: ADD_BOOK_ACCESSION_RESET })
    }

    if (bookAccession) {
      // alert.success('Book accession updated successfully');
      Swal.fire({
        title: 'Accession Updated',
        text: 'Book accession updated successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(`/accession/detail/${id}`);
      dispatch({ type: ACCESSION_BOOK_RESET })
    }

    // if (accession_error) {
    //   // alert.success('Book accession updated successfully');
    //   Swal.fire({
    //     title: 'Accession not Updated',
    //     text: 'Book accession update unsuccessful!',
    //     icon: 'error',
    //     timer: 2000,
    //     timerProgressBar: true,
    //     showConfirmButton: false,
    //   });
    //   navigate(`/accession/detail/${id}`);
    //   dispatch({ type: ACCESSION_BOOK_RESET })
    // }

    if (accessionDeleted) {
      // alert.success('Book accession deleted successfully');
      Swal.fire({
        title: 'Accession Deleted',
        text: 'Book accession deleted successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(`/accession/detail/${id}`);
      dispatch({ type: DELETE_BOOK_ACCESSION_RESET })
    }
    if (accessionEdited) {
      // alert.success('Book accession edited successfully');
      Swal.fire({
        title: 'Accession Edited',
        text: 'Book accession edited successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(`/accession/detail/${id}`);
      dispatch({ type: EDIT_BOOK_ACCESSION_RESET })
    }

  }, [dispatch, alert,bookAccession, accession_book_error, success, accessionDeleted, accessionEdited, navigate,])

  const [accession, setAccession] = useState('');
  const [accession_edit, setAccession_Edit] = useState('');
  const [tuptId, setTuptId] = useState('');

  const deleteAccessionHandler = (accessionId) => {
    Swal.fire({
      title: 'Delete Accession',
      text: 'Are you sure you want to delete this book accession?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        console.log(id)
        console.log(accessionId)
        formData.set('bookId', id)
        dispatch(deleteBookAccession(accessionId, formData))
      }
    });
  }
  const addRef = useRef(null);
  const addAccessionHandler = () => {

    const handleAddAccession = () => {
      const formData = new FormData();
      formData.set('bookId', id);
      formData.set('accession', addRef.current.value);
      dispatch(addBookAccession(formData));
    };

    const form = document.createElement('form');
    const inputField = document.createElement('div');
    const inputFieldComponent = (
      <input
        type='text'
        id='accession_field'
        name='accession'
        className='form-control'
        ref={addRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddAccession();
          }
        }}
        autoComplete="off"
      />
    );
    ReactDOM.render(inputFieldComponent, inputField);

    form.innerHTML = `
          <form>
            <div>
              <label for="accession_field" class="col-form-label">Accession Number</label>
              <div id="inputField_container"></div>
            </div>
          </form>
        `;

    const inputFieldContainer = form.querySelector('#inputField_container');
    inputFieldContainer.appendChild(inputField);

    Swal.fire({
      title: 'Add Accession',
      html: form,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        addRef.current.focus();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddAccession();
        console.log(accession)
      }
    });
  };

  const giveRef = useRef(null);
  const giveAccessionHandler = (accessionName) => {
    // const formData = new FormData();
    // formData.set('accession', accessionName)
    // formData.set('tuptId', tuptId)
    // formData.set('func', 'give');
    // dispatch(changeBookAccession(formData))
    const handleGiveAccession = () => {
      const formData = new FormData();
      formData.set('accession', accessionName)
      formData.set('tuptId', giveRef.current.value.toUpperCase())
      formData.set('func', 'give');
      console.log(giveRef.current.value)
      dispatch(changeBookAccession(formData))
    };

    const form = document.createElement('form');
    const inputField = document.createElement('div');
    const inputFieldComponent = (
      <input
        type='text'
        id='tuptId_field'
        name='tuptId'
        className='form-control'
        placeholder='TUPT-XX-XXXX'
        ref={giveRef}
        autoComplete="off"
      />
    );
    ReactDOM.render(inputFieldComponent, inputField);

    form.innerHTML = `
          <form>
            <div>
              <label for="tuptId_field" class="col-form-label">Accession Number</label>
              <div id="inputField_container"></div>
            </div>
          </form>
        `;

    const inputFieldContainer = form.querySelector('#inputField_container');
    inputFieldContainer.appendChild(inputField);

    Swal.fire({
      title: 'Give Accession',
      html: form,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Give',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        giveRef.current.focus();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleGiveAccession();
      }
    });

  }
  const retrieveAccessionHandler = (accessionId) => {

    Swal.fire({
      title: 'Retrieve Accession',
      text: 'This will retrieve book accession manually. Are you sure you want to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Contrinue',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.set('accession', accessionId)
        formData.set('func', 'retrieve');
        dispatch(changeBookAccession(formData))
      }
    });
  }

  const editRef = useRef(null);
  const editAccessionHandler = (accessionId) => {
    Swal.fire({
      title: 'Edit Accession',
      input: 'text',
      text: 'Enter an accession number',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter an accession number';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.set('bookId', id)
        formData.set('accession', result.value)
        dispatch(editBookAccession(accessionId, formData))
      }
    });
  }

  const col = [
    {
      title: 'Accession Number',
      field: 'accession_number',
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      title: 'Inventory Status',
      // field: 'bookId',
      // width: '10%',
      render: rowData => (

        // rowData.map((item) => (
        <Fragment>
          <div className="icon-buttons">
            {(rowData.on_shelf == true) ?
              <div>
                <button className="btn btn-success py-1 px-2 ml-2" onClick={() => giveAccessionHandler(rowData.accession_number)}>
                  <i className="fa fa-box"></i>
                </button> This book is on shelf
              </div>
              :
              <div>
                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => retrieveAccessionHandler(rowData.accession_number)}>
                  <i className="fa fa-box"></i>
                </button> This book is out
              </div>
            }
          </div>
        </Fragment>
        // ))
      ),
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      title: 'In possession of',
      field: 'userId',
      render: rowData => (
        <Fragment>
          <div className='row'>

            {(rowData.userId == null || rowData.userId == undefined) ? (
              <p>None</p>
            ) : (
              <p><Link to={`/detail/student/${rowData.userId._id}`}>{rowData.userId.name}</Link>| <strong>{rowData.userId.role}</strong></p>
            )}
          </div>
        </Fragment>
      ),
      cellStyle: {
        textAlign: "left"
      }
    },
    {
      title: 'Actions',
      field: '_id',
      // width: 180,
      searchable: false,
      render: rowData => (
        <Fragment>
          <div className="icon-buttons">
            <button className="btn btn-warning py-1 px-2 ml-2" onClick={() => editAccessionHandler(rowData._id)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAccessionHandler(rowData._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
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
            <div className='accession-btns mb-3'>
              <div className='accession-flex'>
                <h4 className='mb-3'>Book: "{bookAccessions.bookDetails.title}"</h4>
                <h3>Available Stock(s): {bookAccessions.bookDetails.copy}</h3>
              </div>
              <button className="btn btn-primary" onClick={() => addAccessionHandler()}>
                <Tooltip title="Add"><i className="fa-solid fa-circle-plus mr-2"></i></Tooltip>
                Add Accession(s)
              </button>
            </div>
            {loading ? <Loader /> : (
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  title='Book Accessions'
                  data={bookAccessions.bookAccessions}
                  columns={col}
                  localization={
                    {
                      toolbar: {
                        searchPlaceholder: 'Number, Status...'
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
        </div >
      )
      }
    </Fragment >
  )
}
export default BookAccession