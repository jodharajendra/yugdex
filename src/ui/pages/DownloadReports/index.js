import React, { useState, useEffect } from "react";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";

const DownloadReports = () => {
    const [tradingReport, setTradingReport] = useState("Current Month");

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "tradingReport":
                setTradingReport(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleTredingReport = async (tradingReport) => {
        await AuthService.getTredingReport(tradingReport).then(async result => {
            if (result.msg === 'Send Successfully') {
                alertSuccessMessage(result.msg)
                LoaderHelper.loaderStatus(false);
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }

    return (
        <>
            <div class="tab-pane  active show" id="CurrencyPill" role="tabpanel" aria-labelledby="Currency-pill">
                <div class="upload-formate mb-6  ">
                    <h3 class="mb-1">
                        Download Reports
                    </h3>
                    <p class="formate">
                        Get your trading report on your email.
                    </p>
                </div>
                <div class=" row py-4">
                    <div class="col-md-12 col-lg-8 m-auto">
                        <div class="form-field-wrapper">
                            <div className="field-box " >
                                <select id="inputGroupSelect01" onChange={handleInputChange} name="tradingReport" value={tradingReport}>
                                    <option value="Current Month">Current Month</option>
                                    <option value="Last 30 Days">Last 30 Days</option>
                                    <option value="Last 60 Days">Last 60 Days</option>
                                    <option value="Last 90 Days">Last 90 Days</option>
                                    <option value="Financial Year 2020-21">Financial Year 2020-21</option>
                                    <option value="Financial Year 2021-22">Financial Year 2021-22</option>
                                </select>
                            </div>

                            <span class="sc-gsTEea ffCUrw  mb-3 mt-2">From 01 May, 2022 to 25 May, 2022</span>
                            <span color="rgb(72, 81, 86)" class="sc-gsTEea kvuTVX">The report will include:</span>
                            <ul class="settings-section-body-list">
                                <li>Exchange Trades</li>
                                <li>Current Coin Balance</li>
                                <li>Deposit and Withdrawals</li>
                                <li>Ledger History</li>
                                <li>Airdrops and other distributions</li>
                            </ul>
                            <button type="button" class="btn btn-gradient text-center  mt-3 w-100">
                                <span className="m-auto" onClick={() => handleTredingReport(tradingReport)}>
                                    Request Trading Report
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DownloadReports;