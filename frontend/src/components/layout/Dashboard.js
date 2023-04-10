import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './SideNavbarAdmin'
import SideNavbarUser from './SideNavbarUser'
import SideNavbarUnset from './SideNavbarUnset'
import SideNavbarEmpty from './SideNavbarEmpty'
import AdminDashboard from '../admin/AdminDashboard'
import UserDashboard from '../user/UserDashboard'
import UnsetDashboard from './UnsetDashboard'
import DeactivatedDashboard from './DeactivatedDashboard';
import DeactivatedUser from './DeactivatedUser'
import PendingDashboard from './PendingDashboard'
import SideNavbarRequest from './SideNavBarRequest';

const Dashboard = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, loading, user } = useSelector(state => state.auth);

    useEffect(() => {
        if (error) {
            // alert.error(error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                title: `${error}`,
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
        }

    }, [dispatch, alert, error, navigate])

    return (
        <Fragment>
            <MetaData title={'Dashboard'} />
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    {user.status === 'deactivated' ? (
                        <div>
                            <SideNavbarEmpty />
                            <DeactivatedDashboard />
                        </div>
                    ) : (
                        user.role === 'admin' ? (
                            <div>
                                <SideNavbarAdmin />
                                <AdminDashboard />
                            </div>
                        ) : (
                            user.role === 'student' || user.role === 'faculty' ? (
                                user.course === undefined | null ? (
                                    <div>
                                        <SideNavbarUnset />
                                        <DeactivatedUser />
                                    </div>
                                ) : (
                                    < div >
                                        <SideNavbarUser />
                                        <UserDashboard />
                                    </div>
                                )
                            ) : (
                                user.role === 'request' ? (
                                    <div>
                                        <SideNavbarEmpty />
                                        <PendingDashboard />
                                    </div>
                                ) : (
                                    <div>
                                        <SideNavbarUnset />
                                        <UnsetDashboard />
                                    </div>
                                )
                            )
                        )
                    )}
                </Fragment>
            )}
        </Fragment >
    )
}
export default Dashboard