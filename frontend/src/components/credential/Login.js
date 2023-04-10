import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Swal from 'sweetalert2';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { isAuthenticated, error} = useSelector(state => state.auth);


    useEffect(() => {

        if (isAuthenticated) {
            navigate('/dashboard')
        }
        if (!isAuthenticated) {
            navigate('/')
        }
        if (error) {
            // alert.error(error);
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            dispatch(clearErrors());
        }


    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email.toLowerCase(), password)).then((response) => {
          console.log(response); // add this line to check the response structure
          if (response.success) {
            setTimeout(() => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                title: 'Logged in successfully!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }, 1000);
          } else {
            console.log('Login Unsuccessful!');
          }
        });
      };

    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/api/v1/google/callback`,
            "_self"
        );
    };

    return (
        <Fragment>
            <MetaData title={'Home'} />
            <div className='landing-page'>
                <div className="main">
                    <div className="grid1">
                        <div className="mobile">
                            <img src="images/mobile.png" alt="phone" />
                        </div>
                        <h3 className='w-50'>
                            download
                        </h3>
                    </div> 
                    <div className="grid2">
                        <div className="login-container">
                            <img src="../images/TUPT-Logo.png" alt="Technological University of the Philippines Taguig Logo" className="tupt-logo" />
                            <form onSubmit={submitHandler}>
                                <h1>Sign in your account</h1>
                                <label for="emailaddress">Email Address</label>
                                <input type="email" id="emailaddress" name="emailaddress"
                                    value={email.toLowerCase()} onChange={(e) => setEmail(e.target.value)} 
                                    autoComplete='off'/>
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                                <a href="#" className="forgot-button">Forgot Password?</a>
                                <div className="centered-button">
                                    <button href="#" type="submit" className="login-button">Sign in</button>
                                    <p className="message">
                                        Or login through your Google Account
                                    </p>
                            
                                    <button href="#" className="google-button" onClick={googleAuth}>
                                        <img src="images/icons8-google-48.png" alt="" className="google-button-img" />
                                        Sign in with Google
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='announcement text-center'>
                </div>
                <section className="our-team">
                    <h1>our team</h1>
                    <div className="card-items">
                        <div className="card-team">
                            <img src="images/profile_image_yanson.png" alt="" />
                            <div className="card__content">
                                <div className="card__label">
                                    Documentation
                                </div>
                                <div className="user">
                                    <p>Jay Christian E. Yanson</p>
                                    <p className="quote"><i>"The way to get started is to quit talking and begin doing."</i></p>
                                </div>
                            </div>
                        </div>
                        <div className="card-team">
                            <img src="images/profile_image_pena.png" alt="" />
                            <div className="card__content">
                                <div className="card__label">
                                    Front Developer
                                </div>
                                <div className="user">
                                    <p>Jim Colin G. Pena</p>
                                    <p className="quote"><i>"Use your time wisely. You'll never know when it will gonna stop."</i></p>
                                </div>
                            </div>
                        </div>
                        <div className="card-team">
                            <img src="images/212142026_589100762473691_4473235208244317798_n.jpg" alt="" />
                            <div className="card__content">
                                <div className="card__label">
                                    Back End Developer
                                </div>
                                <div className="user">
                                    <p>Shane Kian P. Cordero</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-team">
                            <img src="images/212142026_589100762473691_4473235208244317798_n.jpg" alt="" />
                            <div className="card__content">
                                <div className="card__label">
                                    Back End Developer
                                </div>
                                <div className="user">
                                    <p>Rhyan Jhastine S. Billones</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-team">
                            <img src="images/212142026_589100762473691_4473235208244317798_n.jpg" alt="" />
                            <div className="card__content">
                                <div className="card__label">
                                    Android Developer
                                </div>
                                <div className="user">
                                    <p>Ezekiel Clyde Lacbayen</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="faq-section">
                <h2 className="faq-header">FAQ</h2>
                <div className="container">
                    <div className="faq-content">
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <button className="btn btn-link btn-block text-left collapse btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseOne" aria-expanded="false"
                                        aria-controls="collapseOne">
                                        How much do I pay for the penalty?
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>

                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne"
                                    data-parent="#accordionExample">
                                    <div className="card-body pl-5">
                                        5 pesos per book
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                        aria-controls="collapseTwo">
                                        How many days to borrow a book?
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                    data-parent="#accordionExample">
                                    <div className="card-body pl-5">
                                        1 day
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Collapsible Group Item
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                    data-parent="#accordionExample">
                                    <div className="card-body">
                                        Hello
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Collapsible Group Item
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                    data-parent="#accordionExample">
                                    <div className="card-body">
                                        Hello
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Collapsible Group Item
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                    data-parent="#accordionExample">
                                    <div className="card-body">
                                        Hello
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Collapsible Group Item
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                    data-parent="#accordionExample">
                                    <div className="card-body">
                                        Hello
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Collapsible Group Item
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                    data-parent="#accordionExample">
                                    <div className="card-body">
                                        Hello
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Collapsible Group Item
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                    data-parent="#accordionExample">
                                    <div className="card-body">
                                        Hello
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <button className="btn btn-link btn-block text-left collapsed btn-faq" type="button"
                                        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Collapsible Group Item
                                        <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                    data-parent="#accordionExample">
                                    <div className="card-body">
                                        Hello
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default Login