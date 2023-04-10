import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button';

const UserDashboard = () => {
    return (
        <Fragment>
            <div className='dashboard-container'>
                <div className='form-container d-flex align-items-center justify-content-center'>
                    <div className="profile-prompt">
                        <h1>One Step Closer</h1>
                        <hr />
                        <p>
                            Before proceeding on using the application.
                        </p>
                        <p>
                            We encourage you to edit your profile first and fill up your
                            <b> Course</b> and <b>Section</b> in order to avoid unneccesarry errors.
                        </p>
                        <p>Thank you for your patience TUPTians!</p>
                        <Button variant="primary" href="/profile" className='mt-3 px-2'>
                            EDIT PROFILE NOW
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}
export default UserDashboard