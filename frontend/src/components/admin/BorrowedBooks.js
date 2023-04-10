import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import dateFormat from 'dateformat';
import DatePicker from 'react-datepicker';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { RETURN_BOOK_RESET, DECLINE_BOOK_RESET, UPDATE_DUE_DATE_RESET, ACCESSION_BORROWED_RESET } from '../../constants/personnelConstants'
import { allBorrowed, returnBook, declineBook, updateDueDate, borrowedAcc, clearErrors } from '../../actions/personnelActions'

const BorrowedBooks = () => {

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { loading, error, borrowedbooks } = useSelector(state => state.allBorrowed);
	const { isReturned } = useSelector(state => state.returnBook)
	const { isDecline } = useSelector(state => state.declineBook)
	const { isChange, getDueDate } = useSelector(state => state.changeDueDate)
	const { borrowedAccession } = useSelector(state => state.borrowedBookAccession)

	const defaultMaterialTheme = createTheme({});

	useEffect(() => {
		dispatch(allBorrowed());
		// dispatch(allReturned());

		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (isReturned) {
			// alert.success('Book returned');
			Swal.fire({
				title: 'Book Returned',
				text: 'Book has been returned!',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
			});
			navigate('/books/borrowed');
			dispatch({ type: RETURN_BOOK_RESET })
		}

		if (isDecline) {
			// alert.success('Book declined');
			Swal.fire({
				title: 'Appointment Declined',
				text: 'Appointment has been declined!',
				icon: 'error',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
			});
			navigate('/books/borrowed');
			dispatch({ type: DECLINE_BOOK_RESET })
		}

		if (isChange) {
			// alert.success('Borrow details changed');
			Swal.fire({
				title: 'Appointment Changed',
				text: 'Appointment has been changed!',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
			});
			navigate('/books/borrowed');
			dispatch({ type: UPDATE_DUE_DATE_RESET })
		}

		if (borrowedAccession) {
			// alert.success('Accession Updated');
			Swal.fire({
				title: 'Accession Updated',
				text: 'Accession has been updated!',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
				showConfirmButton: false,
			});
			navigate('/books/borrowed');
			dispatch({ type: ACCESSION_BORROWED_RESET })
		}

	}, [dispatch, alert, error, navigate, isReturned, isDecline, isChange, borrowedAccession])

	const [dueDate, setDueDate] = useState(new Date());//setdate is not working
	const isWeekday = (date) => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const [reason, setReason] = useState('')

	const returnedHandler = (id, status) => {
		// if (status==='Unpaid'){
		// 	alert.error('This student has pending penalty');
		// } else {
		// 	dispatch(returnBook(id))
		// }

		Swal.fire({
			title: 'Return Book',
			text: 'This is a confirmation that the book has been returned, Continue?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Continue',
			cancelButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				//   dispatch(deletePersonnel(id))
				if (status === 'Unpaid') {
					alert.error('This student has pending penalty');
				} else {
					dispatch(returnBook(id))
				}
			}
		});
	}

	console.log(borrowedbooks)


	const accessionHandler = (id) => {
		const form = document.createElement('form');
		const inputField = document.createElement('div');

		const book = borrowedbooks.find((book) => book.bookId.some((book_detail) => book_detail._id === id));
		const accessionNumbers = book.bookId.find((book_detail) => book_detail._id === id)?.accession_numbers.flat();

		const inputFieldComponent = (
			<div>
				{accessionNumbers && accessionNumbers.length ? (
					accessionNumbers.map((accNumber) => (
						<div key={accNumber._id} style={{ paddingBottom: '10px' }}>
							<strong style={{ display: 'inline-block', paddingRight: '20px' }}><h4>{accNumber.accession_number}</h4></strong>
							{book.accessions.includes(accNumber._id) ? (
								<div style={{ display: 'inline-block' }}>
									<button
										type="button"
										className="btn btn-danger"
										onClick={() => retrieveAccessionHandler(book.userId._id, accNumber._id)}
									>
										Retrieve <i class="fa-solid fa-right-to-bracket fa-rotate-180"></i>
									</button>
									<hr />
								</div>
							) : (
								<div style={{ display: 'inline-block' }}>
									<button
										type="button"
										className="btn btn-success"
										onClick={() => giveAccessionHandler(book.userId._id, accNumber._id)}
									>
										Give <i className="fa fa-arrow-right-to-bracket"></i>
									</button>
								</div>
							)}
						</div>
					))
				) : (
					<div>
						<p>no accesions</p>
					</div>
				)}
			</div>
		);

		ReactDOM.render(inputFieldComponent, inputField);

		form.innerHTML = `
		  <form>
			<div>
			  <div id="inputField_container"></div>
			</div>
		  </form>
		`;

		const inputFieldContainer = form.querySelector('#inputField_container');
		inputFieldContainer.appendChild(inputField);

		Swal.fire({
			title: 'Add Accession',
			html: form,
			showCancelButton: true,
			showConfirmButton: false,
			cancelButtonText: 'Cancel',
			cancelButtonColor: '#3085d6',
		});
	};



	const declineHandler = (id) => {
		// dispatch(declineBook(id))
		Swal.fire({
			title: 'Decline Appointment',
			text: 'Are you sure you want to decline this appointment?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Decline',
			cancelButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(declineBook(id))
			}
		});
	}

	const updateHandler = (id) => {
		let datepicker
		Swal.fire({
			title: "Edit Borrow Information",
			input: 'text',
			// html: form,
			text: 'Enter Due Date:',
			// inputValue: new Date().toISOString(),
			stopKeydownPropagation: false,
			showCancelButton: true,
			confirmButtonText: "Next",
			cancelButtonText: "Cancel",
			focusConfirm: false,
			preConfirm: () => {
				const selectedDate = datepicker.getDate();
				const selectedDay = selectedDate.getDay();
				if (selectedDay === 0 || selectedDay === 6) {
					Swal.showValidationMessage(`Weekends are unavailable`)
				}
				return selectedDate;
			},
			didOpen: () => {
				const pickerOptions = {
					field: Swal.getInput(),
					minDate: new Date(),
					disableWeekends: true,
					onSelect: () => {
						datepicker.hide();
					},
				};
				datepicker = new Pikaday(pickerOptions);
				setTimeout(() => datepicker.show(), 400);
			},
			didClose: () => {
				datepicker.destroy()
			},
		}).then((dateResult) => {
			// console.log(result.value)
			if (dateResult.isConfirmed) {
				Swal.fire({
					title: "Edit Borrow Information",
					input: 'textarea',
					text: 'Reason for changing:',
					// inputPlaceholder: 'Accession Number',
					showCancelButton: true,
					confirmButtonText: 'update',
					cancelButtonText: 'Cancel',
					inputValidator: (value) => {
						if (!value) {
							return 'Please enter a reason';
						}
					},
				}).then((reasonResult) => {
					if (reasonResult.isConfirmed) {
						const userForm = new FormData();
                        userForm.set('borrowId', id);
                        userForm.set('dueDate', dateResult.value);
                        userForm.set('reason', reasonResult.value);
						dispatch(updateDueDate(userForm))
					}
				})
			}
		})
	};
	const giveAccessionHandler = (userId, accessionId) => {

		Swal.fire({
			title: 'Give Book Accession',
			text: 'Are you sure you want to give this book accession to the user?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Give',
			cancelButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = new FormData();
				formData.set('accessionId', accessionId);
				formData.set('userId', userId);
				formData.set('func', 'give');

				dispatch(borrowedAcc(formData));
			}
		});
	}
	const retrieveAccessionHandler = (userId, accessionId) => {

		Swal.fire({
			title: 'Retrieve Book Accession',
			text: 'Are you sure you want to retrieve this book accession from the user?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Retrieve',
			cancelButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				const formData = new FormData();
				formData.set('accessionId', accessionId);
				formData.set('userId', userId);
				formData.set('func', 'retrieve');
				dispatch(borrowedAcc(formData));
			}
		});
	}

	// console.log(borrowedbooks)
	const col = [
		{
			title: 'TUPT-ID',
			field: 'userId.id_number',
			render: rowData => (
				<Fragment>
					<div><p>{rowData.userId.id_number}</p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		{
			title: 'Name',
			field: 'userId.name',
			render: rowData => (
				<Fragment>
					<div><p><Link to={`/detail/student/${rowData.userId._id}`}>{rowData.userId.name} </Link></p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		// {
		// 	title: 'E-mail',
		// 	field: 'userId.email',
		// 	searchable: false,
		// 	render: rowData => (
		// 		<Fragment>
		// 			<div><p>{rowData.userId.email}</p></div>
		// 		</Fragment>
		// 	),
		// 	cellStyle: {
		// 		textAlign: "left",
		// 	},
		// },
		// {
		// 	title: 'Contact',
		// 	field: 'userId.contact',
		// 	width: '10%',
		// 	searchable: false,
		// 	render: rowData => (
		// 		<Fragment>
		// 			<div><p>{rowData.userId.contact}</p></div>
		// 		</Fragment>
		// 	),
		// },
		{
			title: 'Book(s)',
			field: 'bookId.title',
			searchable: false,
			render: rowData => (
				rowData.bookId.map((item, index) => (
					<Fragment>
						<div>
							<ul>
								<li>
									<p><Link to={`/admin/single/book/${item._id}`}>{item.title} </Link></p>
								</li>
							</ul>
						</div>
					</Fragment>
				))
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		{
			title: 'Appointment',
			field: 'borrower_appointment',
			// width: '20%',
			render: rowData => (
				<Fragment>
					<div><p>{dateFormat(rowData.appointmentDate, "mmmm dd, yyyy")}</p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left"
			}
		},
		{
			title: 'Due Date',
			field: 'borrower_dueDate',
			// width: '20%',
			render: rowData => (
				<Fragment>
					<div><p>{dateFormat(rowData.dueDate, "mmmm dd, yyyy")}</p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left"
			}
		},

		{
			title: 'Accessions',
			field: 'bookId.accession_numbers',
			render: rowData => (
				rowData.bookId.map((accession_item, index) => (
					<Fragment>
						<div style={{ paddingBottom: '10px' }}>
							<button className="btn btn-primary py-1 px-2 ml-2" onClick={() => accessionHandler(accession_item._id)}>
								Add Accession
							</button>
						</div >
					</Fragment>
				))
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		{
			title: 'Actions',
			field: '_id',
			render: rowData => (
				<Fragment>
					<div className="dropleft show text-center">
						<a className="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fa-solid fa-ellipsis-vertical"></i>
						</a>
						<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<div className="d-flex flex-column">
								<Tooltip title="Return">
									<button type="button" className="btn" onClick={() => returnedHandler(rowData._id, rowData.penalties.status)}>
										Returned
									</button>
								</Tooltip>

								<Tooltip title="Edit">
									<button className="btn" onClick={() => updateHandler(rowData._id)}>
										Edit
									</button>
								</Tooltip>

								<Tooltip title="Decline">
									<button className="btn" onClick={() => declineHandler(rowData._id)}>
										Decline
									</button>
								</Tooltip>
							</div>
						</div>
					</div>
				</Fragment>
			),
			searchable: false,
			cellStyle: {
				textAlign: "left",
			},
			headerStyle: {
				textAlign: 'center'
			}
		},
	]

	return (
		<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
			<SideNavbarAdmin />
			{loading || loading === undefined ? <Loader /> : (
				<div className="dashboard-container">
					<div className="table-container">
						<span className='btn btn-primary my-3'>
							<Link to='/returned/books' className='text-white'>Returned Books <i className='fa-solid fa-arrow-right'></i></Link>
						</span>
						{loading ? <Loader /> : (
							<ThemeProvider theme={defaultMaterialTheme}>
								<MaterialTable
									title='Borrowed Books List'
									data={borrowedbooks}
									columns={col}
									localization={
										{
											toolbar: {
												searchPlaceholder: 'ID, Name...'
											}
										}
									}
									options={{
										pageSize: 10,
										headerStyle: {
											fontSize: 16,
											fontWeight: 'bold',
											backgroundColor: '#BA0202',
											color: '#ffffff',
										},
										rowStyle: {
											fontSize: 15,
											backgroundColor: '#F9F5F5',
										},
										emptyRowsWhenPaging: false
									}}
								/>
							</ThemeProvider>
						)}
					</div>
				</div>
			)}
		</Fragment>
	)
}
export default BorrowedBooks