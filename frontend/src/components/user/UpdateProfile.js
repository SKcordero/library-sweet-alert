import React, { Fragment, useState, useEffect } from 'react'
import dateFormat from 'dateformat';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
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

import { getStudentDetails, updateStudent, clearErrors } from '../../actions/studentActions'
import { UPDATE_STUDENT_RESET } from '../../constants/studentConstants'

const UpdateProfile = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const [id_number, setId_number] = useState('')
	const [name, setName] = useState('')
	const [birthday, setBirthday] = useState(new Date())
	const [gender, setGender] = useState('')
	const [contact, setContact] = useState('')
	const [address, setAddress] = useState('')
	const [course, setCourse] = useState('')
	const [section, setSection] = useState('')

	const { user } = useSelector(state => state.auth);
	const { error, isUpdated } = useSelector(state => state.changeStudentDetails);
	const { student, loading } = useSelector(state => state.singleStudentDetails)
	const { id } = useParams();

	useEffect(() => {

		if (student && student._id !== id) {
			dispatch(getStudentDetails(id))
		} else {
			console.log(student.birthday)

			if ((student.birthday) == null || undefined) {
				setBirthday(student.birthday)
			}
			else {
				// console.log("logs")
				setBirthday(dateFormat(student.birthday.split('T')[0], "yyyy-mm-dd"))
			}

			// console.log(test_birthday)
			setId_number(student.id_number)
			setName(student.name)

			setGender(student.gender)
			setContact(student.contact)
			setAddress(student.address)
			setCourse(student.course)
			setSection(student.section)
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}
		if (isUpdated) {
			// alert.success('Profile updated successfully')
			Swal.fire({
                title: 'Profile Updated',
                text: 'You have successfully updated your profile!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
			navigate('/profile')
			dispatch({ type: UPDATE_STUDENT_RESET })
		}

	}, [dispatch, alert, error, navigate, isUpdated, id, student])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(birthday)
		dispatch(updateStudent(student._id, formData));
	};

	return (
		<Fragment>
			<MetaData title={'Profile Update - test'} />
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
								user.course === undefined || user.course === null ? (
									<Fragment>
										<SideNavbarUnset />
										{loading || loading === undefined ? <Loader /> : (
											<Fragment>
												<div className="dashboard-container">
													<div className="form-container">
														<Link to='/profile' className='btn button-back'><i class="fa-solid fa-arrow-left"></i>Back</Link>
														<div className="form-step">
															<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data" className="form-personnel">
																<h2 className='form-title'>Edit Profile Information</h2>
																<hr />
																<div className="mt-3">
																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="idNumber_field" className="col-sm-2 col-form-label">TUPT Number</label>
																		<div className="col-sm-10">
																			<input
																				type="text"
																				id="idNumber_field"
																				className="form-control"
																				name='id_number'
																				value={id_number}
																				onChange={(e) => setId_number(e.target.value)}
																				placeholder="TUPT-XX-XXXX"
																			/>
																		</div>
																		{/* <div className="col-sm-7">
														<input
															type="text"
															id="name_field"
															className="form-control"
															name='name'
															value={name}
															onChange={(e) => setName(e.target.value)}
														/>
													</div>
													<div className="col-sm-2">
														<input
															type="Date"
															id="birthday_field"
															className="form-control"
															name='birthday'
															value={birthday}
															onChange={(e) => setBirthday(e.target.value)}
														/>
													</div> */}
																	</div>
																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="name_field" className="col-sm-2 col-form-label">Name</label>
																		<div className="col-sm-10">
																			<input
																				type="text"
																				id="name_field"
																				className="form-control"
																				name='name'
																				value={name}
																				onChange={(e) => setName(e.target.value)}
																			/>
																		</div>
																		{/* <div className="col-sm-2">
														<input
															type="Date"
															id="birthday_field"
															className="form-control"
															name='birthday'
															value={birthday}
															onChange={(e) => setBirthday(e.target.value)}
														/>
													</div> */}
																	</div>
																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="birthday_field" className="col-sm-2 col-form-label">Birthday</label>
																		<div className="col-sm-10">
																			<input
																				type="Date"
																				id="birthday_field"
																				className="form-control"
																				name='birthday'
																				value={birthday}
																				onChange={(e) => setBirthday(e.target.value)}
																			/>
																		</div>
																	</div>

																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="gender_field" className="col-sm-2 col-form-label">
																			Gender
																		</label>
																		<div className="col-sm-10">
																			<select
																				type="gender"
																				id="gender_field"
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
																		<label htmlFor="contact_field" className="col-sm-2 col-form-label">Contact</label>
																		<div className="col-sm-10">
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
																		<label htmlFor="address_field" className="col-sm-2 col-form-label">Address</label>
																		<div className="col-sm-10">
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

																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="course_field" className="col-sm-2 col-form-label">
																			Course
																		</label>
																		<div className="col-sm-10">
																			<select
																				type="course"
																				id="course_field"
																				className="form-control"
																				name='course'
																				value={course}
																				onChange={(e) => setCourse(e.target.value)}
																				placeholder="Year Level">
																				<option value="" disabled hidden> Select Course</option>
																				<option value="BETAT">BETAT | BET Major in Automotive Technology</option>
																				<option value="BETChT">BETChT | BET Major in Chemical Technology</option>
																				<option value="BETCT">BETCT | BET Major in Construction Technology</option>
																				<option value="BETET">BETET | BET Major in Electrical Technology</option>
																				<option value="BETEMT">BETEMT | BET Major in Electromechanical Technology</option>
																				<option value="BETElxT">BETElxT | BET Major in Electronics Technology</option>
																				<option value="BETInCT">BETInCT | BET Major in Instrumentation and Control Technology</option>
																				<option value="BETMT">BETMT | BET Major in Mechanical Technology</option>
																				<option value="BETMecT">BETMecT | BET Major in Mechatronics Technology</option>
																				<option value="BETNDTT">BETNDTT | BET Major in Non-Destructive Testing Technology</option>
																				<option value="BETDMT">BETDMT | BET Major in Dies & Moulds Technology</option>
																				<option value="BETHVAC">BETHVAC/RT | BET Major in Heating, Ventilation and Airconditioning/Refrigeration Technology</option>
																				<option value="BSCESEP">BSCESEP | Bachelor of Science in Civil Engineering</option>
																				<option value="BSEESEP">BSEESEP | Bachelor of Science in Electrical Engineering</option>
																				<option value="BSECESEP">BSECESEP | Bachelor of Science in Electronics Engineering</option>
																				<option value="BSMESEP">BSMESEP | Bachelor of Science in Mechanical Engineering</option>
																				<option value="BSIT">BSIT | Bachelor of Science in Information Technology</option>
																				<option value="BSIS">BSIS | Bachelor of Science in Information System</option>
																				<option value="BSESSDP">BSESSDP | Bachelor of Science in Environmental Science</option>
																				<option value="BGTAT">BGTAT | Bachelor in Graphics Technology Major in Architecture Technology</option>
																				<option value="BTVTEdET">BTVTEdET | BTVTE Major in Electrical Technology</option>
																				<option value="BTVTEdLXt">BTVTEdLXt | BTVTE Major in Electronics Technology</option>
																				<option value="BTVTEdICT">BTVTEdICT | BTVTE Major in Information and Communication Technology</option>
																			</select>
																		</div>
																	</div>

																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="section_field" className="col-sm-2 col-form-label">Section</label>
																		<div className="col-sm-10">
																			<input
																				type="text"
																				id="section_field"
																				className="form-control"
																				name='section'
																				value={section}
																				onChange={(e) => setSection(e.target.value)}
																			/>
																		</div>
																	</div>

																	<hr />
																	<div className="p-4">
																		<button className="button submit-btn" type="submit">Save</button>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div>
											</Fragment>
										)}
									</Fragment>
								) : (
									<Fragment>
										<SideNavbarUser />
										{loading || loading === undefined ? <Loader /> : (
											<Fragment>
												<div className="dashboard-container">
													<div className="form-container">
														<Link to='/profile' className='btn button-back'><i class="fa-solid fa-arrow-left"></i>Back</Link>
														<div className="form-step">
															<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data" className="form-personnel">
																<h2 className='form-title'>Edit Profile Information</h2>
																<hr />
																<div className="mt-3">
																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="idNumber_field" className="col-sm-2 col-form-label">TUPT Number</label>
																		<div className="col-sm-10">
																			<input
																				type="text"
																				id="idNumber_field"
																				className="form-control"
																				name='id_number'
																				value={id_number.toUpperCase()}
																				onChange={(e) => setId_number(e.target.value)}
																				placeholder="TUPT-XX-XXXX"
																			/>
																		</div>
																		{/* <div className="col-sm-7">
														<input
															type="text"
															id="name_field"
															className="form-control"
															name='name'
															value={name}
															onChange={(e) => setName(e.target.value)}
														/>
													</div>
													<div className="col-sm-2">
														<input
															type="Date"
															id="birthday_field"
															className="form-control"
															name='birthday'
															value={birthday}
															onChange={(e) => setBirthday(e.target.value)}
														/>
													</div> */}
																	</div>
																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="name_field" className="col-sm-2 col-form-label">Name</label>
																		<div className="col-sm-10">
																			<input
																				type="text"
																				id="name_field"
																				className="form-control"
																				name='name'
																				value={name}
																				onChange={(e) => setName(e.target.value)}
																			/>
																		</div>
																		{/* <div className="col-sm-2">
														<input
															type="Date"
															id="birthday_field"
															className="form-control"
															name='birthday'
															value={birthday}
															onChange={(e) => setBirthday(e.target.value)}
														/>
													</div> */}
																	</div>
																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="birthday_field" className="col-sm-2 col-form-label">Birthday</label>
																		<div className="col-sm-10">
																			<input
																				type="Date"
																				id="birthday_field"
																				className="form-control"
																				name='birthday'
																				value={birthday}
																				onChange={(e) => setBirthday(e.target.value)}
																			/>
																		</div>
																	</div>

																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="gender_field" className="col-sm-2 col-form-label">
																			Gender
																		</label>
																		<div className="col-sm-10">
																			<select
																				type="gender"
																				id="gender_field"
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
																		<label htmlFor="contact_field" className="col-sm-2 col-form-label">Contact</label>
																		<div className="col-sm-10">
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
																		<label htmlFor="address_field" className="col-sm-2 col-form-label">Address</label>
																		<div className="col-sm-10">
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

																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="course_field" className="col-sm-2 col-form-label">
																			Course
																		</label>
																		<div className="col-sm-10">
																			<select
																				type="course"
																				id="course_field"
																				className="form-control"
																				name='course'
																				value={course}
																				onChange={(e) => setCourse(e.target.value)}
																				placeholder="Year Level">
																				<option value="" disabled hidden> Select Course</option>
																				<option value="BETAT">BETAT | BET Major in Automotive Technology</option>
																				<option value="BETChT">BETChT | BET Major in Chemical Technology</option>
																				<option value="BETCT">BETCT | BET Major in Construction Technology</option>
																				<option value="BETET">BETET | BET Major in Electrical Technology</option>
																				<option value="BETEMT">BETEMT | BET Major in Electromechanical Technology</option>
																				<option value="BETElxT">BETElxT | BET Major in Electronics Technology</option>
																				<option value="BETInCT">BETInCT | BET Major in Instrumentation and Control Technology</option>
																				<option value="BETMT">BETMT | BET Major in Mechanical Technology</option>
																				<option value="BETMecT">BETMecT | BET Major in Mechatronics Technology</option>
																				<option value="BETNDTT">BETNDTT | BET Major in Non-Destructive Testing Technology</option>
																				<option value="BETDMT">BETDMT | BET Major in Dies & Moulds Technology</option>
																				<option value="BETHVAC">BETHVAC/RT | BET Major in Heating, Ventilation and Airconditioning/Refrigeration Technology</option>
																				<option value="BSCESEP">BSCESEP | Bachelor of Science in Civil Engineering</option>
																				<option value="BSEESEP">BSEESEP | Bachelor of Science in Electrical Engineering</option>
																				<option value="BSECESEP">BSECESEP | Bachelor of Science in Electronics Engineering</option>
																				<option value="BSMESEP">BSMESEP | Bachelor of Science in Mechanical Engineering</option>
																				<option value="BSIT">BSIT | Bachelor of Science in Information Technology</option>
																				<option value="BSIS">BSIS | Bachelor of Science in Information System</option>
																				<option value="BSESSDP">BSESSDP | Bachelor of Science in Environmental Science</option>
																				<option value="BGTAT">BGTAT | Bachelor in Graphics Technology Major in Architecture Technology</option>
																				<option value="BTVTEdET">BTVTEdET | BTVTE Major in Electrical Technology</option>
																				<option value="BTVTEdLXt">BTVTEdLXt | BTVTE Major in Electronics Technology</option>
																				<option value="BTVTEdICT">BTVTEdICT | BTVTE Major in Information and Communication Technology</option>
																			</select>
																		</div>
																	</div>

																	<div className="form-group row mr-0 ml-0">
																		<label htmlFor="section_field" className="col-sm-2 col-form-label">Section</label>
																		<div className="col-sm-10">
																			<input
																				type="text"
																				id="section_field"
																				className="form-control"
																				name='section'
																				value={section}
																				onChange={(e) => setSection(e.target.value)}
																			/>
																		</div>
																	</div>

																	<hr />
																	<div className="p-4">
																		<button className="button submit-btn" type="submit">Save</button>
																	</div>
																</div>
															</form>
														</div>
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
export default UpdateProfile