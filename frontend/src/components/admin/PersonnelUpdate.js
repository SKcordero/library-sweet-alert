import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import Swal from 'sweetalert2';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './../layout/SideNavbarAdmin'

import { getPersonnelDetails, updatePersonnel, clearErrors } from '../../actions/personnelActions'
import { UPDATE_PERSONNEL_RESET } from '../../constants/personnelConstants'

const PersonnelUpdate = () => {

	const [id_number, setId_number] = useState('')
	const [name, setName] = useState('')
	const [age, setAge] = useState('')
	const [gender, setGender] = useState('')
	const [contact, setContact] = useState('')
	const [address, setAddress] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { error, isUpdated } = useSelector(state => state.personnel);
	const { loading, personnel } = useSelector(state => state.personnelDetails)
	const { id } = useParams();

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {

		if (personnel && personnel._id !== id) {
			dispatch(getPersonnelDetails(id))
		} else {
			setId_number(personnel.id_number)
			setName(personnel.name)
			setAge(personnel.age)
			setGender(personnel.gender)
			setContact(personnel.contact)
			setAddress(personnel.address)
			setEmail(personnel.email)
			setPassword(personnel.password)
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (isUpdated) {
			// alert.success('Personnel updated successfully')
			Swal.fire({
                title: 'Personnel Updated',
                text: 'Personnel updated successfully!',
                icon: 'success',
				timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });

			navigate('/admin/personnels')

			dispatch({
				type: UPDATE_PERSONNEL_RESET
			})
		}

	}, [dispatch, alert, error, navigate, isUpdated, id, personnel])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		dispatch(updatePersonnel(personnel._id, formData));
	};

	return (
		<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
			<SideNavbarAdmin />
			{loading || loading === undefined ? <Loader /> : (
				<div className="dashboard-container">
					<div className="form-container">
						<div className="form-padding-top form-step">
							<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data" className='form-personnel'>
								<h2 className="form-title">Personnel Information Area</h2>
								<hr />
								<div className="form-group row mr-0 ml-0 mt-4">
									<label htmlFor="idNumber_field" className="col-sm-1 col-form-label">TUPT #</label>
									<div className="col-sm-11">
										<input
											type="text"
											id="idNumber_field"
											className="form-control"
											name='id_number'
											value={id_number.toUpperCase()}
											onChange={(e) => setId_number(e.target.value)}
										/>
									</div>
								</div>
								<div className="form-group row mr-0 ml-0">
									<label htmlFor="name_field" className="col-sm-1 col-form-label">Name</label>
									<div className="col-sm-11">
										<input
											type="text"
											id="name_field"
											className="form-control"
											name='name'
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
								</div>
								<div className="form-group row mr-0 ml-0">
									<label htmlFor="age_field" className="col-sm-1 col-form-label">Age</label>
									<div className="col-sm-11">
										<input
											type="number"
											id="age_field"
											className="form-control"
											name='age'
											value={age}
											onChange={(e) => setAge(e.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row mr-0 ml-0">
									<label htmlFor="gender_field" className="col-sm-1 col-form-label">Gender</label>
									<div className="col-sm-11">
										<select	
											type="gender"
											id="gender"
											className="form-control"
											name="gender"
											value={gender}
											onChange={(e) => setGender(e.target.value)}
											placeholder="Select Gender">
											<option value="" disabled hidden> Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</select>
									</div>
								</div>

								<div className="form-group row mr-0 ml-0">
									<label htmlFor="contact_field" className="col-sm-1 col-form-label">Contact</label>
									<div className="col-sm-11">
										<input
											type="text"
											id="contact_field"
											className="form-control"
											name='contact'
											value={contact}
											onChange={(e) => setContact(e.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row mr-0 ml-0">
									<label htmlFor="address_field" className="col-sm-1 col-form-label">Address</label>
									<div className="col-sm-11">
										<input
											type="text"
											id="address_field"
											className="form-control"
											name='address'
											value={address}
											onChange={(e) => setAddress(e.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row mr-0 ml-0 mb-4">
									<label htmlFor="email_field" className="col-sm-1 col-form-label">Email</label>
									<div className="col-sm-11">
										<input
											type="text"
											id="email_field"
											className="form-control"
											name='email'
											value={email.toLowerCase()}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>

								<hr />
								<div className="p-3">
									<Link to="/admin/personnels" className="">
										<button className="button btn-danger">Cancel</button>
									</Link>
									<button className="button submit-btn float-right" type="submit">Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}
export default PersonnelUpdate