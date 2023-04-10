import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import Swal from 'sweetalert2';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './../layout/SideNavbarAdmin'

import { newPersonnel, clearErrors } from '../../actions/personnelActions'
import { NEW_PERSONNEL_RESET } from '../../constants/personnelConstants'

const PersonnelCreate = () => {

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
	const { loading, error, success } = useSelector(state => state.newPersonnel);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (success) {
			Swal.fire({
                title: 'Personnel Added',
                text: 'Personnel created successfully!',
                icon: 'success',
				timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
			navigate('/admin/personnels');
			// alert.success('Personnel created successfully');
			dispatch({ type: NEW_PERSONNEL_RESET })
		}

	}, [dispatch, alert, error, success, navigate])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		dispatch(newPersonnel(formData));
	};

	return (
		<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
			<SideNavbarAdmin />
			<div className="dashboard-container">
				<div className="table-container">
					<div className="top-table-elements-start">
						<div className="pesonnel-management-button">
							<Link to='/admin/personnels'>
								<i class="fa-solid fa-arrow-left" />{" "}
								Personnel Management
							</Link>
						</div>
					</div>
					<div className="form-container">
						<div className="form-step">
							<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data" className='form-personnel'>
								<h2 className='form-title'>Personnel Information Area</h2>
								<hr />
								<div className='input-field__container'>
									<div className="form-group row">
										<div className="col-sm-3">
											<input
												type="text"
												id="idNumber_field"
												className="form-control"
												name='id_number'
												placeholder='Tupt-**-****'
												value={id_number.toUpperCase()}
												onChange={(e) => setId_number(e.target.value)}
											/>
										</div>
										<div className="col-sm-7">
											<input
												type="text"
												id="name_field"
												className="form-control"
												name='name'
												value={name}
												placeholder="Name"
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="col-sm-2">
											<input
												type="number"
												id="age_field"
												className="form-control"
												name='age'
												value={age}
												placeholder="Age"
												onChange={(e) => setAge(e.target.value)}
											/>
										</div>
									</div>
									{/* <div className="form-group row">
									<label htmlFor="name_field" className="col-2 col-form-label">Name</label>
									<div className="col-9">
										<input
											type="text"
											id="name_field"
											className="form-control"
											name='name'
											value={name}
											placeholder="Name"
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="age_field" className="col-2 col-form-label">Age</label>
									<div className="col-9">
										<input
											type="number"
											id="age_field"
											className="form-control"
											name='age'
											value={age}
											placeholder="Age"
											onChange={(e) => setAge(e.target.value)}
										/>
									</div>
								</div> */}

									<div className="form-group row">
										{/* <label htmlFor="gender_field" className="col-sm-2 col-form-label">Gender</label> */}
										<div className="col-sm-3">
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
										<div className="col-sm-9">
											<input
												type="text"
												id="contact_field"
												className="form-control"
												name='contact'
												value={contact}
												placeholder="Contact"
												onChange={(e) => setContact(e.target.value)}
											/>
										</div>
									</div>

									{/* <div className="form-group row">
									<label htmlFor="contact_field" className="col-sm-2 col-form-label">Contact</label>
									<div className="col-9">
										<input
											type="text"
											id="contact_field"
											className="form-control"
											name='contact'
											value={contact}
											placeholder="Contact"
											onChange={(e) => setContact(e.target.value)}
										/>
									</div>
								</div> */}

									<div className="form-group row">
										{/* <label htmlFor="address_field" className="col-sm-2 col-form-label">Address</label> */}
										<div className="col-12">
											<input
												type="text"
												id="address_field"
												className="form-control"
												name='address'
												value={address}
												placeholder="Address"
												onChange={(e) => setAddress(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										{/* <label htmlFor="email_field" className="col-sm-2 col-form-label">Email</label> */}
										<div className="col-12">
											<input
												type="text"
												id="email_field"
												className="form-control"
												name='email'
												value={email.toLowerCase()}
												placeholder="Email Address"
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										{/* <label htmlFor="password_field" className="col-sm-2 col-form-label">Password</label> */}
										<div className="col-12">
											<input
												type="password"
												id="password_field"
												className="form-control"
												name='password'
												value={password}
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
									</div>
									<div>
										<hr />
										<button className="button btn-primary mt-4" type="submit">Save</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
export default PersonnelCreate