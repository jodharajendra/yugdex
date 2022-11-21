import React, { useState, useEffect } from "react";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
const CurrencyPrefrence = () => {

    const [currencyType, setCurrencyType] = useState();
    const [currency, setCurrency] = useState();



    const handleInputChange = (event) => {
        setCurrencyType(event.target.id);
    }

    const handleCurrency = async (currencyType) => {
        await AuthService.setCurrency(currencyType).then(async result => {
            if (result.message === "Currency Updated") {
                try {
                    alertSuccessMessage(result.message);
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
                setCurrency(result?.data?.currPrefrence)
            } else {
                alertErrorMessage(result.message);
            }
        });
    };

    const resetInput = () => {
        setCurrency("");
    }

    return (
        <>
            <div class="tab-pane  active show" id="CurrencyPill" role="tabpanel" aria-labelledby="Currency-pill">
                <div class="upload-formate mb-6  ">
                    <h3 class="mb-1">
                        Currency Preference
                    </h3>
                    <p class="formate">
                        Select your preferred display currency for all markets
                    </p>
                </div>
                <div class=" row py-4">
                    <div class="col-md-12 col-lg-8 m-auto">
                        <div class="row">

                            <div class="col-md-6">
                                <label class="card-radio-btn mb-3 ">
                                    <input type="radio" name="bitcoin" className={`card-input-element d-none${currency === "USDT" ? "card-input-element d-none active" : ""}`} id="USDT" onChange={handleInputChange} onClick={resetInput} />
                                    <div class="card card-body">
                                        <img src="images/coins/tether.png" class="img-fluid check_img" />
                                        <div class="content_head">Tether USD (USDT)</div>
                                    </div>
                                </label>

                            </div>
                            <div class="col-md-6">
                                <label class="card-radio-btn mb-3 ">
                                    <input type="radio" name="bitcoin" className={`card-input-element d-none${currency === "BTC" ? "card-input-element d-none active" : ""}`} id="BTC" onChange={handleInputChange} onClick={resetInput} />
                                    <div class="card card-body">
                                        <img src="images/coins/bitcoin.png" class="img-fluid check_img" />
                                        <div class="content_head">Bitcoin (BTC)</div>
                                    </div>
                                </label>

                            </div>
                            <div class="col-md-6">
                                <label class="card-radio-btn mb-3">
                                    <input type="radio" name="bitcoin" className={`card-input-element d-none${currency === "INR" ? "card-input-element d-none active" : ""}`} id="INR" onChange={handleInputChange} onClick={resetInput} />
                                    <div class="card card-body">
                                        <img src="images/coins/rupee.png" class="img-fluid check_img" />
                                        <div class="content_head"> Rupee (INR)</div>
                                    </div>
                                </label>

                            </div>
                            <div class="col-md-6">

                                <label class="card-radio-btn ">
                                    <input type="radio" name="bitcoin" className={`card-input-element d-none${currency === "BNB" ? "card-input-element d-none active" : ""}`} id="BNB" onChange={handleInputChange} onClick={resetInput} />
                                    <div class="card card-body">
                                        <img src="images/coins/bnb.png" class="img-fluid check_img" />
                                        <div class="content_head">BNB</div>
                                    </div>
                                </label>
                            </div>

                        </div>
                        <button class=" mt-5 btn btn-gradient btn-medium justify-content-center w-100" type="button" onClick={() => handleCurrency(currencyType)}><span> Save Currency Preference </span></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CurrencyPrefrence;