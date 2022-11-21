import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { validAccountno, validIfscCode } from "../../../utils/Validation";
import DefaultInput from "../../../customComponent/DefaultInput";

const BankAccount = () => {
    /* Bank tab Funcationlty Start */
    const [holderName, setHolderName] = useState('');
    const [bankName, setBankname] = useState('');
    const [branchAddress, setBranchAddress] = useState();
    const [accountNumber, setAccountNumber] = useState('');
    const [accountType, setaccountType] = useState('Saving');
    const [ifscCode, setIfscCode] = useState('');
    const [bankdetails, setBankDetails] = useState([]);
    const [acNumber, setAcNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [account, setAccount] = useState('');
    const [branch, setBranch] = useState('');
    const [bankname, setbankname] = useState('');
    const [ifscList, setIfscList] = useState('');



    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "bankName":
                setBankname(event.target.value);
                console.log(event.target.value);
                break;
            case "branchAddress":
                setBranchAddress(event.target.value);
                // handleIfsc(ifscCode);
                console.log(event.target.value);
                break;
            case "accountNumber":
                setAccountNumber(event.target.value);
                console.log(event.target.value);
                break;
            case "accountType":
                setaccountType(event.target.value);
                console.log(event.target.value);
                break;
            case "ifscCode":
                setIfscCode(event.target.value);

                console.log(event.target.value);
                break;
            case "holderName":
                setHolderName(event.target.value);
                console.log(event.target.value);
                break;

            default:
                break;
        }
    }

    const resetInput = () => {
        setHolderName("");
        setIfscCode("");
        setaccountType("");
        setAccountNumber("");
        setBranchAddress("");
    }

    const handleMessageQuery = async (accountType, bankName, holderName, accountNumber, ifscCode, branchAddress) => {
        await AuthService.addBankDetails(accountType, bankName, holderName, accountNumber, ifscCode, branchAddress).then(async result => {
            if (result.message === "Bank Details Updated Sucessfully") {
                try {
                    alertSuccessMessage(result.message);
                    getVerifyDetals();
                    resetInput();
                } catch (error) {
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    }


    useEffect(() => {
        getVerifyDetals();
    }, []);

    const getVerifyDetals = async () => {
        await AuthService.getDetails().then(async result => {
            if (result.sucess) {
                setBankDetails(result?.data?.bankDetails || []);
                setAcNumber(result.data?.bankDetails?.AcNumber)
                setIfsc(result.data?.bankDetails?.ifsc)
                setAccount(result.data?.bankDetails?.accountType.toUpperCase());
                setBranch(result.data?.bankDetails?.Branch.toUpperCase());
                setbankname(result.data?.bankDetails?.BankName.toUpperCase());
            } else {
                alertErrorMessage(result.message);
            }
        });
    };


    const handleIfsc = async (ifscCode) => {
        await AuthService.getIfscDetails(ifscCode).then(async result => {
            if (result?.data === "Invalid IFSC Code") {
                try {
                    // alertSuccessMessage(result?.data);
                    setBranchAddress("");

                } catch (error) {
                    // alertErrorMessage(error);
                    // console.log('error', `${error}`);
                }
            } else {
                // /* alertErrorMessage(result?.data); */
                setBranchAddress(result?.data?.BRANCH);

            }
        });
    }

    return (
        <>
            <div class="upload-formate mb-6 d-flex justify-content-between align-items-center">
                <div>
                    <h3 class="mb-1">
                        Payment Options
                    </h3>
                    <p class="formate mb-0">
                        Select your payment options for all transtions.
                    </p>
                </div>
                <button class=" btn btn-gradient btn-small justify-content-center" data-bs-toggle="modal" data-bs-target="#Withdraw_modal" type="button">
                    <span> Add New</span></button>
            </div>

            {Object.keys(bankdetails).length === 0 ?
                <div className="favouriteData">
                    <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                    <br />
                    <p className="mt-3 mb-4" > No Data Found. </p>
                </div>
                :
                <div class="form-field-wrapper bank-acc mb-3 ">
                    <div class="d-flex align-items-start justify-content-between">
                        <h5 class="text-start">
                            <small>Bank Account</small>
                            <br />{bankname}
                        </h5>
                    </div>
                    <div class="acc_details">
                        <div class="row">
                            <div class="col-md-4">
                                <h5 class="text-start"><small>Account Number</small> <br /> {acNumber}</h5>
                            </div>
                            <div class="col-md-4">
                                <h5 class="text-start"><small>IFSC Code</small> <br />{ifsc}</h5>
                            </div>
                            <div class="col-md-4">
                                <h5 class="text-start"><small>Account Type</small> <br />{account}</h5>
                            </div>
                            <div class="col-md-4">
                                <h5 class="text-start"><small>Branch Address</small> <br />{branch}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* add bank modal */}

            <div class="modal fade" id="Withdraw_modal" tabindex="-1" aria-labelledby="Withdraw_modalLaebl" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header flex-column px-8">
                            <h3 class="modal-title" id="placeBitLaebl">Edit Account details</h3>
                            <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i class="ri-close-fill"></i></button>
                        </div>
                        {/* <!-- End modal-header --> */}
                        <div class="modal-body px-8 py-5">
                            <form >

                                <div class="form-group mb-4 d-inline-block w-100 ">
                                    <label for="royality" class="form-label">Select Bank Type</label>
                                    <select id="royality" name="accountType" className="form-control" value={accountType} onChange={handleInputChange}>
                                        <option value="saving">Saving Account</option>
                                        <option value="Current">Current Account</option>
                                        <option value="deposit">Fixed Deposit account</option>
                                    </select>
                                </div>
                                <div class="form-group mb-4 ">
                                    <label for="bit"> Bank Name </label>
                                    <input type="text" id="bit" className="form-control" name="bankName" value={bankName} onChange={handleInputChange} />
                                </div>
                                <div class="form-group mb-4">
                                    <label for="bit"> Account Holder Name </label>
                                    <input type="text" className="form-control" name="holderName" value={holderName} onChange={handleInputChange} />
                                </div>
                                <div class="form-group mb-4">
                                    <label for="bit"> Account Number</label>
                                    <DefaultInput
                                        errorStatus={
                                            validAccountno(accountNumber)
                                        }
                                        errorMessage={validAccountno(accountNumber)}
                                        id="bit" name="accountNumber" type="number" value={accountNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="form-group mb-4">
                                    <label for="bit"> IFSC Code </label>
                                    <DefaultInput
                                        errorStatus={
                                            validIfscCode(ifscCode)
                                        }
                                        errorMessage={validIfscCode(ifscCode)}
                                        id="bit" name="ifscCode" type="text" className="form-control" value={ifscCode}
                                        onChange={handleInputChange}
                                    />
                                    {/* <input type="text" id="bit" className="form-control" name="ifscCode" value={ifscCode} onChange={handleInputChange} /> */}
                                </div>
                                <div class="form-group mb-4">
                                    <label>Branch Address</label>
                                    <input type="text" className="form-control" name="branchAddress" value={branchAddress} onChange={handleInputChange} onFocus={handleIfsc(ifscCode)} />
                                </div>
                                {/*   <!-- End .form-group --> */}

                            </form>
                        </div>
                        {/* <!-- End modal-body --> */}
                        <div class="modal-footer px-8">
                            <button type="button" class="btn btn-gradient btn-small w-100 justify-content-center" data-bs-dismiss="modal" aria-label="Close"
                                disabled={!accountNumber || !ifscCode
                                    || !(
                                        validAccountno(accountNumber) === undefined

                                    ) || !(
                                        validIfscCode(ifscCode) === undefined

                                    )

                                }
                                onClick={() => handleMessageQuery(accountType, bankName, holderName, accountNumber, ifscCode, branchAddress)}><span>Add Bank</span></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add bank modal */}

        </>
    );
}

export default BankAccount;