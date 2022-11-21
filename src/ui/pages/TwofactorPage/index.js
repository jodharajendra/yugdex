import React, { useContext, useState, useEffect } from "react";
import Modal from 'react-modal';
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
import { $ } from "react-jquery-plugin";
const TwofactorPage = ({ mobile, email, type }) => {

    const [checkOtp, setCheckOtp] = useState(type)
    const [authenticateType, setAuthenticateType] = useState([])
    const [authType, setAuthType] = useState();
    const [vCode, setVcode] = useState("");
    const [googleQr, setGoogleQr] = useState({});
    const [modalIsOpen, setIsOpen] = useState();

    const checkType = () => {
        if (authType === 2) {
            handleGoogleAuth();
        } else {
            handleSave(authType);
        }
    }

    const handleSave = async (authType) => {
        await AuthService.update2fa(authType, vCode).then(async result => {
            console.log(result, 'update2fa');
            if (result.message === "2FA setup successfull") {
                try {
                    alertSuccessMessage(result.message);
                    $("#google_modal").modal('hide');
                } catch (error) {
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    }

    const handleGoogleAuth = async (authType) => {
        await AuthService.googleAuth(authType, vCode).then(async result => {
            console.log(result, 'googleAuth');
            if (Object.keys(result).length > 0) {
                try {
                    setGoogleQr(result.message);
                    $("#google_modal").modal('show');
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    }

    function hideStep() {
        const pop = document.querySelector(".step_1");
        pop.classList.add("d-none");
        const pop2 = document.querySelector(".step_2");
        pop2.classList.remove("d-none");
    }

    const handleInputChange = (event) => {
        if (event.target.id === "1") {
            setAuthType(2);
            setCheckOtp(2);
        } else if (event.target.id === "2") {
            setAuthType(1);
            setCheckOtp(1);
        } else if (event.target.id === "3") {
            setAuthType(0);
            setCheckOtp(0);
        } else if (event.target.id === "4") {
            setAuthType(3);
            setCheckOtp(3);
        }
    }

    return (
        <>
            <div class="tab-pane" id="AuthencationPill" role="tabpanel" aria-labelledby="Authencation-pill">
                <div class="upload-formate mb-6 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 class="mb-1">
                            Two Factor Authencation
                        </h3>
                        <p class="formate mb-0">
                            SelectTwo Factor Authencation for your security.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 col-lg-8 m-auto">
                        <div class="form-field-wrapper switch_btn  border-dashed border-gray-300 bg-lighten card-rounded p-4">
                            <div class="d-flex align-items-center justify-space-between">
                                <h6 class="mb-0 w-100">Authenticator App</h6>
                                <div class="form-check  switch_btns form-switch">
                                    <input class="form-check-input" type="checkbox" name="Two-Factor" id="1" onChange={handleInputChange} checked={checkOtp === 2} />
                                </div>
                            </div>
                            <hr />
                            <div class={`d-flex align-items-center justify-space-between ${!mobile && "sec_disable"}`}>
                                <h6 class="mb-0 w-100">Mobile OTP </h6>
                                <div class="form-check  switch_btns form-switch">
                                    <input class="form-check-input" type="checkbox" name="Two-Factor" id="4" disabled={!mobile} onChange={handleInputChange} checked={checkOtp === 3} />
                                </div>
                            </div>
                            <hr />
                            <div class={`d-flex align-items-center justify-space-between ${!email && "sec_disable"}`} >
                                <h6 class="mb-0 w-100">Email OTP</h6>
                                <div class="form-check  switch_btns form-switch">
                                    <input class="form-check-input" type="checkbox" name="Two-Factor" id="2" disabled={!email} onChange={handleInputChange} checked={checkOtp === 1} />
                                </div>
                            </div>
                            <hr />
                            <div class="d-flex align-items-center justify-space-between">
                                <h6 class="mb-0 w-100">None</h6>
                                <div class="form-check  switch_btns form-switch">
                                    <input class="form-check-input" type="checkbox" name="Two-Factor" id="3" onChange={handleInputChange} checked={checkOtp === 0} />
                                </div>
                            </div>
                            <hr />
                            <div class="col-md-12 mb-1 mt-5 ">
                                <div class="field-box text-center">
                                    <button class="btn btn-gradient w-50  justify-content-center btn-medium mb-0" type="button" data-toggle="modal" onClick={() => checkType()}><span>Submit</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="google_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <form className="modal-content">
                        <div class="modal-header flex-column px-8">
                            <h3 class="modal-title" id="placeBitLaebl"> Authenticator App </h3>
                            <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i
                                class="ri-close-fill"></i></button>
                        </div>
                        <div className="modal-body conin_purchase">
                            <div className="step_1 " >
                                <div className="col-md-8 m-auto mb-5 text-center" >
                                    <img className="img-fluid qr_img w-100" src={googleQr} />
                                    <button type="button" className="next_btn btn-gradient m-auto w-100 btn btn-block" onClick={() => hideStep()}> Next </button>
                                </div>
                            </div>
                            <div className="step_2 d-none" >
                                <div className="col-md-8 m-auto mb-5 text-center" >
                                    <div className="pt-5" >
                                        <input type="text" className="mb-3" value={vCode} placeholder="Enter Code.." onChange={(event) => setVcode(event.target.value)} />
                                    </div>
                                    <button type="button" className="next_btn btn-gradient m-auto w-100 btn btn-block" onClick={() => handleSave(authType)} disabled={!vCode}> <span>Submit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TwofactorPage;