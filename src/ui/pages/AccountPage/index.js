import React, { useEffect, useState } from "react";
import BankAccount from "../BankAccount";
import CurrencyPrefrence from "../CurrencyPrefrence";
import KycPage from "../KycPage";
import NotificationPage from "../NotificationPage";
import TwofactorPage from "../TwofactorPage";
import SecurityPage from "../SecurityPage";
import ActivitylogPage from "../ActivitylogPage";
import TransferHistory from "../TransferHistory";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";


const AccountPage = () => {


    const [activeTab, setActiveTab] = useState('currency');
    // const email = localStorage.getItem("emailId");
    // console.log(email, 'email');

    const [emailId, setEmailId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        handleDetials();
    }, [])

    const handleDetials = async () => {
        await AuthService.getDetails().then(async result => {
            console.log(result, 'get details');
            if (result) {
                try {
                    LoaderHelper.loaderStatus(false);
                    // alertSuccessMessage(result.message);
                    setEmailId(result?.data[0]?.emailId)
                    setFirstName(result?.data[0]?.firstName)
                    setLastName(result?.data[0]?.lastName)
                } catch (error) {
                    LoaderHelper.loaderStatus(false);
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result);
            }
        });

    }
    console.log(emailId, 'emailId');

    return (
        <>
            {/* Start banner area */}
            <section class="inner-page-banner">
                <div class="container">
                    <div class="inner text-center">
                        <h1 class="title">Account Settings</h1>
                        <nav class="mt-4">
                            <ol class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><a href="/">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Account Settings</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            {/* End banner area */}

            <section class="pb-90 account_sec ">
                <div class="container-fluid fluid-header">
                    <form >
                        <div class="create-item-wrapper my_acc ">
                            <div class="row">
                                <div class="col-lg-3 col-md-12 col-md-4">
                                    {/*  file upload area  */}
                                    <div class=" d-flex align-items-center ">
                                        <img class="img-account-profile rounded-circle me-3" src="images/avatar/user.png" alt="" />
                                        <div>
                                            <h5 class="fw-bolder pp-name fs-4 mb-0">{firstName} {lastName}<small class="text-success ms-2"><i class="ri-checkbox-circle-line"></i></small></h5>
                                            <div class=" text-gray">
                                                <small>{emailId}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="acc_tabs form-field-wrapper mt-5 mb-5">
                                        <ul class="nav nav-pills flex-column" id="cardTab" role="tablist">

                                            <li class="active" onClick={() => setActiveTab('currency')} className={activeTab === 'currency' && 'active'}>
                                                <a class="menu-link  nav-link active" id="Currency-pill" href="#CurrencyPill" data-bs-toggle="tab" role="tab" aria-controls="Currency" aria-selected="true" >
                                                    <span class="menu-bullet"><span class="bullet"></span>
                                                    </span><span class="menu-title"> Currency Preference </span>
                                                </a>
                                            </li>

                                            <li class="active" onClick={() => setActiveTab('kyc')} className={activeTab === 'kyc' && 'active'}>
                                                <a class="menu-link  nav-link" id="kyc" href="#" data-bs-toggle="tab" role="tab" aria-controls="kyc" aria-selected="true" >
                                                    <span class="menu-bullet"><span class="bullet"></span>
                                                    </span><span class="menu-title"> KYC Verification</span></a>
                                            </li>

                                            <li class="active" onClick={() => setActiveTab('bank')} className={activeTab === 'bank' && 'active'}>
                                                <a class="menu-link nav-link" id="Notification-pill" href="#NotificationPill" data-bs-toggle="tab" role="tab" aria-controls="Notification" aria-selected="false"> <span class="menu-bullet"><span class="bullet"></span>
                                                </span><span class="menu-title" > Bank Account Details </span></a>
                                            </li>

                                            <li class="active" onClick={() => setActiveTab('Notification')} className={activeTab === 'Notification' && 'active'}>
                                                <a class="menu-link nav-link" id="Notification-pill" href="#NotificationPill" data-bs-toggle="tab" role="tab" aria-controls="Notification" aria-selected="false">
                                                    <span class="menu-bullet"><span class="bullet"></span>
                                                    </span><span class="menu-title"> Notification</span></a>
                                            </li>

                                            <li class="active" onClick={() => setActiveTab('twofactor')} className={activeTab === 'twofactor' && 'active'}>
                                                <a class="menu-link nav-link" id="Authencation-pill" href="#AuthencationPill" data-bs-toggle="tab" role="tab" aria-controls="Authencation" aria-selected="false"> <span class="menu-bullet"><span class="bullet"></span>
                                                </span><span class="menu-title"> Two Factor Authencation</span></a>
                                            </li>

                                            <li class="active" onClick={() => setActiveTab('security')} className={activeTab === 'security' && 'active'}>
                                                <a class="menu-link nav-link" id="Security-pill" href="#SecurityPill" data-bs-toggle="tab" role="tab" aria-controls="Security" aria-selected="false"> <span class="menu-bullet"><span class="bullet"></span>
                                                </span><span class="menu-title"> Security</span></a>
                                            </li>
                                            <li class="active" onClick={() => setActiveTab('activity')} className={activeTab === 'activity' && 'active'}>
                                                <a class="menu-link  nav-link" id="Activity-pill" href="#ActivityPill" data-bs-toggle="tab" role="tab" aria-controls="Activity" aria-selected="false"> <span class="menu-bullet"><span class="bullet"></span>
                                                </span><span class="menu-title"> Activity Logs</span></a>
                                            </li>
                                            <li class="active" onClick={() => setActiveTab('transferhistory')} className={activeTab === 'transferhistory' && 'active'}>
                                                <a class="menu-link  nav-link" id="Transitions-pill" href="#TransitionsPill" data-bs-toggle="tab" role="tab" aria-controls="example" aria-selected="false"> <span class="menu-bullet"><span class="bullet"></span>
                                                </span><span class="menu-title"> Transfer History</span></a>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                <div className="col-md-9">
                                    {activeTab === "bank" && <BankAccount />}
                                    {activeTab === "kyc" && <KycPage />}
                                    {activeTab === "currency" && <CurrencyPrefrence />}
                                    {activeTab === "Notification" && <NotificationPage />}
                                    {activeTab === "twofactor" && <TwofactorPage />}
                                    {activeTab === "security" && <SecurityPage />}
                                    {activeTab === "activity" && <ActivitylogPage />}
                                    {activeTab === "transferhistory" && <TransferHistory />}
                                </div>
                            </div>

                        </div>
                    </form>

                </div>
            </section>




        </>

    );

}

export default AccountPage;