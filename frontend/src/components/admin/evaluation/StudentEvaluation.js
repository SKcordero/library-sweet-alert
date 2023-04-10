import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import SideNavbarEmpty from '../../layout/SideNavbarEmpty';
import Swal from 'sweetalert2';
import { studentEvaluations, clearErrors } from '../../../actions/evaluationActions'
import { STUDENT_EVALUATION_RESET } from '../../../constants/evaluationConstants'

const StudentEvaluation = () => {

	const [ia, setia] = useState(false)
	// const [dv, setdv] = useState(null)
	const [tr, settr] = useState('')
	const [yl, setyl] = useState('')
	const [course, setcourse] = useState('')
	const [section, setSection] = useState('')
	const [tuptId, setTuptId] = useState('')
	const [gender, setgender] = useState('')
	const [sra, setsra] = useState('')
	const [lav, setlav] = useState('')
	const [clean, setclean] = useState('')
	const [ho, setho] = useState('')
	const [brb, setbrb] = useState('')
	const [opac, setopac] = useState('')
	const [bc, setbc] = useState('')
	const [pc, setpc] = useState('')
	const [tps, settps] = useState('')
	const [er, seter] = useState('')
	const [skaq, setskaq] = useState('')
	const [css, setcss] = useState('')
	const [comments, setcomments] = useState('')

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { loading, student_error, success } = useSelector(state => state.studentEvaluation);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (student_error) {
			alert.error(student_error);
			dispatch(clearErrors())
		}

		if (success) {
			Swal.fire({
                title: 'Evaluation Finished',
                text: 'You have successfully evaluated!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
			navigate('/student/evaluation');
			// alert.success('Evaluation finished');
			dispatch({ type: STUDENT_EVALUATION_RESET })
		}
	}, [dispatch, alert, student_error, success, navigate])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.set('section', section.toUpperCase());
		dispatch(studentEvaluations(formData));
	}

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber)
	}
	const navigateToFormStep = (stepNumber) => {

		document.querySelectorAll(".form-step").forEach((
			formStepElement) => {
			formStepElement.classList.add("d-none");
		});

		document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
			formStepHeader.classList.add("form-stepper-unfinished");
			formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
		});

		document.querySelector("#step-" + stepNumber).classList.remove("d-none");

		const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');

		formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
		formStepCircle.classList.add("form-stepper-active");
		for (let index = 0; index < stepNumber; index++) {

			const formStepCircle = document.querySelector('li[step="' + index + '"]');

			if (formStepCircle) {

				formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
				formStepCircle.classList.add("form-stepper-completed");
			}
		}
	};

	document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {

		formNavigationBtn.addEventListener("click", () => {

			const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));

			navigateToFormStep(stepNumber);
		});
	});


	return (
		<Fragment>
			<MetaData title={'TUPT-T Online Library - Evaluation'} />
			{/* <SideNavbarEmpty /> */}
			{loading ? <Loader /> :
				<Fragment>
					<div className="dashboard-container">
					<div className="btn btn-primary">
                                <Link to="/admin/evaluation" className='text-white'><i class="fa-solid fa-arrow-left"></i>Back</Link>
                            </div>
						<div className="form-container-eval">
							<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data" className='form-evaluation'>
								<div className="form-progress">
									<ul className="form-stepper form-stepper-horizontal text-center">
										<li className="form-stepper-active text-center form-stepper-list" step="1">
											<a className="mx-2">
												<span className="form-stepper-circle">
													<span>1</span>
												</span>
												<div className="label ">
													Directions
												</div>
											</a>
										</li>
										<li className="form-stepper-unfinished text-center form-stepper-list" step="2">
											<a className="mx-2">
												<span className="form-stepper-circle text-muted">
													<span>2</span>
												</span>
												<div className="label text-muted">
													Information
												</div>
											</a>
										</li>
										<li className="form-stepper-unfinished text-center form-stepper-list" step="3">
											<a className="mx-2">
												<span className="form-stepper-circle text-muted">
													<span>3</span>
												</span>
												<div className="label text-muted">
													Evaluation
												</div>
											</a>
										</li>
										<li className="form-stepper-unfinished text-center form-stepper-list" step="4">
											<a className="mx-2">
												<span className="form-stepper-circle text-muted">
													<span>4</span>
												</span>
												<div className="label text-muted">
													Comments and Suggestions
												</div>
											</a>
										</li>
									</ul>
								</div>
								<hr />
								<section id="step-1" className="form-step">
									<h2 className="text-center mt-3">
										Directions Area
									</h2>
									<div className="d-flex align-items-center flex-column justify-content-center">
										<h5 className="text-center text-uppercase py-3">
											Library User's Satisfaction Survey
										</h5>
										<div className='eval-direction text-center'>
											Directions: This questionnaire is intended to improve library services provided by the Technological University of the Philippines-Taguig Campus, Learning Resource Center. Please answer the question truthfully. Rest assured that all data will be treated with outmost confidentiality.
										</div>
										<label className='d-flex align-items-center py-3'>
											<input type="checkbox"
												name='ia'
												value='true'
												id='ia'
												className='mr-2 ia-checkbox'
												onChange={(e) => setia(e.target.value)} />
											I Agree to the Terms and Conditions
										</label>
									</div>
									<hr />
									<div className="p-4">
										<Link to="/dashboard" >
											<button className="button btn-danger">
												Cancel
											</button>
										</Link>
										<button className="button btn-navigate-form-step float-right" type="button" step_number="2">
											Next
										</button>
									</div>
								</section>

								<section id="step-2" className="form-step d-none">
									<div className="mt-3 py-3">
										<div className="form-group row mr-0 ml-0">
											<label htmlFor="tuptId" className="col-sm-1 col-form-label">
												TUPT ID
											</label>
											<div className="col-sm-11">
												<input type="text"
													id="tuptId"
													className="form-control"
													name='tuptId'
													value={tuptId.toUpperCase()}
													placeholder="TUPT-XX-XXXX"
													onChange={(e) => setTuptId(e.target.value)}
													required />
											</div>
										</div>

										<div className="form-group row mr-0 ml-0">
											<label htmlFor="year_level" className="col-sm-1 col-form-label">
												Year Level
											</label>
											<div className="col-sm-11">
												<select
													type="yl"
													id="year_level"
													className="form-control"
													name='yl'
													value={yl}
													onChange={(e) => setyl(e.target.value)}
													placeholder="Year Level">
													<option value="" disabled hidden> Year Level</option>
													<option value="1st Year">1st Year</option>
													<option value="2nd Year">2nd Year</option>
													<option value="3rd Year">3rd Year</option>
													<option value="4th Year">4th Year</option>
												</select>
											</div>
										</div>

										<div className="form-group row mr-0 ml-0">
											<label htmlFor="course_field" className="col-sm-1 col-form-label">
												Course
											</label>
											<div className="col-sm-11">
												<select
													type="course"
													id="course_field"
													className="form-control"
													name='course'
													value={course}
													onChange={(e) => setcourse(e.target.value)}
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
											<label htmlFor="section" className="col-sm-1 col-form-label">
												Section
											</label>
											<div className="col-sm-11">
												<input type="text"
													id="section"
													className="form-control"
													name='section'
													value={section.toLocaleUpperCase()}
													onChange={(e) => setSection(e.target.value)}
													required />
											</div>
										</div>

										<div className="form-group row mr-0 ml-0">
											<label htmlFor="gender" className="col-sm-1 col-form-label">
												Gender
											</label>
											<div className="col-sm-11">
												<select
													type="gender"
													id="gender"
													className="form-control"
													name="gender"
													value={gender}
													onChange={(e) => setgender(e.target.value)}
													placeholder="Select Gender">
													<option value="" disabled hidden> Select Gender</option>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
												</select>
											</div>
										</div>
									</div>
									<hr />
									<div className="p-4">
										<button className="button btn-navigate-form-step" type="button" step_number="1">Prev</button>
										<button className="button btn-navigate-form-step float-right" type="button" step_number="3">Next</button>
									</div>
								</section>

								<section id="step-3" className="form-step d-none">
									<div className="eval">
										<div className="eval-content">
											<div className=" info-rating">
												<span className="eval-rating">Rating</span>
												<div className="rating">
													<span>( 5 - Excellent</span>
													<span>4 - Very Good</span>
													<span>3 - Good</span>
													<span>2 - Poor</span>
													<span>1 - Very Poor )</span>
												</div>
											</div>
											<div className="library-facilities__container">
												<div className="library-header">
													<h4 className="library-facilities">1. Library Facilities</h4>
													<div className="rating-numbers">
														<span>1</span>
														<span>2</span>
														<span>3</span>
														<span>4</span>
														<span>5</span>
													</div>
												</div>
												<div className="library-facilities__form">
													<div className="description">1.1 Study/Reading Area</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="sra" value="1" onChange={e => setsra(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="sra" value="2" onChange={e => setsra(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="sra" value="3" onChange={e => setsra(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="sra" value="4" onChange={e => setsra(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="sra" value="5" onChange={e => setsra(e.target.value)} />
														</label>
													</div>
												</div>

												<div className="library-facilities__form">
													<div className="description">1.2 Lighting & Ventilation</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="lav" value="1" onChange={e => setlav(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="lav" value="2" onChange={e => setlav(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="lav" value="3" onChange={e => setlav(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="lav" value="4" onChange={e => setlav(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="lav" value="5" onChange={e => setlav(e.target.value)} />
														</label>
													</div>
												</div>
												<div className="library-facilities__form">
													<div className="description">1.3 Cleanliness</div>
													<div className="input-wrapper">
														<label className="eval-label">
															<input type="radio" name="clean" value="1" onChange={e => setclean(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="clean" value="2" onChange={e => setclean(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="clean" value="3" onChange={e => setclean(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="clean" value="4" onChange={e => setclean(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="clean" value="5" onChange={e => setclean(e.target.value)} />
														</label>
													</div>
												</div>
											</div>
											<div className="library-facilities__container">
												<div className="library-header">
													<h4 className="library-facilities">2. Library Service</h4>
													<div className="rating-numbers">
														<span>1</span>
														<span>2</span>
														<span>3</span>
														<span>4</span>
														<span>5</span>
													</div>
												</div>
												<div className="library-facilities__form">
													<div className="description">2.1 Hours Open</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="ho" value="1" onChange={e => setho(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="ho" value="2" onChange={e => setho(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="ho" value="3" onChange={e => setho(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="ho" value="4" onChange={e => setho(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="ho" value="5" onChange={e => setho(e.target.value)} />
														</label>
													</div>
												</div>

												<div className="library-facilities__form">
													<div className="description">2.2 Borrowing and Returning of Books</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="brb" value="1" onChange={e => setbrb(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="brb" value="2" onChange={e => setbrb(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="brb" value="3" onChange={e => setbrb(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="brb" value="4" onChange={e => setbrb(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="brb" value="5" onChange={e => setbrb(e.target.value)} />
														</label>
													</div>
												</div>
												<div className="library-facilities__form">
													<div className="description">2.3 Library Management System</div>
													<div className="input-wrapper">
														<label className="eval-label">
															<input type="radio" name="opac" value="1" onChange={e => setopac(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="opac" value="2" onChange={e => setopac(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="opac" value="3" onChange={e => setopac(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="opac" value="4" onChange={e => setopac(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="opac" value="5" onChange={e => setopac(e.target.value)} />
														</label>
													</div>
												</div>
											</div>
											<div className="library-facilities__container">
												<div className="library-header">
													<h4 className="library-facilities">3. Library Collection</h4>
													<div className="rating-numbers">
														<span>1</span>
														<span>2</span>
														<span>3</span>
														<span>4</span>
														<span>5</span>
													</div>
												</div>
												<div className="library-facilities__form">
													<div className="description">Book Collection</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="bc" value="1" onChange={e => setbc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="bc" value="2" onChange={e => setbc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="bc" value="3" onChange={e => setbc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="bc" value="4" onChange={e => setbc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="bc" value="5" onChange={e => setbc(e.target.value)} />
														</label>
													</div>
												</div>

												<div className="library-facilities__form">
													<div className="description">Periodical Collection</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="pc" value="1" onChange={e => setpc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="pc" value="2" onChange={e => setpc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="pc" value="3" onChange={e => setpc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="pc" value="4" onChange={e => setpc(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="pc" value="5" onChange={e => setpc(e.target.value)} />
														</label>
													</div>
												</div>

												<div className="library-facilities__form">
													<div className="description">Thesis/Project Study</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="tps" value="1" onChange={e => settps(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="tps" value="2" onChange={e => settps(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="tps" value="3" onChange={e => settps(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="tps" value="4" onChange={e => settps(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="tps" value="5" onChange={e => settps(e.target.value)} />
														</label>
													</div>
												</div>
												<div className="library-facilities__form">
													<div className="description">Electronic Resources (E-Books)</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="er" value="1" onChange={e => seter(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="er" value="2" onChange={e => seter(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="er" value="3" onChange={e => seter(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="er" value="4" onChange={e => seter(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="er" value="5" onChange={e => seter(e.target.value)} />
														</label>
													</div>
												</div>
											</div>
											<div className="library-facilities__container">
												<div className="library-header">
													<h4 className="library-facilities">4. Library Staff</h4>
													<div className="rating-numbers">
														<span>1</span>
														<span>2</span>
														<span>3</span>
														<span>4</span>
														<span>5</span>
													</div>
												</div>
												<div className="library-facilities__form">
													<div className="description">4.1 Staff Knowledge in answering queries</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="skaq" value="1" onChange={e => setskaq(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="skaq" value="2" onChange={e => setskaq(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="skaq" value="3" onChange={e => setskaq(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="skaq" value="4" onChange={e => setskaq(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="skaq" value="5" onChange={e => setskaq(e.target.value)} />
														</label>
													</div>
												</div>

												<div className="library-facilities__form">
													<div className="description">4.2 Customer Service Skills</div>
													<div className="input-wrapper">
														<label>
															<input type="radio" name="css" value="1" onChange={e => setcss(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="css" value="2" onChange={e => setcss(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="css" value="3" onChange={e => setcss(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="css" value="4" onChange={e => setcss(e.target.value)} />
														</label>
														<label>
															<input type="radio" name="css" value="5" onChange={e => setcss(e.target.value)} />
														</label>
													</div>
												</div>
											</div>

										</div>
										<hr />
										<div className="p-4">
											<button className="button btn-navigate-form-step" type="button" step_number="2">Prev</button>
											<button className="button btn-navigate-form-step float-right" type="button" step_number="4">Next</button>
										</div>
									</div>
								</section>
								<section id="step-4" className="form-step d-none">
									<div className="eval">
										<div className="eval-content">
											<div>Comments and Suggestions  
												<textarea
												name="comments"
												id='comments'
												value={comments}
												onChange={e => setcomments(e.target.value)}
												style={{ resize: 'none', overflow: 'hidden' }}
												/>
											</div>
										</div>
										< hr/>
										<div className="p-4">
											<button className="button btn-navigate-form-step" type="button" step_number="3">Prev</button>
											<button className="button submit-btn float-right" type="submit">Save</button>
										</div>
									</div>
								</section>
							</form>
						</div>
					</div>
				</Fragment>
			}
		</Fragment >


	)

}
export default StudentEvaluation