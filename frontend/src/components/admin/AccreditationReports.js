import React, { Fragment, useState, useEffect } from 'react'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import '@progress/kendo-theme-default/dist/all.css';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { bookAccreditation, clearErrors } from '../../actions/bookActions'

const AccreditationReports = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, books } = useSelector(state => state.bookAccreditationReports);

    const subjectArr = books.bookSubjects

    const [subjects, setSubjects] = useState([]);

    const nowDate = new Date();
    const formatDate = nowDate.toLocaleString('en-US', {
        dateStyle: 'long'
    })

    const formatTime = nowDate.toLocaleString('en-US', {
        timeStyle: 'short',
        hour12: true,
    })

    useEffect(() => {
        dispatch(bookAccreditation())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const handleCheckedChanged = (sub) => {
        const isChecked = subjects.includes(sub);

        if (!isChecked) {
            setSubjects([...subjects, sub]);
        } else {
            const updatedSubjects = [...subjects].filter(s => s !== sub);
            setSubjects(updatedSubjects);
        }
    }

    const filterHandler = () => {
        console.log(subjects)
        const formData = new FormData();
        // formData.set('subjects', subjects);
        // subjects.forEach(sub => frmData.append('tags[]', tag))
        subjects.forEach(subject =>
            formData.append('subjects', subject)
        )
        dispatch(bookAccreditation(formData))
    }

    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);

    const exportPDFWithMethod = () => {
        let element = container.current || document.body;
      
        Swal.fire({
          title: 'Export PDF',
          text: 'Do you want to export this file in PDF format?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Generating PDF',
              html: 'Please wait while we generate your PDF file...',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
                setTimeout(() => {
                  savePDF(element, {
                    paperSize: "A4",
                    scale: 0.60,
                    margin: 20,
                    fileName: `BOOK ACCREDITATION LIST (${formatDate})`,
                    author: 'TUP-T LRC',
                    landscape: true
                  });
                  Swal.close();
                  Swal.fire({
                    title: 'PDF downloaded',
                    text: 'PDF downloaded successfully!',
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
                }, 2000);
              }
            });
          }
        });
      };

    const _export = React.useRef(null);
    // const excelExport = () => {
    //     save(_export);
    // };
    const excelExport = () => {
        Swal.fire({
          title: 'Export Excel',
          text: 'Do you want to export this file in XLSX format?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Generating Excel',
              html: 'Please wait while we generate your Excel file...',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
                setTimeout(() => {
                  save(_export);
                  Swal.close();
                  Swal.fire({
                    title: 'Excel downloaded',
                    text: 'Excel downloaded successfully!',
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
                }, 2000);
              }
            });
          }
        });
      };

    const save = (component) => {
        const options = component.current.workbookOptions();
        const rows = options.sheets[0].rows;
        const columns = options.sheets[0].columns;
        // let altIdx = 0;
        // rows.forEach((row) => {
        //     if (row.type === "data") {
        //         if (altIdx % 2 !== 0) {
        //             row.cells.forEach((cell) => {
        //                 cell.background = "#aabbcc";
        //             });
        //         }
        //         altIdx++;
        //     }
        // });

        component.current.save(options);
    };

    const rowRender = (trElement, props) => {
        const green = {
          backgroundColor: "#FFFFFF",
        };
        const trProps = {
          style: green,
        };
        return React.cloneElement(
          trElement,
          {
            ...trProps,
          },
          trElement.props.children
        );
      };
    
      
    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> : (
                <div className="dashboard-container">

                    <div className="table-container">
                        <div className='bookaccession-align d-flex align-items-center justify-content-between'>
                        <div className="top-table-elements-start d-flex align-items-center">
                            <div className="book-accession-button btn btn-primary">
                                <Link to="/admin/accessionReport" className='text-white'> <i class="fa-solid fa-arrow-left"></i> Book Accession List</Link>
                            </div>
                        </div>
                        <div className="top-table-elements-end d-flex align-items-center">
                            <div className="book-accession-button btn btn-primary">
                                <Link to="/admin/statisticalReports" className='text-white'> <i class="fa-solid fa-arrow-right"></i> Resources Utilization</Link>
                            </div>
                        </div>
                        </div>
                        <div className="example-config bg-white py-3 px-3">
                            <div className="example-config-align">
                                <h5>Export to:</h5>
                                <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportPDFWithMethod}>
                                    PDF
                                </button>
                                <button
                                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                    onClick={excelExport}
                                >
                                    EXCEL
                                </button>
                            </div>

                        </div>
                        <hr />
                        <div className="row d-flex justify-content-center align-items-center bg-white remove-row py-3 px-3">
                            {subjectArr.map((subject, index) => (
                                <div className="col-2 py-2" key={index}>
                                    <input type="checkbox" id="checkbox" name="checkbox" value={subject} checked={subjects.includes(subject)} onChange={() => handleCheckedChanged(subject)} /> {subject}
                                </div>
                            ))}
                            <button type="button" className="btn btn-primary filter-accreditation" onClick={filterHandler}>
                                Filter
                                <i class="fa-solid fa-filter"></i>
                            </button>
                        </div>
                        <div className="border rounded p-2 bg-white">
                            {/* <ExcelExport data={books.book} ref={_export}> */}
                            <PDFExport ref={pdfExportComponent} paperSize="auto" margin={40} fileName={`Report for ${formatDate}`} author="KendoReact Team">
                                <div ref={container}>
                                    <h3 className="text-center"><strong>TUPT LRC</strong></h3>
                                    <h3 className="text-center"><strong>BOOK ACCREDITATION LIST</strong></h3>
                                    <br />
                                    <h5 className="text-center">{formatDate}</h5>
                                    <h6 className="text-center">printed at {formatTime}</h6>
                                    <br />
                                    <div className='row'>
                                        <div className='col-1'>
                                            <h6>Subjects: </h6>
                                        </div>
                                        <div className='col-11'>
                                            <div className='row'>
                                                {subjects.map((subject, index) => (
                                                    <div className={'col-2'}>
                                                        <div key={index}>
                                                            {/* <input type="checkbox" id="checkbox" name="checkbox" value={subject} checked={subjects.includes(subject)} onChange={() => handleCheckedChanged(subject)} /> {subject} */}
                                                            <h6>{subject}</h6>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="k-hr" />
                                    <Grid style={{
                                        // height: "400px",
                                        overflowY: 'hidden'
                                    }} data={books.book}
                                        resizable={true}
                                        scrollable='none'
                                        rowRender={rowRender}
                                    >
                                        {/* <Column field="accession_numbers.accession_number" title="Accession" width={210} /> */}
                                        <Column field="accession_numbers" title="Accession" />
                                        <Column field="title" title="Title" />
                                        <Column field="main_author" title="Author" />
                                        <Column field="publisher" title="Publisher" />
                                        <Column field="yearPub" title="Year" />
                                        <Column field="subjects" title="Subject(s)" />
                                        <Column field="isbn" title="ISBN" />
                                        <Column field="call_number" title="Call Number" />
                                        <Column field="location" title="Location" />
                                    </Grid>
                                </div>

                            </PDFExport>
                            {/* </ExcelExport> */}
                        </div>
                        <ExcelExport
                            data={books.book}
                            ref={_export}
                            fileName={`BOOK ACCREDITATION LIST (${formatDate})`}
                        >
                            <ExcelExportColumn field="accession_numbers" title="Accession" />
                            <ExcelExportColumn field="title" title="Title" />
                            <ExcelExportColumn field="main_author" title="Author" />
                            <ExcelExportColumn field="publisher" title="Publisher" />
                            <ExcelExportColumn field="yearPub" title="Year" />
                            <ExcelExportColumn field="isbn" title="ISBN" />
                            <ExcelExportColumn field="call_number" title="Call Number" />
                            <ExcelExportColumn field="location" title="Location" />
                        </ExcelExport>

                    </div>
                </div>
            )
            }
        </Fragment>
    )
};
export default AccreditationReports