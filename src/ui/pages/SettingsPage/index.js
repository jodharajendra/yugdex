import React, { useState, useEffect } from "react";
import DefaultInput from "../../../customComponent/DefaultInput";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
import HomeService from "../../../api/services/HomeService";
import { ApiConfig } from "../../../api/apiConfig/apiConfig";
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const SettingsPage = (props) => {
    const [emailId, setEmailId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [mobile, setMobile] = useState();
    const [myfile, setMyfile] = useState();
    const [userId, setUserId] = useState("");
    const [localSelfy, setLocalSelfy] = useState('');
    const [getSelfy, setGetSelfy] = useState([]);

    const [crop, setCrop] = useState()

    const handleChangeSelfie = async (event) => {
        event.preventDefault();
        const fileUploaded = event.target.files[0];
        const imgata = URL.createObjectURL(fileUploaded);
        setMyfile(fileUploaded);
        setLocalSelfy(imgata);
    }


    const handleSettings = async (myfile, firstName, lastName, emailId, mobile) => {
        var formData = new FormData();
        formData.append('_id', userId);
        formData.append('profilepicture', myfile);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', emailId);
        formData.append('mobileNumber', mobile);
        await HomeService.updateSettings(formData).then(async result => {
            if (result.status) {
                try {
                    alertSuccessMessage(result.message);
                    handleDetials();
                    window.location.reload(false);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    }

    useEffect(() => {
        handleDetials();
    }, [])

    const handleDetials = async () => {
        await AuthService.getDetails().then(async result => {
            if (result.sucess) {
                try {
                    setUserId(result?.data?.logindata[0]?._id);
                    setEmailId(result?.data?.logindata[0]?.emailId);
                    setMobile(result?.data?.logindata[0]?.mobileNumber);
                    setFirstName(result?.data?.logindata[0]?.firstName);
                    setLastName(result?.data?.logindata[0]?.lastName);
                    setGetSelfy(result?.data?.logindata[0]?.profilepicture)
                } catch (error) {
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result?.message);
            }
        });

    }

    console.log(getSelfy, 'getSelfy');

    return (
        <>
            <div class="tab-pane" id="SecurityPill" role="tabpanel" aria-labelledby="Security-pill">

                <div class="row">
                    <div class="col-md-12 col-lg-8 m-auto">
                        <div class="form-field-wrapper switch_btn  border-dashed border-gray-300 bg-lighten card-rounded p-4">
                            <form>
                                <div class="row">
                                    <div className="col-md-12" >
                                        <div class="avatar-upload">
                                            <div class="avatar-edit">
                                                <input type='file' id="imageUpload" name="myfile" onChange={handleChangeSelfie} />
                                                <label for="imageUpload"><i class="ri-pencil-line"></i></label>
                                            </div>
                                            <div class="avatar-preview">
                                                {getSelfy === '' ? <img src="images/profilelogo.png" /> :
                                                    <ReactCrop onChange={c => setCrop(c)} style={{cursor:'auto'}}>
                                                        <img src={!localSelfy ? `${ApiConfig.baseUrl + '/uploads/' + getSelfy}` : localSelfy} />
                                                    </ReactCrop>
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 mb-4">
                                        <div class="field-box">
                                            <label for="text" class="form-label">First Name</label>
                                            <DefaultInput
                                                type="text" name="firstName" className="form-control" aria-describedby="First Name"
                                                placeholder="Enter Your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-4">
                                        <div class="field-box">
                                            <label for="text" class="form-label">Last Name</label>
                                            <DefaultInput type="text" name="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-4">
                                        <div class="field-box">
                                            <label for="text" class="form-label">Email</label>
                                            <DefaultInput type="text" name="Email" placeholder="Enter Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-4">
                                        <div class="field-box">
                                            <label for="text" class="form-label">Mobile Number</label>
                                            <DefaultInput type="text" name="Mobile" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-4 mt-4">
                                        <div class="field-box">
                                            <button class="btn btn-gradient w-100 justify-content-center btn-medium {" type="button" onClick={() => handleSettings(myfile, firstName, lastName, emailId, mobile)}><span>Submit</span></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsPage;