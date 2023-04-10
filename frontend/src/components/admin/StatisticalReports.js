import React, { Fragment, useState, useEffect, useRef } from 'react'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { downloadExcel, ExportToExcel  } from 'react-export-table-to-excel';
import '@progress/kendo-theme-default/dist/all.css';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { statisticalReports, clearErrors } from '../../actions/bookActions'

const StatisticalReports = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, books } = useSelector(state => state.bookStatisticalReports);
    // const [subjectFilter, setSubjectFilter] = useState('');
    const [subjectFilter] = useState('');
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', {
        // dateStyle: 'long',
        month: 'long',
        year: 'numeric'
    })
    const formatTime = nowDate.toLocaleString('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
        hour12: true,
    })

    const [userCourses, setUserCourses] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [dateRange_value, setDateRange_value] = useState([startDate, endDate]);

    const courseAvgDay = isNaN(books.roundedNum) ? '0' : books.roundedNum;
    const courseSubjDay = isNaN(books.roundedSubj) ? '0' : books.roundedSubj;

    // Number of Courses that borrowed
    let BETATCount = 0;
    let BETChTCount = 0;
    let BETCTCount = 0;
    let BETETCount = 0;
    let BETEMTCount = 0;
    let BETElxTCount = 0;
    let BETInCTCount = 0;
    let BETMTCount = 0;
    let BETMecTCount = 0;
    let BETNDTTCount = 0;
    let BETDMTCount = 0;
    let BETHVACCount = 0;
    let BSCESEPCount = 0;
    let BSEESEPCount = 0;
    let BSECESEPCount = 0;
    let BSMESEPCount = 0;
    let BSITCount = 0;
    let BSISCount = 0;
    let BSESSDPCount = 0;
    let BGTATCount = 0;
    let BTVTEdETCount = 0;
    let BTVTEdLXtCount = 0;
    let BTVTEdICTCount = 0;
    let FacultyCount = 0;

    if (books.userCourse === undefined || books.userCourse.length === 0) {
        console.log("no course", books.userCourse)
    } else {
        console.log("have course", books.userCourse)
        for (let i = 0; i < books.userCourse.length; i++) {
            const course = books.userCourse[i]._id;
            // console.log(books.userCourse[i]._id)
            console.log(course)
            {
                course === 'BETAT' ?
                    (BETATCount = books.userCourse[i].count) :
                course === 'BETChT' ?
                    (BETChTCount = books.userCourse[i].count) :
                course === 'BETCT' ?
                    (BETCTCount = books.userCourse[i].count) :
                course === 'BETET' ?
                    (BETETCount = books.userCourse[i].count) :
                course === 'BETEMT' ?
                    (BETEMTCount = books.userCourse[i].count) :
                course === 'BETElxT' ?
                    (BETElxTCount = books.userCourse[i].count) :
                course === 'BETInCT' ?
                    (BETInCTCount = books.userCourse[i].count) :
                course === 'BETMT' ?
                    (BETMTCount = books.userCourse[i].count) :
                course === 'BETMecT' ?
                    (BETMecTCount = books.userCourse[i].count) :
                course === 'BETNDTT' ?
                    (BETNDTTCount = books.userCourse[i].count) :
                course === 'BETDMT' ?
                    (BETDMTCount = books.userCourse[i].count) :
                course === 'BETHVAC' ?
                    (BETHVACCount = books.userCourse[i].count) :
                course === 'BSCESEP' ?
                    (BSCESEPCount = books.userCourse[i].count) :
                course === 'BSEESEP' ?
                    (BSEESEPCount = books.userCourse[i].count) :
                course === 'BSECESEP' ?
                    (BSECESEPCount = books.userCourse[i].count) :
                course === 'BSMESEP' ?
                    (BSMESEPCount = books.userCourse[i].count) :
                course === 'BSIT' ?
                    (BSITCount = books.userCourse[i].count) :
                course === 'BSIS' ?
                    (BSISCount = books.userCourse[i].count) :
                course === 'BSESSDP' ?
                    (BSESSDPCount = books.userCourse[i].count) :
                course === 'BGTAT' ?
                    (BGTATCount = books.userCourse[i].count) :
                course === 'BTVTEdET' ?
                    (BTVTEdETCount = books.userCourse[i].count) :
                course === 'BTVTEdLXt' ?
                    (BTVTEdLXtCount = books.userCourse[i].count) :
                course === 'BTVTEdICT' ?
                    (BTVTEdICTCount = books.userCourse[i].count) :
                course === 'Faculty' ?
                    (FacultyCount = books.userCourse[i].count) :
                    BSITCount = 0
            }
        }
    }

     // Number of Subjects that were borrowed
     let AutomotiveCount = 0;
     let ArchitectureCount = 0;
     let BiologyCount = 0;
     let ChemistryCount = 0;
     let CivilCount = 0;
     let ComputerCount = 0;
     let EarthScienceCount = 0;
     let EconomicsCount = 0;
     let EducationCount = 0;
     let ElectricalCount = 0;
     let ElectronicsCount = 0;
     let EncyclopediaCount = 0;
     let EnglishCount = 0;
     let EnvironmentalScienceCount = 0;
     let FictionCount = 0;
     let FilipinianaCount = 0;
     let GenRefHandoutsCount = 0;
     let InstrumentationCount = 0;
     let LanguageCount = 0;
     let LiteratureCount = 0;
     let ManagementCount = 0;
     let MathCount = 0;
     let MechanicalCount = 0;
     let PhilosophyPsychologyCount = 0;
     let PhysicsCount = 0;
     let SocialSciencesCount = 0;
     let ThesisCount = 0;

    if (books.bookSubjects === undefined || books.bookSubjects.length === 0) {
        console.log("no subjects", books.bookSubjects)
    } else {
        console.log("have subjects", books.bookSubjects)
        for (let i = 0; i < books.bookSubjects.length; i++) {
            const subjects = books.bookSubjects[i]._id;
            // console.log(books.userCourse[i]._id)
            console.log(subjects)
            {
                subjects === 'Automative' ?
                    (AutomotiveCount = books.bookSubjects[i].count) :
                subjects === 'Architecture' ?
                    (ArchitectureCount = books.bookSubjects[i].count) :
                subjects === 'Biology' ?
                    (BiologyCount = books.bookSubjects[i].count) :
                subjects === 'Chemistry' ?
                    (ChemistryCount = books.bookSubjects[i].count) :
                subjects === 'Civil' ?
                    (CivilCount = books.bookSubjects[i].count) :
                subjects === 'Computer' ?
                    (ComputerCount = books.bookSubjects[i].count) :
                subjects === 'Earth Science' ?
                    (EarthScienceCount = books.bookSubjects[i].count) :
                subjects === 'Economics' ?
                    (EconomicsCount = books.bookSubjects[i].count) :
                subjects === 'Education' ?
                    (EducationCount = books.bookSubjects[i].count) :
                subjects === 'Electrical' ?
                    (ElectricalCount = books.bookSubjects[i].count) :
                subjects === 'Electronics' ?
                    (ElectronicsCount = books.bookSubjects[i].count) :
                subjects === 'Encyclopedia' ?
                    (EncyclopediaCount = books.bookSubjects[i].count) :
                subjects === 'English' ?
                    (EnglishCount = books.bookSubjects[i].count) :
                subjects === 'Environmental Science' ?
                    (EnvironmentalScienceCount = books.bookSubjects[i].count) :
                subjects === 'Fiction' ?
                    (FictionCount = books.bookSubjects[i].count) :
                subjects === 'Filipiniana' ?
                    (FilipinianaCount = books.bookSubjects[i].count) :
                subjects === 'GenRef/Hand-outs' ?
                    (GenRefHandoutsCount = books.bookSubjects[i].count) :
                subjects === 'Instrumentation' ?
                    (InstrumentationCount = books.bookSubjects[i].count) :
                subjects === 'Language' ?
                    (LanguageCount = books.bookSubjects[i].count) :
                subjects === 'Literature' ?
                    (LiteratureCount = books.bookSubjects[i].count) :
                subjects === 'Management' ?
                    (ManagementCount = books.bookSubjects[i].count) :
                subjects === 'Math' ?
                    (MathCount = books.bookSubjects[i].count) :
                subjects === 'Mechanical' ?
                    (MechanicalCount = books.bookSubjects[i].count) :
                subjects === 'Philosophy/Psychology' ?
                    (PhilosophyPsychologyCount = books.bookSubjects[i].count) :
                subjects === 'Physics' ?
                    (PhysicsCount = books.bookSubjects[i].count) :
                subjects === 'Social Sciences' ?
                    (SocialSciencesCount = books.bookSubjects[i].count) :
                subjects === 'Thesis' ?
                    (ThesisCount = books.bookSubjects[i].count) :
                    AutomotiveCount = 0
            }
        }
    }
    
    const header = ["COURSE", "NO. OF CLIENTS SERVED", "AREAS OF RESEARCH", "NO. OF USED MATERIALS", "AVG CLIENTS/DAY", "AVG USED MATERIALS/DAY"];
    const body = [
        ["Bachelor of Engineering Technology (BET) Courses", "", "", "", books.roundedNum, books.roundedSubj],
        ["BET-Automotive", BETATCount, "Automative", AutomotiveCount],
        ["BET-Chemical", BETChTCount, "Architecture", ArchitectureCount],
        ["BET-Construction", BETCTCount, "Biology", BiologyCount],
        ["BET-Electrical", BETETCount, "Chemistry", ChemistryCount],
        ["BET-Electromechanical", BETEMTCount, "Civil", CivilCount],
        ["BET-Electronics", BETElxTCount, "Computer", ComputerCount],
        ["BET-Instrumentation and Control", BETInCTCount, "Earth Science", EarthScienceCount],
        ["BET-Mechanical", BETMTCount, "Economics", EconomicsCount],
        ["BET-Mechatronics", BETMecTCount, "Education", EducationCount],
        ["BET-Non-Destructive Testing", BETNDTTCount, "Electrical", ElectricalCount],
        ["BET-Dies & Moulds", BETDMTCount, "Electronics", ElectronicsCount],
        ["BET-Heating, Ventilation and Airconditioning/Refrigeration", BETHVACCount, "Encyclopedia", EncyclopediaCount],
        ["Engineering Courses", "", "English", EnglishCount],
        ["BS-Civil Engineering", BSCESEPCount, "Environmental Science", EnvironmentalScienceCount],
        ["BS-Electrical Engineering", BSEESEPCount, "Fiction", FictionCount],
        ["BS-Electronics Engineering", BSECESEPCount, "Filipiniana", FilipinianaCount],
        ["BS-Mechanical Engineering", BSMESEPCount, "GenRef/Hand-outs", GenRefHandoutsCount],
        ["Other Science Courses", "", "Instrumentation", InstrumentationCount],
        ["BS-Information Technology", BSITCount, "Language", LanguageCount],
        ["BS-Information System", BSISCount, "Literature", LiteratureCount],
        ["BS-Environmental Science", BSESSDPCount, "Management", ManagementCount],
        ["Other Bachelor's Degree Courses", "", "Math", MathCount],
        ["BGT-Architecture", BGTATCount, "Mechanical", MechanicalCount],
        ["BTVTE-Electrical", BTVTEdETCount, "Philosophy/Psychology", PhilosophyPsychologyCount],
        ["BTVTE-Electronics", BTVTEdLXtCount, "Physics", PhysicsCount],
        ["BTVTE-ICT", BTVTEdICTCount, "Social Sciences", SocialSciencesCount],
        ["Faculty", FacultyCount, "Thesis", ThesisCount],
        ["TOTAL", books.courseCount, "TOTAL", books.subjectCount],
    ];


    useEffect(() => {
        dispatch(statisticalReports())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, dateRange_value])

    const filterdateRange = (e) => {
        console.log(startDate, endDate)
        const formData = new FormData();
        formData.set('min_date', startDate)
        formData.set('max_date', endDate)

        dispatch(statisticalReports(formData))
        // dispatch(allBooks(new_yearValue));
    };

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
                    fileName: `RESOURCES UTILIZATION STAT REPORT | ` + formatDate,
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
                downloadExcel({
                    fileName: "RESOURCES UTILIZATION STAT REPORT | " + formatDate,
                    sheet: "resources utilization",
                    tablePayload: {
                        header,
                        // accept two different data structures
                        body: body,
                    },
                });
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

    console.log(books.userCourses)
    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> : (
                <div className="dashboard-container">
                    <div className="table-container">
                        <div className="top-table-elements-end d-flex align-items-center">
                            <div className="book-accession-button btn btn-primary">
                                <Link to="/admin/accreditationReport" className='text-white'> <i class="fa-solid fa-arrow-left"></i> Book Accreditation List</Link>
                            </div>
                        </div>
                        <div className="example-config bg-white py-3 px-3">
                            <div className="example-config-align">
                                <h5>Export to:</h5>
                                <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={exportPDFWithMethod}>
                                    PDF
                                </button>

                                <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={excelExport}>EXCEL</button>
                    
                            </div>

                            <input
                                type="Date"
                                id="start_field"
                                className="form-control"
                                name='startDate'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />

                            <span style={{ paddingTop: '1em' }}>&#8212;</span>

                            <input
                                type="Date"
                                id="end_field"
                                className="form-control"
                                name='endDate'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />

                            {/* <TextField id="yearEnd" label="End  Year" value={endDate} onChange={(e) => setEndDate(e.target.value)} variant="outlined"/> */}

                            <button type="button" className="btn btn-primary" onClick={filterdateRange}>Filter  <i class="fa-solid fa-filter"></i></button>
                        </div>

                        <hr />
                        <div className="rounded p-2 bg-white">
                            {/* <ExcelExport data={books.book} ref={_export}> */}
                            <PDFExport ref={pdfExportComponent} paperSize="auto" margin={40} fileName={`Report for ${formatDate}`} author="KendoReact Team">
                                <div ref={container}>

                                    <div className="grid-container" style={{ padding: '30px 0' }}>
                                        <div className="grid-item">
                                            <div className="row" style={{ justifyContent: 'center', paddingBottom: '5px' }}>
                                                <img src='../images/TUPT-Logo.png' style={{ height: '75px', width: '10%' }}></img>
                                                <h4 style={{ color: 'red', alignSelf: 'center' }}><strong>TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES<br /> TAGUIG CITY</strong></h4 >
                                            </div>
                                            <p>
                                                The Technological University of the Philippines shall be the premiere state<br /> university and the model of excellence in technology education in the country<br /> in a knowledge-based economy of the 21st century.
                                            </p>
                                        </div>
                                        <div className="grid-item" style={{ justifyContent: 'center' }}>
                                            <h1 style={{ fontSize: '50px' }}><strong>UTILIZATION OF <br />RESOURCES</strong></h1>
                                        </div>
                                    </div>

                                    <h3 className="text-center" style={{ fontSize: '25px', paddingBottom: '20px' }}><strong>STATISTICAL REPORT ON THE UTILIZATION OF LRC RESOURCES BY<br /> PROGRAM - {formatDate}</strong></h3>
                                    <h6 className="text-center">printed at {formatTime}</h6>
                                    {/* <br /> */}
                                    <hr className="k-hr" />
                                    <table className="table table-bordered table-hover">
                                        {/* <thead className="thead-dark"> */}
                                            <tr className="thead-dark">
                                                <th>COURSE</th>
                                                <th>NO. OF CLIENTS SERVED</th>
                                                <th>AREAS OF RESEARCH</th>
                                                <th>NO. OF USED MATERIALS</th>
                                            </tr>
                                        {/* </thead> */}
                                        <tbody>

                                            <tr>
                                                <th scope="row">Bachelor of Engineering Technology (BET) Courses</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td>BET-Automotive</td>
                                                <td>{BETATCount}</td>
                                                <td>Automative</td>
                                                <td>{AutomotiveCount}</td>
                                            </tr>


                                            <tr>
                                                <td>BET-Chemical</td>
                                                <td>{BETChTCount}</td>
                                                <td>Architecture</td>
                                                <td>{ArchitectureCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Construction</td>
                                                <td>{BETCTCount}</td>
                                                <td>Biology</td>
                                                <td>{BiologyCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Electrical</td>
                                                <td>{BETETCount}</td>
                                                <td>Chemistry</td>
                                                <td>{ChemistryCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Electromechanical</td>
                                                <td>{BETEMTCount}</td>
                                                <td>Civil</td>
                                                <td>{CivilCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Electronics</td>
                                                <td>{BETElxTCount}</td>
                                                <td>Computer</td>
                                                <td>{ComputerCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Instrumentation and Control</td>
                                                <td>{BETInCTCount}</td>
                                                <td>Earth Science</td>
                                                <td>{EarthScienceCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Mechanical</td>
                                                <td>{BETMTCount}</td>
                                                <td>Economics</td>
                                                <td>{EconomicsCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Mechatronics</td>
                                                <td>{BETMecTCount}</td>
                                                <td>Education</td>
                                                <td>{EducationCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Non-Destructive Testing</td>
                                                <td>{BETNDTTCount}</td>
                                                <td>Electrical</td>
                                                <td>{ElectricalCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Dies & Moulds</td>
                                                <td>{BETDMTCount}</td>
                                                <td>Electronics</td>
                                                <td>{ElectronicsCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BET-Heating, Ventilation and Airconditioning/Refrigeration</td>
                                                <td>{BETHVACCount}</td>
                                                <td>Encyclopedia</td>
                                                <td>{EncyclopediaCount}</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Engineering Courses</th>
                                                <td></td>
                                                <td>English</td>
                                                <td>{EnglishCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BS-Civil Engineering</td>
                                                <td>{BSCESEPCount}</td>
                                                <td>Environmental Science</td>
                                                <td>{EnvironmentalScienceCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BS-Electrical Engineering</td>
                                                <td>{BSEESEPCount}</td>
                                                <td>Fiction</td>
                                                <td>{FictionCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BS-Electronics Engineering</td>
                                                <td>{BSECESEPCount}</td>
                                                <td>Filipiniana</td>
                                                <td>{FilipinianaCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BS-Mechanical Engineering</td>
                                                <td>{BSMESEPCount}</td>
                                                <td>GenRef/Hand-outs</td>
                                                <td>{GenRefHandoutsCount}</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Other Science Courses</th>
                                                <td></td>
                                                <td>Instrumentation</td>
                                                <td>{InstrumentationCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BS-Information Technology</td>
                                                <td>{BSITCount}</td>
                                                <td>Language</td>
                                                <td>{LanguageCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BS-Information System</td>
                                                <td>{BSISCount}</td>
                                                <td>Literature</td>
                                                <td>{LiteratureCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BS-Environmental Science</td>
                                                <td>{BSESSDPCount}</td>
                                                <td>Management</td>
                                                <td>{ManagementCount}</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Other Bachelor's Degree Courses</th>
                                                <td></td>
                                                <td>Math</td>
                                                <td>{MathCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BGT-Architecture</td>
                                                <td>{BGTATCount}</td>
                                                <td>Mechanical</td>
                                                <td>{MechanicalCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BTVTE-Electrical</td>
                                                <td>{BTVTEdETCount}</td>
                                                <td>Philosophy/Psychology</td>
                                                <td>{PhilosophyPsychologyCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BTVTE-Electronics</td>
                                                <td>{BTVTEdLXtCount}</td>
                                                <td>Physics</td>
                                                <td>{PhysicsCount}</td>
                                            </tr>

                                            <tr>
                                                <td>BTVTE-ICT</td>
                                                <td>{BTVTEdICTCount}</td>
                                                <td>Social Sciences</td>
                                                <td>{SocialSciencesCount}</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">Faculty</th>
                                                <td>{FacultyCount}</td>
                                                <td>Thesis</td>
                                                <td>{ThesisCount}</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">TOTAL</th>
                                                <th scope="row">{books.courseCount}</th>
                                                <th scope="row">TOTAL</th>
                                                <th scope="row">{books.subjectCount}</th>
                                            </tr>

                                            <tr>
                                                <td colspan="4">
                                                    Month ({books.total_days} days)<br />
                                                    - {courseAvgDay} - Average clients served per day<br />
                                                    - {courseSubjDay} - Average used materials per day
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>



                                </div>

                            </PDFExport>
                            {/* </ExcelExport> */}
                        </div>
                        {/* <ExcelExport
                            data={books.book}
                            ref={_export}
                            fileName={`BOOK ACCESSION LIST (${formatDate})`}
                        >
                            <ExcelExportColumn field="course_field" title="COURSE" 
                                cell={(props) => {
                                    const value = props.dataItem[props.field];
                                    // const customValue = accessionArr[value]
                                    const cityIndex = accessionArr.indexOf(props.dataItem);
                                    return cityIndex >= 0 ? accessionArr[cityIndex] : '';
                                    // const customValue = value.map((v) => accessionArr[v]);
                                    //     return <td>{customValue}</td>;
                                }}/>

                            <ExcelExportColumn field="clients_served" title="NO. OF CLIENTS SERVED" />
                            <ExcelExportColumn field="research_areas" title="AREAS OF RESEARCH" />
                            <ExcelExportColumn field="materials_used" title="NO. OF USED MATERIALS" />
                        </ExcelExport> */}

                        <table style={{display: 'none'}}>
                            <tbody>
                                <tr>
                                    {header.map((head) => (
                                        <th key={head}> {head} </th>
                                    ))}
                                </tr>

                                {body.map((item, i) => (
                                    <tr key={i}>
                                        {item.map((it) => (
                                            <td key={it}>{it}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>
                </div>
            )
            }
        </Fragment>
    )
};
export default StatisticalReports