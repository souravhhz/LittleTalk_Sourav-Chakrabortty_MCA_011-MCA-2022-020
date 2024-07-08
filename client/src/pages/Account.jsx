import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import { AuthContext } from "../context/AuthContext"; // Import AuthContext from your context file
import '../pages/css/Login.css';
import { LuPenSquare } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Account = () => {
    const { user } = useContext(AuthContext); // Import useContext hook and use it to access user data from AuthContext
    // const defaultv = "2024-02-09T04:29:13.567Z"
    const date = new Date(user?.createdAt );

    // Extract day, month, and year components
    const day = date.getDate().toString().padStart(2, '0'); // Pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Format the date as "dd-mm-yyyy"
    const formattedDate = `${day}-${month}-${year}`;


    return (
        <>
            <div className="vh-100" style={{ width: "90%" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem", paddingBottom:'5px' }}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                        <h5>{user.name}</h5>
                                        <p>LittleTalk Heros</p>
                                        {!user?.actype && <Link to="/editaccount"><LuPenSquare /></Link>}
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{user.email}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>User Id</h6>
                                                    <p className="text-muted">{user.accountId}</p>
                                                </div>
                                            </div>
                                            <h6>Account Details</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Account Type</h6>
                                                    <p className="text-muted">{`${user?.actype==0? 'Normal Account': 'Guest Account'}`}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Account Since</h6>
                                                    <p className="text-muted">{formattedDate}</p>
                                                </div>
                                            </div>
                                            {!user?.actype && 
                                                <div className="d-flex justify-content-around">
                                                    <Link to="#!"><FaFacebookF /></Link>
                                                    <Link to="#!"><FaLinkedin /></Link>
                                                    <Link to="#!"><FaInstagramSquare /></Link>
                                                    <Link to="#!"><FaXTwitter /></Link>
                                                    <Link to="#!"><FaGithub /></Link>
                                                    <Link to="#!"><FaYoutube /></Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account;
