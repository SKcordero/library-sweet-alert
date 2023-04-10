import React, { Fragment, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import Swal from 'sweetalert2';
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import DeactivatedDashboard from '../layout//DeactivatedDashboard'
import DeactivatedUser from '../layout//DeactivatedUser'
import UnsetDashboard from '../layout/UnsetDashboard';
import PendingDashboard from '../layout/PendingDashboard';
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarEmpty from '../layout/SideNavbarEmpty'
import SideNavbarUnset from '../layout/SideNavbarUnset'

import { allNotification, deleteSingleNotification, deleteAllNotification, clearErrors } from "../../actions/userActions"
import { DELETE_NOTIFICATION_RESET, DELETE_ALL_NOTIFICATION_RESET } from "../../constants/userConstants"

const Notification = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();
    const { id } = useParams();

    const { user  } = useSelector(state => state.auth);
    const { loading, error, notification } = useSelector(state => state.notifications);
    const { notificationDeleted } = useSelector(state => state.singleDeleteNotification);
    const { notificationAllDeleted } = useSelector(state => state.allDeleteNotification);
    // const { user } = useSelector(state => state.auth);

    // const buttonClick = () => {
    //     addNotification({
    //         title: 'Warning',
    //         subtitle: 'This is a subtitle',
    //         message: 'This is a very long message',
    //         theme: 'darkblue',
    //         native: true // when using native, your OS will handle theming.
    //     });
    // };

    useEffect(() => {
        dispatch(allNotification(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (notificationDeleted) {
            // alert.success('Notification cleared successfully');
            Swal.fire({
                title: 'Notification Cleared',
                text: 'Notification deleted successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            // navigate(`/notification/${id}`);
            dispatch({ type: DELETE_NOTIFICATION_RESET })
            // window.location.reload(false)
        }

        if (notificationAllDeleted) {
            // alert.success('All notification cleared successfully');
            Swal.fire({
                title: 'All Notification Cleared',
                text: 'All notification has been cleared successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            // navigate(`/notification/${id}`);
            dispatch({ type: DELETE_ALL_NOTIFICATION_RESET })
            // window.location.reload(false)
        }

    }, [dispatch, alert, error, navigate, notificationDeleted, notificationAllDeleted, id])

    const deleteNotificationHandler = (id) => {
        // dispatch(deleteSingleNotification(id))
        Swal.fire({
            title: 'Delete Notification',
            text: 'Are you sure you want to delete this notification?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteSingleNotification(id))
            }
          });
    }

    const deleteallNotificationHandler = (id) => {
        // dispatch(deleteAllNotification(id))
        Swal.fire({
            title: 'Delete All Notifications',
            text: 'Are you sure you want to delete all notifications?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAllNotification(id))
            }
          });
    }

    return (
        <Fragment>
            <MetaData title={'Notification'} />
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
                                                <div className="wrapper-container">
                                                    <header className='d-flex align-items-center justify-content-between'>
                                                        Notifications
                                                        <button className="btn text-danger" onClick={() => deleteallNotificationHandler(notification._id)}>
                                                            <i class="fa-solid fa-trash mr-2"></i>
                                                            Clear All
                                                        </button>
                                                    </header>
                                                    <div className="history-logs-container">
                                                        {notification.map((n) => (
                                                            <div className="history-logs">
                                                                <p>{n.notificationText}</p>
                                                                <p>{n.reasons}</p>
                                                                <p>{n.notificationWebDate}</p>
                                                                <button className="btn" onClick={() => deleteNotificationHandler(n._id)}>
                                                                    <i class="fa-solid fa-trash text-danger"></i>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
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
export default Notification