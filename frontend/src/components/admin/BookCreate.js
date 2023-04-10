import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';

import {
	Chip,
	FormControl,
	Input,
	makeStyles,
} from "@material-ui/core";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './../layout/SideNavbarAdmin'

import { newBooks, clearErrors } from '../../actions/bookActions'
import { NEW_BOOK_RESET } from '../../constants/bookConstants'

const BookCreate = () => {
	const { user } = useSelector(state => state.auth);
	const { loading, error, success,  } = useSelector(state => state.newBook);
	const dateNow = new Date();
	const formattedDate = dateNow.toISOString().slice(0, 10);

	console.log(formattedDate)

	const [imageFiles, setImageFiles] = useState('');
	const [bookImage, setImages] = useState('');
	const [title, setTitle] = useState('')
	const [responsibility, setResponsibility] = useState('')
	const [uniform_title, setUniform_title] = useState('')
	const [parallel_title, setParallel_title] = useState('')
	const [main_author, setMain_author] = useState('')
	const [other_author, setOther_author] = useState('')
	const [contributors, setContributors] = useState('')
	const [corp_author, setCorp_author] = useState('')
	const [placePub, setPlacePub] = useState('')
	const [publisher, setPublisher] = useState('')
	const [yearPub, setYearPub] = useState('')
	const [edition, setEdition] = useState('')
	const [pages, setPages] = useState('')
	const [other_details, setOther_details] = useState('')
	const [dimension, setDimension] = useState('')
	const [acc_materials, setAcc_materials] = useState('')
	const [series, setSeries] = useState('')
	const [gen_notes, setGen_notes] = useState('')
	const [isbn, setIsbn] = useState('')
	const [call_number, setCall_number] = useState('')
	const [entered_by, setEntered_by] = useState(user.name)
	const [updated_by, setUpdated_by] = useState('')
	const [date_entered, setDate_entered] = useState(formattedDate)
	const [date_updated, setDate_updated] = useState('')
	const [copy, setCopy] = useState('')
	const [on_shelf, setOn_shelf] = useState('')
	const [out, setOut] = useState('')
	const [times_out, setTimes_out] = useState('')
	const [content_notes, setContent_notes] = useState('')
	const [abstract, setAbstract] = useState('')
	const [reviews, setReviews] = useState('')
	const [subjects, setSubjects] = useState([])

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();


	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (success) {
			Swal.fire({
                title: 'Book Added',
                text: 'Book created successfully!',
                icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
              });
			navigate('/admin/books');
			// alert.success('Book created successfully');
			dispatch({ type: NEW_BOOK_RESET })
		}

	}, [dispatch, alert, error, success, navigate])

	// console.log(dateNow)
	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		subjects.forEach(subject =>
			formData.append('subjects', subject)
		)
		formData.set('bookImage', bookImage);
		// console.log(e.target)
		dispatch(newBooks(formData));
	};

	const imageHandler = (e) => {
		if (e.target.name === 'bookImage') {

			const reader = new FileReader();

			reader.onload = () => {
				console.log(reader.readyState)
				if (reader.readyState === 2) {
					setImageFiles(reader.result)
					setImages(reader.result)
				}
			}
			// console.log(reader.readyState)
			// console.log(e.target.files)

			reader.readAsDataURL(e.target.files[0])

		}
	}

	const clearImage = (e) => {
		setImageFiles('https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png');
		setImages('https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png');
	};

	const navigateToFormStep = (stepNumber) => {

		document.querySelectorAll(".form-step").forEach((formStepElement) => {
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

	console.log(entered_by)

	return (
		<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
			<SideNavbarAdmin />
			{loading ? <Loader /> : (
				<div className="dashboard-container">
					<div className="form-container mt-0">
						<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data" className="form-book-management">
							<div className="form-progress">
								<ul className="form-stepper form-stepper-horizontal text-center">
									<li className="form-stepper-active text-center form-stepper-list" step="1">
										<a className="mx-2">
											<span className="form-stepper-circle">
												<span>1</span>
											</span>
											<div className="label">Title & Statement <br />Responsibility Area</div>
										</a>
									</li>
									<li className="form-stepper-unfinished text-center form-stepper-list" step="2">
										<a className="mx-2">
											<span className="form-stepper-circle text-muted">
												<span>2</span>
											</span>
											<div className="label text-muted">Published, ISBN, <br /> Description etc.</div>
										</a>
									</li>
									<li className="form-stepper-unfinished text-center form-stepper-list" step="3">
										<a className="mx-2">
											<span className="form-stepper-circle text-muted">
												<span>3</span>
											</span>
											<div className="label text-muted">Local & Other <br /> Information</div>
										</a>
									</li>
									<li className="form-stepper-unfinished text-center form-stepper-list" step="4">
										<a className="mx-2">
											<span className="form-stepper-circle text-muted">
												<span>4</span>
											</span>
											<div className="label text-muted">Abstracts,<br />Contents etc. </div>
										</a>
									</li>
								</ul>
							</div>
							<hr />
							<section id="step-1" className="form-step">
								<div className="mt-3">
									<div className="form-group row d-flex align-items-center">
										<label htmlFor="image_field" className="col-sm-2 col-form-label">Book Image</label>
										<div className="col-3 d-flex align-items-center">
											<input
												type="file"
												id="bookImage"
												name="bookImage"
												accept="image/*"
												onChange={imageHandler}
											/>
										</div>
										<div>
											<img
												src={imageFiles}
												className='preview_images'
												alt='image'
											/>
											<button type="button" class="btn btn-danger ml-5" onClick={clearImage}>Remove Image</button>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="title_field" className="col-sm-2 col-form-label">Title</label>
										<div className="col-10">
											<input
												type="text"
												id="title_field"
												className="form-control"
												name='title'
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="responsibility_field" className="col-sm-2 col-form-label">Responsibility</label>
										<div className="col-10">
											<input
												type="text"
												id="responsibility_field"
												className="form-control"
												name='responsibility'
												value={responsibility}
												onChange={(e) => setResponsibility(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="uniformTitle_field" className="col-sm-2 col-form-label">Uniform Title</label>
										<div className="col-10">
											<input
												type="text"
												id="uniformTitle_field"
												className="form-control"
												name='uniform_title'
												value={uniform_title}
												onChange={(e) => setUniform_title(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="parallelTitle_field" className="col-sm-2 col-form-label">Parallel Title</label>
										<div className="col-10">
											<input
												type="text"
												id="parallelTitle_field"
												className="form-control"
												name='parallel_title'
												value={parallel_title}
												onChange={(e) => setParallel_title(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="mainAuthor_field" className="col-sm-2 col-form-label">Main Author</label>
										<div className="col-10">
											<input
												type="text"
												id="mainAuthor_field"
												className="form-control"
												name='main_author'
												value={main_author}
												onChange={(e) => setMain_author(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="otherAuthor_field" className="col-sm-2 col-form-label">Other Author</label>
										<div className="col-10">
											<input
												type="text"
												id="otherAuthor_field"
												className="form-control"
												name='other_author'
												value={other_author}
												onChange={(e) => setOther_author(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="contributors_field" className="col-sm-2 col-form-label">Contributors</label>
										<div className="col-10">
											<input
												type="text"
												id="contributors_field"
												className="form-control"
												name='contributors'
												value={contributors}
												onChange={(e) => setContributors(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="corpAuthor_field" className="col-sm-2 col-form-label">Corporate Author</label>
										<div className="col-10">
											<input
												type="text"
												id="corpAuthor_field"
												className="form-control"
												name='corp_author'
												value={corp_author}
												onChange={(e) => setCorp_author(e.target.value)}
											/>
										</div>
									</div>
									<hr />
									<div className="p-3">
										<Link to="/admin/books" className="">
											<button className="button btn-danger">Cancel</button>
										</Link>
										<button className="button btn-navigate-form-step float-right" type="button" step_number="2">Next</button>
									</div>
								</div>

							</section>

							<section id="step-2" className="form-step d-none">

								<div className="mt-3">

									<div className="form-group row">
										<label htmlFor="placePub_field" className="col-sm-2 col-form-label">Place of Publication</label>
										<div className="col-10">
											<input
												type="text"
												id="placePub_field"
												className="form-control"
												name='placePub'
												value={placePub}
												onChange={(e) => setPlacePub(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="publisher_field" className="col-sm-2 col-form-label">Publisher</label>
										<div className="col-10">
											<input
												type="text"
												id="publisher_field"
												className="form-control"
												name='publisher'
												value={publisher}
												onChange={(e) => setPublisher(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="yearPub_field" className="col-sm-2 col-form-label">Year of Publication</label>
										<div className="col-sm-4">
											<input
												type="text"
												id="yearPub_field"
												className="form-control"
												name='yearPub'
												value={yearPub}
												onChange={(e) => setYearPub(e.target.value)}
											/>
										</div>

										<label htmlFor="edition_field" className="col-sm-1 col-form-label">Edition</label>
										<div className="col-sm-5">
											<input
												type="text"
												id="edition_field"
												className="form-control"
												name='edition'
												value={edition}
												onChange={(e) => setEdition(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="pages_field" className="col-sm-2 col-form-label">Pages/Extent</label>
										<div className="col-sm-4">
											<input
												type="text"
												id="pages_field"
												className="form-control"
												name='pages'
												value={pages}
												onChange={(e) => setPages(e.target.value)}
											/>
										</div>

										<label htmlFor="otherDetails_field" className="col-sm-2 col-form-label">Other Details</label>
										<div className="col-sm-4">
											<input
												type="text"
												id="otherDetails_field"
												className="form-control"
												name='other_details'
												value={other_details}
												onChange={(e) => setOther_details(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="dimension_field" className="col-sm-2 col-form-label">Dimension</label>
										<div className="col-sm-4">
											<input
												type="text"
												id="dimension_field"
												className="form-control"
												name='dimension'
												value={dimension}
												onChange={(e) => setDimension(e.target.value)}
											/>
										</div>
										<label htmlFor="accMaterials_field" className="col-sm-2 col-form-label">Acc. Materials</label>
										<div className="col-sm-4">
											<input
												type="text"
												id="accMaterials_field"
												className="form-control"
												name='acc_materials'
												value={acc_materials}
												onChange={(e) => setAcc_materials(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="series_field" className="col-sm-2 col-form-label">Series</label>
										<div className="col-10">
											<input
												type="text"
												id="series_field"
												className="form-control"
												name='series'
												value={series}
												onChange={(e) => setSeries(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="genNotes_field" className="col-sm-2 col-form-label">General Notes</label>
										<div className="col-10">
											<input
												type="text"
												id="genNotes_field"
												className="form-control"
												name='gen_notes'
												value={gen_notes}
												onChange={(e) => setGen_notes(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="isbn_field" className="col-sm-2 col-form-label">ISBN</label>
										<div className="col-10">
											<input
												type="text"
												id="isbn_field"
												className="form-control"
												name='isbn'
												value={isbn}
												onChange={(e) => setIsbn(e.target.value)}
											/>
										</div>
									</div>
									<hr />
									<div className="p-4">
										<button className="button btn-navigate-form-step" type="button" step_number="1">Prev</button>
										<button className="button btn-navigate-form-step float-right" type="button" step_number="3">Next</button>
									</div>
								</div>

							</section>
							<section id="step-3" className="form-step d-none">
								<div className="mt-3">
									<div className="form-group row">
										<label htmlFor="callNumber_field" className="col-sm-2 col-form-label">Call Number</label>
										<div className="col-sm-2">
											<select id="callNumberPrefix" name="callNumberPrefix" className="form-control">
												<option value="Fil">FIL</option>
												<option value="Ref">REF</option>
												<option value="Bio">BIO</option>
												<option value="Fic">Fic</option>
												<option value="Res">RES</option>
											</select>
										</div>
										<div className="col-sm-8">
											<input
												type="text"
												id="callNumber"
												className="form-control"
												name='call_number'
												value={call_number}
												onChange={(e) => setCall_number(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="language_field" className="col-sm-2 col-form-label">Language</label>
										<div className="col-10">
											<select id="language_field" name="languange" className="form-control">
												<option value="" disabled selected>Select Book Language...</option>
												<option value="English">English</option>
												<option value="Filipino">Filipino</option>
											</select>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="location_field" className="col-sm-2 col-form-label">Library/Location</label>
										<div className="col-10">
											<select id="location_field" name="location" className="form-control">
												<option value="TUP-T Library">TUP-T Library</option>
											</select>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="enteredBy_field" className="col-sm-2 col-form-label">Entered By</label>
										<div className="col-sm-4">
											<input
												type="text"
												// disabled
												id="enteredBy_field"
												className="form-control"
												name='entered_by'
												value={entered_by}
												readOnly
											/>
										</div>
										<label htmlFor="updatedBy_field" className="col-sm-2 col-form-label">Updated By</label>
										<div className="col-sm-4">
											<input
												type="text"
												id="updatedBy_field"
												disabled
												className="form-control"
												name='updated_by'
												value={updated_by}
												onChange={(e) => setUpdated_by(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="dateEntered_field" className="col-sm-2 col-form-label">Date Entered</label>
										<div className="col-sm-4">
											<input
												type="date"
												id="dateEntered_field"
												className="form-control"
												name='date_entered'
												value={date_entered}
												onChange={(e) => setDate_entered(e.target.value)}
											/>
										</div>
										<label htmlFor="dateUpdated_field" className="col-sm-2 col-form-label">Date Updated</label>
										<div className="col-sm-4">
											<input
												type="date"
												id="dateUpdated_field"
												className="form-control"
												name='date_updated'
												value={date_updated}
												onChange={(e) => setDate_updated(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="copy_field" className="col-sm-2 col-form-label">Copy</label>
										<div className="col-sm-1">
											<input
												type="number"
												id="copy_field"
												className="form-control"
												name='copy'
												// value={copy}
												defaultValue='0'
												onChange={(e) => setCopy(e.target.value)}
											/>
										</div>
										<label htmlFor="timesOut_field" className="col-sm-2 col-form-label">Times Out</label>
										<div className="col-sm-1">
											<input
												type="number"
												id="timesOut_field"
												className="form-control"
												name='times_out'
												// value={times_out}
												defaultValue='0'
												onChange={(e) => setTimes_out(e.target.value)}
											/>
										</div>

										<label htmlFor="out_field" className="col-sm-1 col-form-label">Out</label>
										<div className="col-sm-1">
											<input
												type="number"
												id="out_field"
												className="form-control"
												name='out'
												// value={out}
												defaultValue='0'
												onChange={(e) => setOut(e.target.value)}
											/>
										</div>
										<label htmlFor="onShelf_field" className="col-sm-1 col-form-label">On Shelf</label>
										<div className="col-sm-1">
											<input
												type="number"
												id="onShelf_field"
												className="form-control"
												name='on_shelf'
												// value={on_shelf}
												defaultValue='0'
												onChange={(e) => setOn_shelf(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="subjects_field" className="col-sm-12 col-form-label">Subjects</label>
										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Automative" onChange={e => setSubjects([...subjects, "Automative"])} /> Automative
										</div>
										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Architecture" onChange={e => setSubjects([...subjects, "Architecture"])} /> Architecture
										</div>
										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Biology" onChange={e => setSubjects([...subjects, "Biology"])} /> Biology
										</div>
										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Chemistry" onChange={e => setSubjects([...subjects, "Chemistry"])} /> Chemistry
										</div>
										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Civil" onChange={e => setSubjects([...subjects, "Civil"])} /> Civil
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Computer" onChange={e => setSubjects([...subjects, "Computer"])} /> Computer
										</div>
										{/* <label htmlFor="subject_field" className="col-sm-2 col-form-label"> </label> */}

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Earth Science" onChange={e => setSubjects([...subjects, "Earth Science"])} /> Earth Science
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Economics" onChange={e => setSubjects([...subjects, "Economics"])} /> Economics
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Education" onChange={e => setSubjects([...subjects, "Education"])} /> Education
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Electrical" onChange={e => setSubjects([...subjects, "Electrical"])} /> Electrical
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Electronics" onChange={e => setSubjects([...subjects, "Electronics"])} /> Electronics
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Encyclopedia" onChange={e => setSubjects([...subjects, "Encyclopedia"])} /> Encyclopedia
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="English" onChange={e => setSubjects([...subjects, "English"])} /> English
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Environmental Science" onChange={e => setSubjects([...subjects, "Environmental Science"])} /> Environmental Science
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Fiction" onChange={e => setSubjects([...subjects, "Fiction"])} /> Fiction
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Filipiniana" onChange={e => setSubjects([...subjects, "Filipiniana"])} /> Filipiniana
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="GenRef/Hand-outs" onChange={e => setSubjects([...subjects, "GenRef/Hand-outs"])} /> GenRef/Hand-outs
										</div>
										
										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Instrumentation" onChange={e => setSubjects([...subjects, "Instrumentation"])} /> Instrumentation
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Language" onChange={e => setSubjects([...subjects, "Language"])} /> Language
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Literature" onChange={e => setSubjects([...subjects, "Literature"])} /> Literature
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Management" onChange={e => setSubjects([...subjects, "Management"])} /> Management
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Math" onChange={e => setSubjects([...subjects, "Math"])} /> Math
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Mechanical" onChange={e => setSubjects([...subjects, "Mechanical"])} /> Mechanical
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Philosophy/Psychology" onChange={e => setSubjects([...subjects, "Philosophy/Psychology"])} /> Philosophy/Psychology
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Physics" onChange={e => setSubjects([...subjects, "Physics"])} /> Physics
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Social Sciences" onChange={e => setSubjects([...subjects, "Social Sciences"])} /> Social Sciences
										</div>

										<div className="col-sm-3">
											<input type="checkbox" id="checkbox" name="checkbox" value="Thesis" onChange={e => setSubjects([...subjects, "Thesis"])} /> Thesis
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
								<div className="mt-3">
									<div className="form-group row">
										<label htmlFor="contentNotes_field" className="col-sm-2 col-form-label">Content Notes</label>
										<div className="col-10">
											<textarea

												rows="4" cols="50"
												id="contentNotes_field"
												className="form-control"
												name='content_notes'
												value={content_notes}
												onChange={(e) => setContent_notes(e.target.value)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="abstract_field" className="col-sm-2 col-form-label">Abstract</label>
										<div className="col-10">
											<textarea

												rows="4" cols="50"
												id="abstract_field"
												className="form-control"
												name='abstract'
												value={abstract}
												onChange={(e) => setAbstract(e.target.value)}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="reviews_field" className="col-sm-2 col-form-label">Reviews</label>
										<div className="col-10">
											<textarea

												rows="4" cols="50"
												id="reviews_field"
												className="form-control"
												name='reviews'
												value={reviews}
												onChange={(e) => setReviews(e.target.value)}
											/>
										</div>
									</div>
									<hr />
									<div className="p-4">
										<button className="button btn-navigate-form-step" type="button" step_number="3">Prev</button>
										<button className="button submit-btn float-right" type="submit">Save</button>
									</div>
								</div>

							</section>
						</form>
					</div>
				</div>
			)}
		</Fragment >
	)
}

export default BookCreate