import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { allHistoryLog, deleteHistoryLog, deleteAllHistoryLog, clearErrors } from '../../actions/personnelActions'
import { DELETE_HISTORYLOG_RESET, DELETE_ALL_HISTORYLOG_RESET } from '../../constants/personnelConstants'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import Swal from 'sweetalert2';

const HistoryLog = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();

    const { loading, error, history } = useSelector(state => state.historyLogs);
    const { isDeletedAll, isDeleted } = useSelector(state => state.historylog);

    useEffect(() => {
        dispatch(allHistoryLog());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            Swal.fire({
                title: 'Log Deleted',
                text: 'History log deleted successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/historyLog');
            // alert.success('History Log deleted successfully');
            dispatch({ type: DELETE_HISTORYLOG_RESET })
        }
        if (isDeletedAll) {
            Swal.fire({
                title: 'All Logs Deleted',
                text: 'All history logs deleted successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            navigate('/historyLog');
            // alert.success('All history Log deleted successfully');
            dispatch({ type: DELETE_ALL_HISTORYLOG_RESET })
        }

    }, [dispatch, isDeleted, isDeletedAll, alert, error, navigate])

    const deleteHistoryLogHandler = (id) => {
        // dispatch(deleteHistoryLog(id))
        Swal.fire({
            title: 'Delete History Log',
            text: 'Are you sure you want to delete this log?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteHistoryLog(id))
            }
          });
    }

    const deleteAllHistoryLogHandler = () => {
        // dispatch(deleteAllHistoryLog())
        Swal.fire({
            title: 'Delete All History Log',
            text: 'Are you sure you want to delete all logs?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAllHistoryLog())
            }
          });
    }

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> : (
                <div className="dashboard-container">
                    <div className="wrapper-container">
                        <header className='d-flex align-items-center justify-content-between'>
                            History Logs
                            <button className="btn text-danger" onClick={() => deleteAllHistoryLogHandler()}>
                                <i class="fa-solid fa-trash mr-2"></i>
                                Clear All
                            </button>
                        </header>
                        
                        <div className="history-logs-container">
                            {history.map((h) => (
                                <div id={h._id}>
                                    <div className="history-logs">
                                        <p>{h.historylogText}</p>
                                        {/* <h6>{h.historylogType}</h6> */}
                                        <p>{h.historylogDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                        <button className="btn" onClick={() => deleteHistoryLogHandler(h._id)}>
                                            <i class="fa-solid fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default HistoryLog