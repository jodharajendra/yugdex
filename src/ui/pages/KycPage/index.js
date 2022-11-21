import React, { useState, useEffect, useMemo } from "react";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { postCode, notEqualsZero, panCardNum, aadharNum, infoDobstatus } from "../../../utils/Validation";
import './style.css';
import AuthService from "../../../api/services/AuthService";
import countryList from 'react-select-country-list';
import DefaultInput from "../../../customComponent/DefaultInput";
import { validateNumber, validatePanCard, matchPanCard, drivingLicense, documentNum } from "../../../utils/Validation";
import KycButton from "../../../customComponent/KycButton";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const KycPage = () => {

  const options = useMemo(() => countryList().getData(), [])

  const [kycVerfied, setKycVerified] = useState("");
  const [infoCountry, setInfoCountry] = useState('India');
  const [kycType, setKycType] = useState('Personal KYC');
  const [number, setNumber] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [infoDob, setInfoDob] = useState('');
  const [docType, setDocType] = useState('Aadhar card');
  const [address, setAddress] = useState('');
  const [infoState, setInfoState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState("");
  const [aadhar, setAadhar] = useState('');
  const [localFront, setLocalFront] = useState('');
  const [localBack, setLocalBack] = useState('');
  const [localSelfie, setLocalSelfie] = useState('');
  const [localSelfieName, setLocalSelfieName] = useState('');
  const [localPanCanrd, setLocalPanCanrd] = useState('');
  const [localBackImage, setLocalBackImage] = useState('');
  const [localFrontImage, setLocalFrontImage] = useState('');
  const [dLicense, setDLicense] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [panCard, setPanCard] = useState('');
  const [rePanCard, setRePanCard] = useState('');
  const [localPanCard, setLocalPanCard] = useState('');
  const [kyc2fa, setKyc2fa] = useState('');
  const [emailId, setEmailId] = useState('');
  const [gender, setGender] = useState('');
  const [reason, setReason] = useState('');
  const [localChequeImage, setLocalChequeImage] = useState('');
  const [chequeImage, setChequeImage] = useState('');

  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(1);

  const handleChangeIdentity = async (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    setLocalFrontImage(event.target.files[0].name);
    const imgata = URL.createObjectURL(fileUploaded);
    setLocalFront(fileUploaded);
    //setLocalIdentityData(fileUploaded);
  }

  const handleChangeCheque = async (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    setLocalChequeImage(event.target.files[0].name);
    const imgata = URL.createObjectURL(fileUploaded);
    setChequeImage(fileUploaded);
    //setLocalIdentityData(fileUploaded);
  }

  const handleChangeIdentity2 = async (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    setLocalBackImage(event.target.files[0].name);
    const imgata = URL.createObjectURL(fileUploaded);
    setLocalBack(fileUploaded);
    //setLocalIdentityData2(fileUploaded);
  }

  const handleChangeSelfie = async (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    setLocalSelfieName(event.target.files[0].name);
    const imgata = URL.createObjectURL(fileUploaded);
    setLocalSelfie(fileUploaded);
    // handleUploadSelfie(fileUploaded);
  }

  const handleChangePanCard = async (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    setLocalPanCanrd(event.target.files[0].name);
    const imgata = URL.createObjectURL(fileUploaded);
    setLocalPanCard(fileUploaded);
    // handleUploadPanCard(fileUploaded);
  }


  const handleKyc = async (infoCountry, kycType, firstName, lastName, gender, number, infoDob, address, infoState, city, zipCode, aadhar, panCard, localFront, localBack, localSelfie, localPanCard, docType, chequeImage) => {
    var formData = new FormData();
    formData.append('idfront', localFront);
    formData.append('idback', localBack);
    formData.append('selfie', localSelfie);
    formData.append('pancard', localPanCard);
    formData.append('line1', address);
    formData.append('city', city);
    formData.append('state', infoState);
    formData.append('country', infoCountry);
    formData.append('idNum', aadhar);
    formData.append('panNum', panCard);
    formData.append('dob', infoDob);
    formData.append('zip', zipCode);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('kycType', kycType);
    formData.append('gender', gender);
    formData.append('mobileNumber', number);
    formData.append('docType', docType);
    formData.append('cancelCheck', chequeImage);

    LoaderHelper.loaderStatus(true);
    await AuthService.addkyc(formData).then(async result => {
      if (result.message === "Documents uploaded successfully") {
        LoaderHelper.loaderStatus(false);
        try {
          alertSuccessMessage(result.message);
          handleResetInput();
          handleDetials();
          navigate("/profile");
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  }

  const handleResetInput = () => {
    setInfoCountry("");
    setKycType("");
    setFirstName("");
    setLastName("");
    setInfoDob("");
    setAddress("");
    setInfoState("");
    setCity("");
    setZipCode("");
    setAadhar("");
    setLocalFront("");
    setLocalBack("");
    setLocalSelfie("");
    setPanCard("");
    setRePanCard("");
    setLocalPanCard("");
    setLocalSelfieName("");
    setLocalPanCanrd("");
    setLocalBackImage("");
    setLocalFrontImage("");
    setCountryCode("");
    setDLicense("");
    setDocumentNumber("");

  }

  useEffect(() => {
    handleDetials();
  }, [])

  const handleDetials = async () => {
    await AuthService.getDetails().then(async result => {
      console.log(result, 'get details');
      if (result.sucess) {
        LoaderHelper.loaderStatus(false);
        setKycVerified(result.data?.kycVerified);
        setKyc2fa(result.data?.logindata[0]?.["2fa"]);
        setEmailId(result.data?.logindata[0]?.emailId)
        setFirstName(result.data?.logindata[0]?.firstName);
        setLastName(result.data?.logindata[0]?.lastName);
        setReason(result?.data?.kycRejectReason);
      }
      else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  }

  const handleSelected = (type) => {
    setIsShow(type);
  }

  const getEighteenYearsAgoDate = () => {
    let eighteenYearsAgo = new Date();
    eighteenYearsAgo = eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    eighteenYearsAgo = moment(eighteenYearsAgo).format('YYYY-MM-DD');
    return eighteenYearsAgo;
  }

  const verifyAgain = () => {
    setKycVerified('4');
  }
  return (
    <>
      <section class="inner-page-banner">
        <div class="container">
          <div class="inner text-center">
            <h1 class="title">KYC Verification</h1>
            <nav class="mt-4">
              <ol class="breadcrumb justify-content-center">
                <li class="breadcrumb-item">
                  <Link to="/profile">My Account</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">KYC Verification</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>
      <section className="pb-90">
        {kycVerfied == "1" ?
          <div className="container" >
            <div className="row" >
              <div className="col-lg-10 m-auto" >
                <div className="create-item-wrapper create-item-wrapper-kyc">
                  <div className="form-field-wrapper kyc_wrapper ">
                    <div className="rightsidebox">
                      <div className="kyc_nofti kyc_done" >
                        <div className="sc-bdfBQB sc-kmATbt fOxqyX dzKkzw">
                          <div className={`check_bar ${!emailId ? "" : "acive"}`}><i className="ri-check-fill"></i>
                            <h5> Email</h5>
                          </div>
                          <div className={`check_bar ${kyc2fa == '0' ? "" : "acive"}`}><i className="ri-check-fill"></i>
                            <h5> Security </h5>
                          </div>
                          <div className="check_bar "><i className="ri-check-fill"></i>
                            <h5> Welcome </h5>
                          </div>
                        </div>
                        <hr />
                        <div className="d-kyc_sec" >
                          <div>
                            <h5 className="text-warning">Your Yug account Kyc is Pending</h5>
                          </div>
                          <a href="/trade" className="btn btn-gradient btn-medium justify-content-center disabled"> <span>Start Trading</span> </a>
                        </div>
                        <hr />
                        <div className="d-kyc_share" >
                          <div>
                            <h5>Earn 50% commssion on your friend's trading fees</h5>
                            <p><small>when your friend sign up using your referal link & trades, you can earn 50% commission on their trading fees.</small></p>
                          </div>
                          <a href="/referral" className="btn btn-dark btn-mini"><span>Invite & Earn</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : kycVerfied == "2" ?
            <div className="container" >
              <div className="row" >
                <div className="col-lg-10 m-auto" >
                  <div className="create-item-wrapper create-item-wrapper-kyc">
                    <div className="form-field-wrapper kyc_wrapper ">
                      <div className="rightsidebox">
                        <div className="kyc_nofti kyc_done" >
                          <div className="sc-bdfBQB sc-kmATbt fOxqyX dzKkzw">
                            <div className={`check_bar ${!emailId ? "" : "acive"}`}><i className="ri-check-fill "></i>
                              <h5> Email</h5>
                            </div>
                            <div className={`check_bar ${!kyc2fa ? "" : "acive"}`}><i className="ri-check-fill "></i>
                              <h5> Security </h5>
                            </div>
                            <div className="check_bar acive"><i className="ri-check-fill "></i>
                              <h5> Welcome </h5>
                            </div>
                          </div>
                          <hr />
                          <div className="d-kyc_sec" >
                            <div>
                              <h4 className="text-success pb-3">Congratulations</h4>
                              <p>Your Yug account Kyc is Approved</p>
                            </div>
                            <Link to="/trade" className="btn btn-gradient btn-medium justify-content-center"> <span>Start Trading</span> </Link>
                          </div>
                          <hr />
                          <div className="d-kyc_share" >
                            <div>
                              <h5>Earn 50% commssion on your friend's trading fees</h5>
                              <p><small>when your friend sign up using your referal link & trades, you can earn 50% commission on their trading fees.</small></p>
                            </div>
                            <a href="/referral" className="btn btn-dark btn-mini"><span>Invite & Earn</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> : kycVerfied == "3" ?
              <div className="container" >
                <div className="row" >
                  <div className="col-lg-10 m-auto" >
                    <div className="create-item-wrapper create-item-wrapper-kyc">
                      <div className="form-field-wrapper kyc_wrapper ">
                        <div className="rightsidebox">
                          <div className="kyc_nofti kyc_done" >
                            <div className="sc-bdfBQB sc-kmATbt fOxqyX dzKkzw">
                              <div className={`check_bar ${!emailId ? "" : "acive"}`}><i className="ri-check-fill"></i>
                                <h5> Email</h5>
                              </div>
                              <div className={`check_bar ${!kyc2fa ? "" : "acive"}`}><i className="ri-check-fill"></i>
                                <h5> Security </h5>
                              </div>
                              <div className="check_bar "><i className="ri-check-fill"></i>
                                <h5> Welcome </h5>
                              </div>
                            </div>
                            <hr />
                            <div className="d-kyc_sec" >
                              <div>
                                {/* <h4 className="p-b 10">Sorry</h4> */}
                                <h5>Your Yug account Kyc is Reject</h5>
                                <span className="text-danger mt-3">{reason}</span>
                              </div>
                              <button class="btn btn-gradient btn-medium justify-content-center" onClick={verifyAgain}><span>Verify Again</span></button>
                            </div>
                            <hr />
                            <div className="d-kyc_share" >
                              <div>
                                <h5>Earn 50% commssion on your friend's trading fees</h5>
                                <p><small>when your friend sign up using your referal link & trades, you can earn 50% commission on their trading fees.</small></p>
                              </div>
                              <a href="/referral" className="btn btn-dark btn-mini"><span>Invite & Earn</span></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> :
              <div className="container">
                <form action="#">
                  <div className="row">
                    <div className="col-lg-10 m-auto">
                      <div className="create-item-wrapper">
                        <div className="form-field-wrapper ">
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="field-box">
                                <label for="royality" className="form-label">Select country</label>
                                <select className="" id="inputGroupSelect03" value={infoCountry} name="infoCountry" onChange={(event) => setInfoCountry(event.target.value)}>
                                  <option selected>India</option>

                                  {options.map((item, index) =>
                                    <option value={item.label} key={index}>{item.label}</option>,
                                    // console.log(options, "option"),
                                  )}
                                </select>
                              </div>
                            </div>

                            <div className="col-md-6 mb-4">
                              <div className="field-box">
                                <label for="sizes" className="form-label">KYC Type</label>
                                <input type="text" value={kycType} name="kycType" class="form-control" onChange={(event) => setKycType(event.target.value)} disabled />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 pt-6">
                          <h5 className="title ">
                            Personal Information
                          </h5>
                        </div>
                        <div className="form-field-wrapper ">
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">First Name</label>
                                <input type="text" placeholder="" value={firstName} name="firstName" onChange={(event) => setFirstName(event.target.value)} />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">Last Name</label>
                                <input type="text" placeholder="" value={lastName} name="lastName" onChange={(event) => setLastName(event.target.value)} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group" >
                                <label className="pb-2" for="">Gender</label>
                                <div className="d-flex align-items-center mb-3" >
                                  <div class="form-check me-3">
                                    <input class="form-check-input" type="radio" name="gender" value="male" onChange={(event) => setGender(event.target.value)} />
                                    <label class="form-check-label ms-2" for="flexRadioDefault1">
                                      Male
                                    </label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" onChange={(event) => setGender(event.target.value)} name="gender" value="female" />
                                    <label class="form-check-label ms-2" for="flexRadioDefault2">
                                      Female
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </div>
                            <div className="col-12" >
                              <div className="fleld-box" >
                                <label for="Code" className="form-label">Mobile Number</label>
                              </div>
                            </div>
                            <div className="col-4 mb-4">
                              <div className="field-box ">
                                <select name="countryCode" id="" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                  <option data-countryCode="IN" value="91" Selected>India (+91)</option>
                                  <option data-countryCode="US" value="1" >UK (+44)</option>
                                  <option data-countryCode="GB" value="44" >Norway (+47)</option>
                                  <optgroup label="Other countries">
                                    <option data-countryCode="DZ" value="213">Algeria (+213)</option>
                                    <option data-countryCode="AD" value="376">Andorra (+376)</option>
                                    <option data-countryCode="AO" value="244">Angola (+244)</option>
                                    <option data-countryCode="AI" value="1264">Anguilla (+1264)</option>
                                    <option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                                    <option data-countryCode="AR" value="54">Argentina (+54)</option>
                                    <option data-countryCode="AM" value="374">Armenia (+374)</option>
                                    <option data-countryCode="AW" value="297">Aruba (+297)</option>
                                    <option data-countryCode="AU" value="61">Australia (+61)</option>
                                    <option data-countryCode="AT" value="43">Austria (+43)</option>
                                    <option data-countryCode="AZ" value="994">Azerbaijan (+994)</option>
                                    <option data-countryCode="BS" value="1242">Bahamas (+1242)</option>
                                    <option data-countryCode="BH" value="973">Bahrain (+973)</option>
                                    <option data-countryCode="BD" value="880">Bangladesh (+880)</option>
                                    <option data-countryCode="BB" value="1246">Barbados (+1246)</option>
                                    <option data-countryCode="BY" value="375">Belarus (+375)</option>
                                    <option data-countryCode="BE" value="32">Belgium (+32)</option>
                                    <option data-countryCode="BZ" value="501">Belize (+501)</option>
                                    <option data-countryCode="BJ" value="229">Benin (+229)</option>
                                    <option data-countryCode="BM" value="1441">Bermuda (+1441)</option>
                                    <option data-countryCode="BT" value="975">Bhutan (+975)</option>
                                    <option data-countryCode="BO" value="591">Bolivia (+591)</option>
                                    <option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option>
                                    <option data-countryCode="BW" value="267">Botswana (+267)</option>
                                    <option data-countryCode="BR" value="55">Brazil (+55)</option>
                                    <option data-countryCode="BN" value="673">Brunei (+673)</option>
                                    <option data-countryCode="BG" value="359">Bulgaria (+359)</option>
                                    <option data-countryCode="BF" value="226">Burkina Faso (+226)</option>
                                    <option data-countryCode="BI" value="257">Burundi (+257)</option>
                                    <option data-countryCode="KH" value="855">Cambodia (+855)</option>
                                    <option data-countryCode="CM" value="237">Cameroon (+237)</option>
                                    <option data-countryCode="CA" value="1">Canada (+1)</option>
                                    <option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option>
                                    <option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option>
                                    <option data-countryCode="CF" value="236">Central African Republic (+236)</option>
                                    <option data-countryCode="CL" value="56">Chile (+56)</option>
                                    <option data-countryCode="CN" value="86">China (+86)</option>
                                    <option data-countryCode="CO" value="57">Colombia (+57)</option>
                                    <option data-countryCode="KM" value="269">Comoros (+269)</option>
                                    <option data-countryCode="CG" value="242">Congo (+242)</option>
                                    <option data-countryCode="CK" value="682">Cook Islands (+682)</option>
                                    <option data-countryCode="CR" value="506">Costa Rica (+506)</option>
                                    <option data-countryCode="HR" value="385">Croatia (+385)</option>
                                    <option data-countryCode="CU" value="53">Cuba (+53)</option>
                                    <option data-countryCode="CY" value="90392">Cyprus North (+90392)</option>
                                    <option data-countryCode="CY" value="357">Cyprus South (+357)</option>
                                    <option data-countryCode="CZ" value="42">Czech Republic (+42)</option>
                                    <option data-countryCode="DK" value="45">Denmark (+45)</option>
                                    <option data-countryCode="DJ" value="253">Djibouti (+253)</option>
                                    <option data-countryCode="DM" value="1809">Dominica (+1809)</option>
                                    <option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option>
                                    <option data-countryCode="EC" value="593">Ecuador (+593)</option>
                                    <option data-countryCode="EG" value="20">Egypt (+20)</option>
                                    <option data-countryCode="SV" value="503">El Salvador (+503)</option>
                                    <option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option>
                                    <option data-countryCode="ER" value="291">Eritrea (+291)</option>
                                    <option data-countryCode="EE" value="372">Estonia (+372)</option>
                                    <option data-countryCode="ET" value="251">Ethiopia (+251)</option>
                                    <option data-countryCode="FK" value="500">Falkland Islands (+500)</option>
                                    <option data-countryCode="FO" value="298">Faroe Islands (+298)</option>
                                    <option data-countryCode="FJ" value="679">Fiji (+679)</option>
                                    <option data-countryCode="FI" value="358">Finland (+358)</option>
                                    <option data-countryCode="FR" value="33">France (+33)</option>
                                    <option data-countryCode="GF" value="594">French Guiana (+594)</option>
                                    <option data-countryCode="PF" value="689">French Polynesia (+689)</option>
                                    <option data-countryCode="GA" value="241">Gabon (+241)</option>
                                    <option data-countryCode="GM" value="220">Gambia (+220)</option>
                                    <option data-countryCode="GE" value="7880">Georgia (+7880)</option>
                                    <option data-countryCode="DE" value="49">Germany (+49)</option>
                                    <option data-countryCode="GH" value="233">Ghana (+233)</option>
                                    <option data-countryCode="GI" value="350">Gibraltar (+350)</option>
                                    <option data-countryCode="GR" value="30">Greece (+30)</option>
                                    <option data-countryCode="GL" value="299">Greenland (+299)</option>
                                    <option data-countryCode="GD" value="1473">Grenada (+1473)</option>
                                    <option data-countryCode="GP" value="590">Guadeloupe (+590)</option>
                                    <option data-countryCode="GU" value="671">Guam (+671)</option>
                                    <option data-countryCode="GT" value="502">Guatemala (+502)</option>
                                    <option data-countryCode="GN" value="224">Guinea (+224)</option>
                                    <option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option>
                                    <option data-countryCode="GY" value="592">Guyana (+592)</option>
                                    <option data-countryCode="HT" value="509">Haiti (+509)</option>
                                    <option data-countryCode="HN" value="504">Honduras (+504)</option>
                                    <option data-countryCode="HK" value="852">Hong Kong (+852)</option>
                                    <option data-countryCode="HU" value="36">Hungary (+36)</option>
                                    <option data-countryCode="IS" value="354">Iceland (+354)</option>
                                    <option data-countryCode="ID" value="62">Indonesia (+62)</option>
                                    <option data-countryCode="IR" value="98">Iran (+98)</option>
                                    <option data-countryCode="IQ" value="964">Iraq (+964)</option>
                                    <option data-countryCode="IE" value="353">Ireland (+353)</option>
                                    <option data-countryCode="IL" value="972">Israel (+972)</option>
                                    <option data-countryCode="IT" value="39">Italy (+39)</option>
                                    <option data-countryCode="JM" value="1876">Jamaica (+1876)</option>
                                    <option data-countryCode="JP" value="81">Japan (+81)</option>
                                    <option data-countryCode="JO" value="962">Jordan (+962)</option>
                                    <option data-countryCode="KZ" value="7">Kazakhstan (+7)</option>
                                    <option data-countryCode="KE" value="254">Kenya (+254)</option>
                                    <option data-countryCode="KI" value="686">Kiribati (+686)</option>
                                    <option data-countryCode="KP" value="850">Korea North (+850)</option>
                                    <option data-countryCode="KR" value="82">Korea South (+82)</option>
                                    <option data-countryCode="KW" value="965">Kuwait (+965)</option>
                                    <option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option>
                                    <option data-countryCode="LA" value="856">Laos (+856)</option>
                                    <option data-countryCode="LV" value="371">Latvia (+371)</option>
                                    <option data-countryCode="LB" value="961">Lebanon (+961)</option>
                                    <option data-countryCode="LS" value="266">Lesotho (+266)</option>
                                    <option data-countryCode="LR" value="231">Liberia (+231)</option>
                                    <option data-countryCode="LY" value="218">Libya (+218)</option>
                                    <option data-countryCode="LI" value="417">Liechtenstein (+417)</option>
                                    <option data-countryCode="LT" value="370">Lithuania (+370)</option>
                                    <option data-countryCode="LU" value="352">Luxembourg (+352)</option>
                                    <option data-countryCode="MO" value="853">Macao (+853)</option>
                                    <option data-countryCode="MK" value="389">Macedonia (+389)</option>
                                    <option data-countryCode="MG" value="261">Madagascar (+261)</option>
                                    <option data-countryCode="MW" value="265">Malawi (+265)</option>
                                    <option data-countryCode="MY" value="60">Malaysia (+60)</option>
                                    <option data-countryCode="MV" value="960">Maldives (+960)</option>
                                    <option data-countryCode="ML" value="223">Mali (+223)</option>
                                    <option data-countryCode="MT" value="356">Malta (+356)</option>
                                    <option data-countryCode="MH" value="692">Marshall Islands (+692)</option>
                                    <option data-countryCode="MQ" value="596">Martinique (+596)</option>
                                    <option data-countryCode="MR" value="222">Mauritania (+222)</option>
                                    <option data-countryCode="YT" value="269">Mayotte (+269)</option>
                                    <option data-countryCode="MX" value="52">Mexico (+52)</option>
                                    <option data-countryCode="FM" value="691">Micronesia (+691)</option>
                                    <option data-countryCode="MD" value="373">Moldova (+373)</option>
                                    <option data-countryCode="MC" value="377">Monaco (+377)</option>
                                    <option data-countryCode="MN" value="976">Mongolia (+976)</option>
                                    <option data-countryCode="MS" value="1664">Montserrat (+1664)</option>
                                    <option data-countryCode="MA" value="212">Morocco (+212)</option>
                                    <option data-countryCode="MZ" value="258">Mozambique (+258)</option>
                                    <option data-countryCode="MN" value="95">Myanmar (+95)</option>
                                    <option data-countryCode="NA" value="264">Namibia (+264)</option>
                                    <option data-countryCode="NR" value="674">Nauru (+674)</option>
                                    <option data-countryCode="NP" value="977">Nepal (+977)</option>
                                    <option data-countryCode="NL" value="31">Netherlands (+31)</option>
                                    <option data-countryCode="NC" value="687">New Caledonia (+687)</option>
                                    <option data-countryCode="NZ" value="64">New Zealand (+64)</option>
                                    <option data-countryCode="NI" value="505">Nicaragua (+505)</option>
                                    <option data-countryCode="NE" value="227">Niger (+227)</option>
                                    <option data-countryCode="NG" value="234">Nigeria (+234)</option>
                                    <option data-countryCode="NU" value="683">Niue (+683)</option>
                                    <option data-countryCode="NF" value="672">Norfolk Islands (+672)</option>
                                    <option data-countryCode="NP" value="670">Northern Marianas (+670)</option>
                                    <option data-countryCode="NO" value="47">Norway (+47)</option>
                                    <option data-countryCode="OM" value="968">Oman (+968)</option>
                                    <option data-countryCode="PW" value="680">Palau (+680)</option>
                                    <option data-countryCode="PA" value="507">Panama (+507)</option>
                                    <option data-countryCode="PG" value="675">Papua New Guinea (+675)</option>
                                    <option data-countryCode="PY" value="595">Paraguay (+595)</option>
                                    <option data-countryCode="PE" value="51">Peru (+51)</option>
                                    <option data-countryCode="PH" value="63">Philippines (+63)</option>
                                    <option data-countryCode="PL" value="48">Poland (+48)</option>
                                    <option data-countryCode="PT" value="351">Portugal (+351)</option>
                                    <option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option>
                                    <option data-countryCode="QA" value="974">Qatar (+974)</option>
                                    <option data-countryCode="RE" value="262">Reunion (+262)</option>
                                    <option data-countryCode="RO" value="40">Romania (+40)</option>
                                    <option data-countryCode="RU" value="7">Russia (+7)</option>
                                    <option data-countryCode="RW" value="250">Rwanda (+250)</option>
                                    <option data-countryCode="SM" value="378">San Marino (+378)</option>
                                    <option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                                    <option data-countryCode="SA" value="966">Saudi Arabia (+966)</option>
                                    <option data-countryCode="SN" value="221">Senegal (+221)</option>
                                    <option data-countryCode="CS" value="381">Serbia (+381)</option>
                                    <option data-countryCode="SC" value="248">Seychelles (+248)</option>
                                    <option data-countryCode="SL" value="232">Sierra Leone (+232)</option>
                                    <option data-countryCode="SG" value="65">Singapore (+65)</option>
                                    <option data-countryCode="SK" value="421">Slovak Republic (+421)</option>
                                    <option data-countryCode="SI" value="386">Slovenia (+386)</option>
                                    <option data-countryCode="SB" value="677">Solomon Islands (+677)</option>
                                    <option data-countryCode="SO" value="252">Somalia (+252)</option>
                                    <option data-countryCode="ZA" value="27">South Africa (+27)</option>
                                    <option data-countryCode="ES" value="34">Spain (+34)</option>
                                    <option data-countryCode="LK" value="94">Sri Lanka (+94)</option>
                                    <option data-countryCode="SH" value="290">St. Helena (+290)</option>
                                    <option data-countryCode="KN" value="1869">St. Kitts (+1869)</option>
                                    <option data-countryCode="SC" value="1758">St. Lucia (+1758)</option>
                                    <option data-countryCode="SD" value="249">Sudan (+249)</option>
                                    <option data-countryCode="SR" value="597">Suriname (+597)</option>
                                    <option data-countryCode="SZ" value="268">Swaziland (+268)</option>
                                    <option data-countryCode="SE" value="46">Sweden (+46)</option>
                                    <option data-countryCode="CH" value="41">Switzerland (+41)</option>
                                    <option data-countryCode="SI" value="963">Syria (+963)</option>
                                    <option data-countryCode="TW" value="886">Taiwan (+886)</option>
                                    <option data-countryCode="TJ" value="7">Tajikstan (+7)</option>
                                    <option data-countryCode="TH" value="66">Thailand (+66)</option>
                                    <option data-countryCode="TG" value="228">Togo (+228)</option>
                                    <option data-countryCode="TO" value="676">Tonga (+676)</option>
                                    <option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                                    <option data-countryCode="TN" value="216">Tunisia (+216)</option>
                                    <option data-countryCode="TR" value="90">Turkey (+90)</option>
                                    <option data-countryCode="TM" value="7">Turkmenistan (+7)</option>
                                    <option data-countryCode="TM" value="993">Turkmenistan (+993)</option>
                                    <option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                                    <option data-countryCode="TV" value="688">Tuvalu (+688)</option>
                                    <option data-countryCode="UG" value="256">Uganda (+256)</option>
                                    <option data-countryCode="UA" value="380">Ukraine (+380)</option>
                                    <option data-countryCode="AE" value="971">United Arab Emirates (+971)</option>
                                    <option data-countryCode="UY" value="598">Uruguay (+598)</option>
                                    <option data-countryCode="UZ" value="7">Uzbekistan (+7)</option>
                                    <option data-countryCode="VU" value="678">Vanuatu (+678)</option>
                                    <option data-countryCode="VA" value="379">Vatican City (+379)</option>
                                    <option data-countryCode="VE" value="58">Venezuela (+58)</option>
                                    <option data-countryCode="VN" value="84">Vietnam (+84)</option>
                                    <option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option>
                                    <option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option>
                                    <option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                                    <option data-countryCode="YE" value="969">Yemen (North)(+969)</option>
                                    <option data-countryCode="YE" value="967">Yemen (South)(+967)</option>
                                    <option data-countryCode="ZM" value="260">Zambia (+260)</option>
                                    <option data-countryCode="ZW" value="263">Zimbabwe (+263)</option>
                                  </optgroup>
                                </select>
                              </div>
                            </div>
                            <div className="col-8 mb-4">
                              <div className="field-box">
                                <DefaultInput
                                  errorStatus={
                                    validateNumber(number)
                                  }
                                  errorMessage={validateNumber(number)}
                                  name="mobile" type="number" placeholder="Enter mobile number" value={number} onChange={(e) => setNumber(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">Date of birth</label>

                                {/*  <DefaultInput
                                      errorStatus={
                                        infoDobstatus(infoDob)
                                      }
                                      errorMessage={infoDobstatus(infoDob)}

                                      type="date" placeholder="" max={getEighteenYearsAgoDate()} value={infoDob} name="infoDob" onChange={(event) => setInfoDob(event.target.value)}
                                    /> */}


                                <input type="date" placeholder="ddd" max={getEighteenYearsAgoDate()} value={infoDob} name="infoDob" onChange={(event) => setInfoDob(event.target.value)} />
                              </div>
                            </div>

                            <div className="col-md-4 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">City</label>
                                <input type="text" placeholder="" value={city} name="city" onChange={(event) => setCity(event.target.value)} />
                              </div>
                            </div>

                            <div className="col-md-4 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">State</label>
                                <input type="text" placeholder="" value={infoState} name="state" onChange={(event) => setInfoState(event.target.value)} />
                              </div>
                            </div>

                            <div className="col-md-4 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">Pin Code</label>

                                <DefaultInput
                                  errorStatus={
                                    postCode(zipCode)
                                  }
                                  errorMessage={postCode(zipCode)}
                                  type="text" class="form-control" value={zipCode} name="zipCode" onChange={(event) => setZipCode(event.target.value)}
                                />

                              </div>
                            </div>

                            <div className="col-md-12 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">Address</label>
                                <input type="text" placeholder="" value={address} name="address" onChange={(event) => setAddress(event.target.value)} />
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="mb-4 pt-6">
                          <h5 className="title ">
                            Pan Card
                          </h5>
                        </div>
                        <div className="form-field-wrapper ">
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label">Pan Card Number</label>
                                <DefaultInput type="text" name="panCard" value={panCard} errorStatus={validatePanCard(panCard) !== undefined && notEqualsZero(panCard)} errorMessage={validatePanCard(panCard)} onChange={(event) => setPanCard(event.target.value.toUpperCase())} />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className="field-box">
                                <label for="name" className="form-label"> Confirm Pan Card Number</label>
                                <DefaultInput type="text" name="rePanCard" value={rePanCard} errorStatus={validatePanCard(rePanCard) !== undefined && notEqualsZero(rePanCard) || matchPanCard(panCard, rePanCard)} errorMessage={validatePanCard(rePanCard) || matchPanCard(panCard, rePanCard)} onChange={(event) => setRePanCard(event.target.value.toUpperCase())} />

                              </div>
                            </div>
                            <div className="col-md-12 upload-area" >
                              <div className="upload-formate mb-3">
                                <h6 className="title mb-1">
                                  Upload Item File
                                </h6>
                              </div>
                              <div className="brows-file-wrapper">
                                <input name="file" id="file" type="file" className="inputfile"
                                  data-multiple-caption="{count} files selected" multiple onChange={handleChangePanCard}
                                />

                                {localPanCanrd === "" ?
                                  <label for="file" title="No File Choosen">
                                    <i className="ri-upload-cloud-line"></i>
                                    <span className="text-center mb-2">Choose a File</span>
                                    < span className="file-type text-center mt--10">Drag or choose your file to upload</span>
                                  </label>
                                  : <label for="file" title="No File Choosen">
                                    <i className=" text-success ri-check-double-fill"></i>
                                    <span className="text-center mb-2">File Uploaded</span>
                                    <span className="file-type text-center mt--10" >{localPanCanrd}</span>
                                  </label>
                                }

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 pt-6">
                          <h5 className="title ">
                            Document Type
                          </h5>
                        </div>
                        <div className="form-field-wrapper ">
                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="field-box">
                                <label for="sizes" className="form-label">Select Document Type</label>

                                <select name="docType" onChange={(event) => {
                                  setAadhar("");
                                  setDocType(event.target.value)
                                  handleSelected(event.target.value === "Aadhar card" ? 1 : event.target.value === "Driving License" ? 2 : event.target.value === "Other" ? 3 : undefined)
                                }}  >
                                  <option value="Aadhar card" >Aadhar card </option>
                                  <option value="Driving License" >Driving License </option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <div className={`field-box ${isShow !== 1 && "d-none"}`} id="aadhar">
                                <label for="name" className="form-label">Aadhar Number</label>
                                <DefaultInput type="text" name="aadhar" value={aadhar} errorStatus={aadharNum(aadhar) !== undefined && notEqualsZero(aadhar)} errorMessage={aadharNum(aadhar)}
                                  onChange={(event) => setAadhar(event.target.value)} />

                              </div>

                              <div className={`field-box ${isShow !== 2 && "d-none"}`}>
                                <label for="name" className="form-label">Driving License Number</label>
                                <DefaultInput type="text" name="aadhar" value={aadhar} errorStatus={drivingLicense(aadhar) !== undefined && notEqualsZero(aadhar)} errorMessage={drivingLicense(aadhar)} onChange={(event) => setAadhar(event.target.value.toUpperCase())} />

                              </div>

                              <div className={`field-box ${isShow !== 3 && "d-none"}`}>
                                <label for="name" className="form-label">Other Document Number</label>
                                <DefaultInput type="text" name="aadhar" value={aadhar} errorStatus={documentNum(aadhar) !== undefined && notEqualsZero(aadhar)} errorMessage={documentNum(aadhar)} onChange={(event) => setAadhar(event.target.value)} />

                              </div>

                            </div>
                            <div className="col-md-6 upload-area" >
                              <div className="upload-formate mb-3">
                                <h6 className="title mb-1">
                                  Front Image
                                </h6>
                              </div>
                              <div className="brows-file-wrapper">
                                <input name="file" type="file" className="inputfile"
                                  data-multiple-caption="{count} files selected" onChange={handleChangeIdentity} />

                                {localFrontImage === "" ?
                                  <label for="file" title="No File Choosen">
                                    <i className="ri-upload-cloud-line"></i>
                                    <span className="text-center mb-2">Choose a File</span>
                                    < span className="file-type text-center mt--10">Drag or choose your file to upload</span>
                                  </label>
                                  : <label for="file" title="No File Choosen">
                                    <i className=" text-success ri-check-double-fill"></i>
                                    <span className="text-center mb-2">File Uploaded</span>
                                    <span className="file-type text-center mt--10" >{localFrontImage}</span>
                                  </label>
                                }

                              </div>
                            </div>
                            <div className="col-md-6 upload-area" >
                              <div className="upload-formate mb-3">
                                <h6 className="title mb-1">
                                  Back Image
                                </h6>
                              </div>
                              <div className="brows-file-wrapper">
                                <input name="file" type="file" className="inputfile" onChange={handleChangeIdentity2} />

                                {localBackImage === "" ?
                                  <label for="file" title="No File Choosen">
                                    <i className="ri-upload-cloud-line"></i>
                                    <span className="text-center mb-2">Choose a File</span>
                                    < span className="file-type text-center mt--10">Drag or choose your file to upload</span>
                                  </label>
                                  : <label for="file" title="No File Choosen">
                                    <i className=" text-success ri-check-double-fill"></i>
                                    <span className="text-center mb-2">File Uploaded</span>
                                    <span className="file-type text-center mt--10" >{localBackImage}</span>
                                  </label>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 pt-6">
                          <h5 className="title ">
                            Upload Your Image(Selfie)
                          </h5>
                        </div>
                        <div className="form-field-wrapper">
                          <div className="row">
                            <div className="col-md-12 upload-area">
                              <div className="brows-file-wrapper">
                                <input name="file" type="file" className="inputfile"
                                  onChange={handleChangeSelfie} />

                                {localSelfieName === "" ?
                                  <label for="file" title="No File Choosen">
                                    <i className="ri-upload-cloud-line"></i>
                                    <span className="text-center mb-2">Choose a File</span>
                                    < span className="file-type text-center mt--10">Drag or choose your file to upload</span>
                                  </label>
                                  : <label for="file" title="No File Choosen">
                                    <i className=" text-success ri-check-double-fill"></i>
                                    <span className="text-center mb-2">File Uploaded</span>
                                    <span className="file-type text-center mt--10" >{localSelfieName}</span>
                                  </label>
                                }

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 pt-6">
                          <h5 className="title ">
                            Upload Your Cancel Cheque
                          </h5>
                        </div>
                        <div className="form-field-wrapper">
                          <div className="row">
                            <div className="col-md-12 upload-area">
                              <div className="brows-file-wrapper">
                                <input name="file" type="file" className="inputfile"
                                  onChange={handleChangeCheque} />

                                {localChequeImage === "" ?
                                  <label for="file" title="No File Choosen">
                                    <i className="ri-upload-cloud-line"></i>
                                    <span className="text-center mb-2">Choose a File</span>
                                    < span className="file-type text-center mt--10">Drag or choose your file to upload</span>
                                  </label>
                                  : <label for="file" title="No File Choosen">
                                    <i className=" text-success ri-check-double-fill"></i>
                                    <span className="text-center mb-2">File Uploaded</span>
                                    <span className="file-type text-center mt--10" >{localChequeImage}</span>
                                  </label>
                                }

                              </div>
                            </div>
                          </div>
                        </div>
                        <KycButton
                          disabled={!number || !panCard
                            || !(
                              validateNumber(number) === undefined
                            )
                            || !(
                              validatePanCard(panCard) === undefined
                            )
                          } onClick={() => handleKyc(infoCountry, kycType, firstName, lastName, gender, number, infoDob, address, infoState, city, zipCode, aadhar, panCard, localFront, localBack, localSelfie, localPanCard, docType, chequeImage)}><span>Submit for verification</span>
                        </KycButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
        }
      </section >
    </>
  );
}

export default KycPage;