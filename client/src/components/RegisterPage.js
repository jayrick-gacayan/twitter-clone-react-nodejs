import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RegisterBackground from '../assets/img_register_background.jpeg';

/* Components */
import Modal from './layouts/Modal';

/* services */
import AuthService from '../services/auth_service';

/* utility */
import ModalUtility from '../utilities/modal_utility';

import './layouts/success.modal.css';
import './custom.style.css';

const RegisterPage = () => {
    let navigate = useNavigate();
    
    const initialUser = {
        email: "",
        password: "",
        cfpswd: ""
    };

    const [user, setUser] = useState(initialUser);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const openModalSuccess = () => {
        const modalSuccess = document.getElementById('successModal');
        ModalUtility.showModal(modalSuccess);
    }

    const closeModalSuccess = () => {
        const modalSuccess = document.getElementById('successModal');
        ModalUtility.hideModal(modalSuccess);
        navigate('/login');
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name] : value });
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        
        setIsSubmitted(false);
        setIsLoading(true);
        
        const { email, password, cfpswd } = user;
        
        setTimeout(()=> {
            
            AuthService.register(
                email.trim(),
                password.trim(),
                cfpswd.trim()
            )
            .then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    openModalSuccess();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.error) ||
                        error.message ||
                        error.toString() || error;
                    
                    setErrors(resMessage ? resMessage: {});

                    setSuccessful(false);
                    setIsLoading(false);
                    setIsSubmitted(true);
                }
            );

        }, 2000);
        
    };
    
    return (
        <div className="d-flex w-100 justify-content-center align-items-center vh-100 flex-wrap"
            style={{
                backgroundImage: `url(${ RegisterBackground })`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}>
            <div className="card d-flex justify-content-center p-2"
                style={{
                    width: "700px",
                    maxWidth: "80vh",
                    minWidth: "400px",

                    height: "772px",
                    maxHeight: "90vh",
                    minHeight: "400px",

                    borderRadius: "50px"

                }}>
                <div className="card-body px-5 d-flex justify-content-between">
                    <div>
                        <a href="/"
                            className="text-decoration-none text-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                className="bi bi-arrow-left style-svg-wh-1" 
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd" 
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </a>
                    </div>
                    <div className="flex-shrink-1">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            className="bi bi-twitter text-info style-svg-wh-1" 
                            viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                    </div>
                    <div>&nbsp;</div>
                </div>
                <div className="card-body px-5 d-flex flex-wrap flex-column">
                    <div className="py-3">
                        <span className="fs-2 fw-bold">Create your account</span>
                    </div>
                    {
                        !successful && (
                            <form id="registerForm" 
                                onSubmit={ handleRegisterSubmit }>
                                <div className="form-floating mb-2 mt-2">
                                    <input type="text" 
                                        className={ `form-control px-3 rounded-pill ${ isSubmitted ? (`is-${ errors.email ? `in` : `` }valid`) : `` }` } 
                                        id="email" 
                                        placeholder="Enter email" 
                                        name="email"
                                        value={ user.email }
                                        onChange={ handleInputChange } />
                                    <label htmlFor="email">Email</label>
                                    { errors.email && <div className="invalid-feedback">{ errors.email[0] }</div> }
                                </div>
                                <div className="form-floating mb-2 mt-2">
                                    <input type="password" 
                                        className={ `form-control px-3 rounded-pill ${ isSubmitted ? (`is-${ errors.password ? `in` : `` }valid`) : `` }` }
                                        id="password" 
                                        placeholder="Enter email" 
                                        name="password"
                                        value={ user.password }
                                        onChange={ handleInputChange } />
                                    <label htmlFor="password">Password</label>
                                    { errors.password && <div className="invalid-feedback">{ errors.password[0] }</div> }
                                </div>
                                <div className="form-floating mb-2 mt-2">
                                    <input type="password" 
                                        className={ `form-control px-3 rounded-pill ${ isSubmitted ? (`is-${ errors.cfpswd ? `in` : `` }valid`) : `` }` }
                                        id="cfpswd" 
                                        placeholder="Confirm Password" 
                                        name="cfpswd"
                                        value={ user.cfpswd }
                                        onChange={ handleInputChange } />
                                    <label htmlFor="cfpswd">Confirm Password</label>
                                    { errors.cfpswd && <div className="invalid-feedback">{ errors.cfpswd[0] }</div> }
                                </div>
                            </form>
                        )
                    }
                </div>
                <div className="card-body px-5">
                    <div className="form-group mb-3 mt-3" >
                        <button type="submit" 
                                className="btn btn-info p-3 form-control text-white rounded-pill" 
                                disabled={ isLoading }
                                form="registerForm">
                            {
                                isLoading ? 
                                (<React.Fragment>
                                    <span className="spinner-grow spinner-grow-sm me-2"></span>
                                    <span className="spinner-grow spinner-grow-sm me-2"></span>
                                    <span className="spinner-grow spinner-grow-sm me-2"></span> Checking
                                </React.Fragment>) :
                                (<span>Register</span>)
                            }
                        </button>
                    </div>
                </div>
                <div className="card-body px-5">
                    <div className="mb-3">
                        <span className="fw-bold fs-6 me-2">Already have an account ?</span>
                        <a className="text-dark"
                            href="/login">Log in</a>
                    </div>
                </div>
            </div>
            {   
                <Modal idModal="successModal"
                    ariaLabel="Register Success"
                    confirmType="modal-success-confirm"
                    icon="bi-check-lg"
                    h4Text="Great!"
                    pText={ message }>
                    <button className="btn rounded-pill btn-warning text-white"
                    onClick={ closeModalSuccess }>
                        <span className="me-2">Start Login </span> 
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </Modal>
            }
        </div>
    );
}

export default RegisterPage;