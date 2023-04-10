import React, { Fragment, useEffect } from 'react'
import dateFormat from 'dateformat';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import DeactivatedDashboard from '../layout//DeactivatedDashboard'
import DeactivatedUser from '../layout//DeactivatedUser'
import UnsetDashboard from '../layout/UnsetDashboard';
import PendingDashboard from '../layout/PendingDashboard';
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarEmpty from '../layout/SideNavbarEmpty'
import SideNavbarUnset from '../layout/SideNavbarUnset'

import { allStudentAppointmentBook, clearErrors } from '../../actions/studentActions';

const AppointmentDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, studentappointmentbook } = useSelector(state => state.allStudentAppointmentBook);
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(allStudentAppointmentBook());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={'Borrowed Books'} />
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
                                            <Fragment>
                                                {studentappointmentbook ? (
                                                    <Fragment>
                                                        <div className="dashboard-container">
                                                            <div className='borrowed-container'>
                                                                <h2 className='mt-3'>Borrowed Books</h2>
                                                                <div className="borrowed-card">
                                                                    {studentappointmentbook.bookId && studentappointmentbook.bookId.map(data => (
                                                                        <div className='borrowed-card-content'>
                                                                            <div className='card-header'>
                                                                                {(data.book_image.url == null || undefined) ?
                                                                                    <img alt="" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png" />
                                                                                    :
                                                                                    <img alt="" src={data.book_image.url} />
                                                                                }
                                                                            </div>
                                                                            <h3>{data.title}</h3>
                                                                        </div>
                                                                    ))}
                                                                    <span>Schedule: {(studentappointmentbook.appointmentDate == null || undefined) ? 'not set' : dateFormat(studentappointmentbook.appointmentDate, "mmmm dd, yyyy")}</span>
                                                                    <span>Duedate: {(studentappointmentbook.dueDate == null || undefined) ? 'not set' : dateFormat(studentappointmentbook.dueDate, "mmmm dd, yyyy")}</span>
                                                                    <span>Status: {studentappointmentbook.status}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <div className="dashboard-container">
                                                            <div className="table-container">
                                                                <div>
                                                                    <h1>Borrowed Books</h1>
                                                                    <hr />
                                                                    <h1>No Borrowed Books</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                )}
                                            </Fragment>
                                        )
                                        }
                                    </Fragment>
                                )
                            )
                        )
                    )
            }
        </Fragment >
    )
}
export default AppointmentDetails