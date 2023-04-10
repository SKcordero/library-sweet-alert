import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dateFormat from 'dateformat';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import DeactivatedDashboard from '../layout//DeactivatedDashboard'
import DeactivatedUser from '../layout//DeactivatedUser'
import UnsetDashboard from '../layout/UnsetDashboard';
import PendingDashboard from '../layout/PendingDashboard';
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarEmpty from '../layout/SideNavbarEmpty'
import SideNavbarUnset from '../layout/SideNavbarUnset'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { getPenaltySlip, clearErrors } from '../../actions/studentActions'

const PenaltySlip = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user  } = useSelector(state => state.auth);
    const { loading, error, penalty } = useSelector(state => state.penaltySlip);

    useEffect(() => {
        dispatch(getPenaltySlip());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error,])

    return (
        <Fragment>
            <MetaData title={'Penalties'} />
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
                                                <div className="dashboard-container">
                                                    <div className="table-container">
                                                        <h2 className='text-center'>Penalty Slip</h2>
                                                        {(penalty.penalties == null || penalty.penalties == undefined) ?
                                                            (
                                                                <h1>No Penalty</h1>
                                                            ) : (
                                                                <div class="penalty-slip">
                                                                    <p>Penalty Slip</p>
                                                                    <div class="penalty-header">
                                                                        <img src="/images/TUPT-Logo.png" alt="" />
                                                                        Technological University of the Philippines Taguig - LRC
                                                                    </div>
                                                                    <div class="penalty-info">
                                                                        <div class="name-of-the-student">
                                                                            <span>Name of the student:
                                                                                <span> {penalty.penalties.userId.name}</span>
                                                                            </span>
                                                                        </div>
                                                                        <div class="p-course">
                                                                            <span>
                                                                                Course:
                                                                                <span>
                                                                                    {penalty.penalties.userId.course}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <div class="p-section">
                                                                            <span>
                                                                                Section:
                                                                                <span>
                                                                                    {penalty.penalties.userId.section}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="borrowed-books__container">
                                                                        <div class="numbers-books">Book #</div>
                                                                        <div class="borrowed-books">Borrowed Books</div>
                                                                        <div class="amount">Total</div>
                                                                        <div class="list-books">1</div>
                                                                        <div class="list-books-two">2</div>
                                                                        <div class="name-book"> {penalty.penalties.penalty}</div>
                                                                        {/* <div class="name-book-two">Bakit ka umutot inay part 2</div> */}
                                                                        <div class="amount-pay">5.00</div>
                                                                        {/* <div class="amount-pay-two">5.00</div> */}
                                                                        <div class="filler">Penalty Total</div>
                                                                        <div class="penalty-total">
                                                                            <span>
                                                                                &#8369;
                                                                            </span>
                                                                            10.00
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            )

                                                        }
                                                    </div>
                                                </div>
                                            </Fragment>
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
export default PenaltySlip