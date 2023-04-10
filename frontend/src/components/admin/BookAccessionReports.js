import React, { Fragment, useState, useEffect, useRef } from 'react'
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
import { bookReports, clearErrors } from '../../actions/bookActions'

const BookAccessionReports = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, books } = useSelector(state => state.getbookReports);
    // const [subjectFilter, setSubjectFilter] = useState('');
    const [subjectFilter] = useState('');
    const nowDate = new Date();
    const formatDate = nowDate.toLocaleString('en-US', {
        dateStyle: 'long'
    })

    const formatTime = nowDate.toLocaleString('en-US', {
        timeStyle: 'short',
        hour12: true,
    })

    useEffect(() => {
        dispatch(bookReports(subjectFilter))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, subjectFilter])

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
                    fileName: `BOOK ACCESSION LIST (${formatDate})`,
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

    const _export = React.useRef(null);
    // const excelExport = () => {
    //     save(_export);
    // };

    const save = (component) => {
        const options = component.current.workbookOptions();
        const rows = options.sheets[0].rows;
        const columns = options.sheets[0].columns;
        component.current.save(options);
    };

    const bookTitle = [];
    // const bookArr = books.book
    // bookArr.forEach((e, index )=> {
    //     bookTitle.push(e.title)
    // });
    if (books.book != null || books.book != undefined) {
        const bookArr = books.book
        // console.log(bookArr)

        bookArr.forEach((e, index) => {
            bookTitle.push(e)
        });
    }

    // console.log(bookArr)
    console.log(bookTitle)

    console.log(books.book)
    
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
                        <div className="top-table-elements-end d-flex align-items-center">
                            <div className="accreditation-button btn btn-primary">
                                <Link to="/admin/accreditationReport" className='text-white'>Accreditation List <i class="fa-solid fa-arrow-right"></i></Link>
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
                        <div className="rounded p-2 bg-white">
                            {/* <ExcelExport data={books.book} ref={_export}> */}
                            <PDFExport ref={pdfExportComponent} paperSize="auto" margin={40} fileName={`Report for ${formatDate}`} author="KendoReact Team">
                                <div ref={container}>
                                    <h3 className="text-center"><strong>TUPT LRC</strong></h3>
                                    <h3 className="text-center"><strong>BOOK ACCESSION LIST</strong></h3>
                                    <br />
                                    <h5 className="text-center">{formatDate}</h5>
                                    <h6 className="text-center">printed at {formatTime}</h6>
                                    <hr className="k-hr" />
                                    <Grid style={{
                                        // height: "400px",
                                        backgroundColor: 'white',
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
                            fileName={`BOOK ACCESSION LIST (${formatDate})`}
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
export default BookAccessionReports