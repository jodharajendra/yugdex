import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DefaultInput from "../../../customComponent/DefaultInput";
import { validPassword, notEqualsZero, matchPassword } from "../../../utils/Validation";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
import { ProfileContext } from "../../../context/ProfileProvider";

const SecurityPage = () => {

    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [oldpassword, setOldpassword] = useState('');
    const navigate = useNavigate();

    const [profileState, updateProfileState] = useContext(ProfileContext);

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "password":
                setPassword(event.target.value);
                break;

            case "conPassword":
                setConPassword(event.target.value);
                break;

            case "oldpassword":
                setOldpassword(event.target.value);
                break;

            default:
                break;
        }
    }

    const resetEditInput = () => {
        setPassword("");
        setConPassword("");
        setOldpassword("");
    }

    const handleLogOut = () => {
        updateProfileState({});
        localStorage.clear();
        navigate("/login");
        window.location.reload();

    }

    const handleSecutity = async (oldpassword, password, conPassword) => {
        await AuthService.setSecurity(oldpassword, password, conPassword).then(async result => {
            if (result.message === "Password changed successfully") {
                try {
                    alertSuccessMessage(result.message);
                    handleLogOut();
                    resetEditInput();
                } catch (error) {
                    alertErrorMessage(error);
                    //console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });

    }

    return (
        <>
            <div class="tab-pane" id="SecurityPill" role="tabpanel" aria-labelledby="Security-pill">
                <div class="upload-formate mb-6 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 class="mb-1">
                            Secutity
                        </h3>
                        <p class="formate mb-0">
                            Fill the form below to change your password.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 col-lg-8 m-auto">
                        <div class="form-field-wrapper switch_btn  border-dashed border-gray-300 bg-lighten card-rounded p-4">
                            <form>
                                <div class="row">
                                    <div class="col-md-12 mb-4">
                                        <div class="field-box">
                                            <label for="text" class="form-label">Current Password</label>


                                            <DefaultInput
                                                errorStatus={
                                                    validPassword(oldpassword)
                                                }
                                                errorMessage={validPassword(oldpassword)}
                                                type="password" name="oldpassword" className="form-control" aria-describedby="password"
                                                placeholder="Enter Your password.." value={oldpassword} onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="field-box">
                                            <label for="text" class="form-label">New Password</label>
                                            <DefaultInput type="password" name="password" placeholder="Enter password" value={password} errorStatus={validPassword(password) !== undefined && notEqualsZero(password)} errorMessage={validPassword(password)} onChange={handleInputChange} />

                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="field-box">
                                            <label for="text" class="form-label">Confirm New Password</label>
                                            <DefaultInput type="password" name="conPassword" placeholder="Enter confirm Password" value={conPassword} errorStatus={validPassword(conPassword) !== undefined && notEqualsZero(conPassword) || matchPassword(password, conPassword)} errorMessage={validPassword(conPassword) || matchPassword(password, conPassword)} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    {/* <!-- End .col --> */}

                                    <div class="col-md-12 mb-4 mt-4">
                                        <div class="field-box">
                                            <button class="btn btn-gradient w-100 justify-content-center btn-medium {" type="button" onClick={() => handleSecutity(oldpassword, password, conPassword)}><span>Submit</span></button>
                                        </div>
                                    </div>
                                    {/* <!-- End .col --> */}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SecurityPage;