import axios from 'axios';
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
// import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import SideNavbarAdmin from '../../layout/SideNavbarAdmin'

import { checkEvaluation, allEvaluation, newEvaluations, editEvaluations, deleteEvaluations, deactivateEvaluations, clearErrors } from '../../../actions/evaluationActions'
import { NEW_EVALUATION_RESET, EDIT_EVALUATION_RESET, DELETE_EVALUATION_RESET, DEACTIVATE_EVALUATION_RESET, CHECK_EVALUATION_RESET } from '../../../constants/evaluationConstants'
import { CHECK_PASSWORD_RESET } from '../../../constants/personnelConstants'
import { checkPassword } from '../../../actions/personnelActions'

const EvaluationManagement = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();

  const { user } = useSelector(state => state.auth);

  const { loading, evaluations, error } = useSelector(state => state.allevaluation);
  const { eval_error, success, new_eval_error } = useSelector(state => state.newevaluation);
  const { edit_eval_error, isEdited, isDeleted, isDeactivate } = useSelector(state => state.evaluation);
  const { checksuccess, checkerror } = useSelector(state => state.checkEvaluations);
  const { check_error } = useSelector(state => state.checkUserPassword);


  const defaultMaterialTheme = createTheme({});

  useEffect(() => {
    dispatch(allEvaluation())

    if (checksuccess) {
      dispatch({ type: CHECK_EVALUATION_RESET })
      navigate("/student/evaluation");
    }

    if (checkerror) {
      alert.error(checkerror);
      dispatch({ type: NEW_EVALUATION_RESET })
      dispatch(clearErrors())
    }

    if (new_eval_error) {
      alert.error(new_eval_error);
      dispatch(clearErrors())
    }

    if (eval_error) {
      alert.error(edit_eval_error);
      dispatch(clearErrors())
    }

    if (success) {
      // alert.success('Evaluation created successfully');
      Swal.fire({
        title: 'Evaluation Created',
        text: 'Evaluation has been added successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      dispatch({ type: NEW_EVALUATION_RESET })
      navigate(`/admin/evaluation`);
    }

    if (isEdited) {
      // alert.success('Evaluation edited successfully');
      Swal.fire({
        title: 'Evaluation Updated',
        text: 'Evaluation updated successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      dispatch({ type: EDIT_EVALUATION_RESET })
      navigate(`/admin/evaluation`);
    }

    if (isDeleted) {
      // alert.success('Evaluation deleted successfully');
      Swal.fire({
        title: 'Evaluation Deleted',
        text: 'Evaluation deleted successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      dispatch({ type: DELETE_EVALUATION_RESET })
      navigate(`/admin/evaluation`);
    }
    if (isDeactivate) {
      // alert.success('Evaluation deactivated successfully');
      Swal.fire({
        title: 'Evaluation Deactivated',
        text: 'Evaluation has been deactivated successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      dispatch({ type: DEACTIVATE_EVALUATION_RESET })
      navigate(`/admin/evaluation`);
    }

    if (check_error) {
      // alert.error('All student account has been deactivated');
      Swal.fire({
        title: 'Incorrect password',
        text: 'Deactivation of evaluation failed!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      navigate(`/admin/evaluation`);
      dispatch({ type: CHECK_PASSWORD_RESET })
    }

  }, [dispatch, alert, success, checksuccess, checkerror, isEdited, isDeleted, isDeactivate, new_eval_error, eval_error, check_error, edit_eval_error])

  const [school_year, setSchool_year] = useState('')
  const [tl, setTl] = useState('')
  const [edit_school_year, setEdit_school_year] = useState('')

  const checkEvaluationHandler = () => {
    dispatch(checkEvaluation());
  }

  const schoolYearRef = useRef(null);
  const termLevelRef = useRef(null);
  const submitHandler = () => {
    const handleAddEvaluation = () => {
      const formData = new FormData();
      formData.set('school_year', "S.Y. " + schoolYearRef.current.value + " " + termLevelRef.current.value);
      dispatch(newEvaluations(formData));
    };

    const form = document.createElement('form');
    const inputField = document.createElement('div');

    const inputFieldComponent = (
      <div className='row'>
        <div className='col-4'>
          <input
            type='text'
            id='accession_field'
            name='accession'
            className='form-control'
            ref={schoolYearRef}
            placeholder='School Year e.g. 22-23'
            autoComplete="off"
          />
        </div>
        <div className="col-8">
          <select
            type="tl"
            id="term_level"
            className="form-control"
            name='tl'
            ref={termLevelRef}
            placeholder="Year Level"
          >
            <option value="" disabled hidden>Select Term</option>
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
        </div>
      </div>
    );

    ReactDOM.render(inputFieldComponent, inputField);

    form.innerHTML = `
          <form>
            <div>
              <label for="accession_field" class="col-form-label">School Year & Term</label>
              <div id="inputField_container"></div>
            </div>
          </form>
        `;

    const inputFieldContainer = form.querySelector('#inputField_container');
    inputFieldContainer.appendChild(inputField);

    Swal.fire({
      title: 'Add Evaluation',
      html: form,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddEvaluation();
      }
    });
  };

  // const editEvaluationHandler = (evaluationId) => {
  //     console.log('editEvaluationHandler')
  //     const formData = new FormData();
  //     formData.set('school_year', edit_school_year)
  //     dispatch(editEvaluations(evaluationId, formData));
  // }

  const schoolYearEditRef = useRef(null);
  const termLevelEditRef = useRef(null);
  const editEvaluationHandler = (evaluationId) => {
    const handleAddEvaluation = () => {
      console.log('editEvaluationHandler')
      const formData = new FormData();
      formData.set('school_year', "S.Y. " + schoolYearEditRef.current.value + " " + termLevelEditRef.current.value);
      dispatch(editEvaluations(evaluationId, formData));
    };

    const form = document.createElement('form');
    const inputField = document.createElement('div');

    const inputFieldComponent = (
      <div className='row'>
        <div className='col-4'>
          <input
            type='text'
            id='accession_field'
            name='accession'
            className='form-control'
            ref={schoolYearEditRef}
            placeholder='School Year e.g. 22-23'
            autoComplete="off"
          />
        </div>
        <div className="col-8">
          <select
            type="tl"
            id="term_level"
            className="form-control"
            name='tl'
            ref={termLevelEditRef}
            placeholder="Year Level"
          >
            <option value="" disabled hidden>Select Term</option>
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
        </div>
      </div>
    );

    ReactDOM.render(inputFieldComponent, inputField);

    form.innerHTML = `
          <form>
            <div>
              <label for="accession_field" class="col-form-label">School Year & Term</label>
              <div id="inputField_container"></div>
            </div>
          </form>
        `;

    const inputFieldContainer = form.querySelector('#inputField_container');
    inputFieldContainer.appendChild(inputField);

    Swal.fire({
      title: 'Edit Evaluation',
      html: form,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Edit',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddEvaluation();
      }
    });
  };

  const deleteEvaluationHandler = (deleteId) => {
    // dispatch(deleteEvaluations(deleteId));
    Swal.fire({
      title: 'Delete Evaluation',
      text: 'Are you sure you want to delete this evaluation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEvaluations(deleteId))
      }
    });
  }

  const deactiveEvaluationHandler = (deleteId) => {
    // dispatch(deactivateEvaluations(deleteId));

    Swal.fire({
      title: 'Deactivate Term?',
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
          console.log(enteredPassword)
          const formData = new FormData();
          formData.set('password', enteredPassword)
          Swal.fire({
            title: 'Please wait',
            text: 'Fetching user details...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
          });
          axios({
            method: "post",
            url: `/api/v1/checkPassword`,
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            console.log(response)
            if (response.data.success === true) {
              dispatch(deactivateEvaluations(deleteId));
            } else {
              Swal.update({
                title: 'Incorrect Password',
                text: 'Please Try Again',
                icon: 'error',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: 'OK',
              });
            }
          })

        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  const col = [
    {
      title: 'School Year',
      field: 'school_year',
      searchable: false,
      render: rowData => (
        <Fragment>
          <div><p><Link to={`/admin/list/evaluation/${rowData._id}`}>{rowData.school_year}</Link></p></div>
        </Fragment>
      ),
      cellStyle: {
        textAlign: "left",
      },
    },
    {
      title: 'Status',
      field: 'status',
      searchable: false,
      render: rowData => (
        <Fragment>
          <div>
            {rowData.status === 'Active' ? (
              <Tooltip className="" title="Edit">
                <button className="btn btn-success py-1 px-2 ml-2" onClick={() => deactiveEvaluationHandler(rowData._id)}>
                  <i className="fa fa-lock"></i>
                </button>
              </Tooltip>
            ) : (
              <Tooltip className="" title="Cannot activate">
                <button className="btn btn-dark py-1 px-2 ml-2">
                  <i className="fa fa-unlock"></i>
                </button>
              </Tooltip>
            )}
            <p>{rowData.status}</p>

          </div>
        </Fragment>
      ),
      cellStyle: {
        textAlign: "left",
      },
    },
    {
      title: 'Actions',
      field: '_id',
      render: rowData => (
        <Fragment>
          <div className="icon-buttons">
            <Tooltip className="" title="Edit">
              <button className="btn btn-warning py-1 px-2 ml-2" onClick={() => editEvaluationHandler(rowData._id)}>
                <i className="fa fa-pencil"></i>
              </button>
            </Tooltip>
            <Tooltip className="" title="Delete">
              <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteEvaluationHandler(rowData._id)}>
                <i className="fa fa-trash"></i>
              </button>
            </Tooltip>
          </div>
        </Fragment>
      )
    }
  ]

  return (
    <Fragment>
      <MetaData title={'TUP-T Online Library - Admin'} />
      <SideNavbarAdmin />
      <div className='col-12'>
        <div className="dashboard-container">
          <div className='table-container'>
            <div className='eval-button-table py-3'>
              <button className="btn btn-primary" onClick={submitHandler}>
                Add
              </button>
              <button type="button" className="btn btn-danger" onClick={() => checkEvaluationHandler()}>
                Student Evaluation
              </button>
            </div>
            {/* <Link to="/student/evaluation" className="evaluation_btn"> */}

            {/* </Link> */}
            <div className=''>
              {loading || loading === undefined ? <Loader /> : (
                <ThemeProvider theme={defaultMaterialTheme}>
                  <MaterialTable
                    title='Evaluations List'
                    data={evaluations.evaluation}
                    columns={col}
                    localization={
                      {
                        toolbar: {
                          searchPlaceholder: 'School Year, Status...'
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
      </div>
    </Fragment>
  )
}
export default EvaluationManagement