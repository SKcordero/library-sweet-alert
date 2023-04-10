// import React, { Fragment, useState, useRef, useEffect } from 'react'
// import { Pie } from 'react-chartjs-2';
// import { useAlert } from "react-alert";
// import { useDispatch, useSelector } from "react-redux";
// import { listEvaluation, clearErrors } from '../../actions/evaluationActions'
// import MetaData from '../layout/MetaData'
// import Loader from '../layout/Loader'
// import { Chart as ChartJS, CategoryScale, LinearScale, Title, registerables } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     Title,
//     ChartDataLabels,
//     ...registerables
// )

// const studentEvaluationList = () => {
//     const alert = useAlert();
//     const dispatch = useDispatch();
//     const {
//         loading,
//         error,
//         evaluation
//     } = useSelector(state => state.listEvaluations);

//     useEffect(() => {
//         dispatch(listEvaluation(id));

//         if (error) {
//             alert.error(error);
//             dispatch(clearErrors())
//         }

//     }, [dispatch, alert, error])

//     console.log(dispatch)
// }
// export default studentEvaluationList