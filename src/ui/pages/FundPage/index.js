import React, { useState, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import HomeService from "../../../api/services/HomeService";
import moment from "moment";
import { Link } from "react-router-dom";
import { $ } from "react-jquery-plugin";

const FundPage = () => {

    const [fundData, setfundData] = useState([]);
    const [estimatedportfolio, setEstimatedportfolio] = useState([]);
    const [transactions, setTransactions] = useState("");
    const [amount, setAmount] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [fees, setFees] = useState("");
    const [transactionType, setTransactiontype] = useState("");
    const [transID, setTransID] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [amount_val, setAmount_avl] = useState('');
    const [wallet_Add, setwallet_Add] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [amountVal, setAmountVal] = useState('');
    const [selectedDeposit, setSelectDeposit] = useState('');
    const [selectedChain, setSelectedchain] = useState("");
    const [tdsAmount, setTdsAMount] = useState("");
    const [fee, setFee] = useState('');
    const [status, setStatus] = useState("");
    const [chainInfo, setChainInfo] = useState([]);
    const [inrImage, setInrImage] = useState("");
    const [localInrImage, setLocalInrImage] = useState('');
    const [coinId, setCoinId] = useState([]);


    const handleInputSellChange = (event) => {
        switch (event.target.name) {
            case "amountVal":
                setAmountVal(event.target.value);
                break;
            case "withdrawAmount":
                setWithdrawAmount(event.target.value);
                break;
            case "wallet_Add":
                setwallet_Add(event.target.value);
                break;
            case "amount_val":
                setAmount_avl(event.target.value);
                break;
            case "inrImage":
                setInrImage(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleDeposit = (item) => {
        setSelectedCurrency(item.coinType);
        setSelectDeposit(item.address);
        // handleChain(item.coinType);
        hideAddress();
    }

    const handleWithdrawl = (item) => {
        setSelectedCurrency(item.coinType);
        setCoinId(item?.coinId);
        handleGetFee(item.coinType);
        // handleChain(item.coinType);
    }

    const handleChain = async (selectedCurrency) => {
        LoaderHelper.loaderStatus(true);
        await HomeService.getChain(selectedCurrency).then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setChainInfo(Object.values(result?.data));
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                chainInfo([]);
            }
        });
    };


    const handleGetFee = async (selectedCurrency) => {
        LoaderHelper.loaderStatus(true);
        await HomeService.getFee(selectedCurrency).then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setFee(result?.data?.fee);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
            }
        });
    };

    useEffect(() => {
        getFundData();
        Estimatedportfolio();
    }, []);

    const getFundData = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.getUserfunds().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    if (result?.data?.wallet_addresses.length > 0)
                        setfundData(result?.data?.wallet_addresses);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                //alertErrorMessage(result.success);
            }
        });
    };

    const Estimatedportfolio = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.Estimatedportfolio().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setEstimatedportfolio(result?.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                /* alertErrorMessage(result.success); */
            }

        });
    };

    const transHistory = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.getTransHistory().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                setTransactions(result?.data)
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    };

    const getTransactionDetail = (transaction) => {
        setAmount(transaction?.amount);
        setCreatedAt(transaction?.createdAt);
        setFees(transaction?.fees);
        setTransactiontype(transaction?.transType);
        setTransID(transaction?._id);
        setStatus(transaction?.status);
        setTdsAMount(transaction?.tdsAmount);
    }

    /*  const handleSelectedChain = async (selectedChain, selectedCurrency) => {
         LoaderHelper.loaderStatus(true);
         await HomeService.selectedChains(selectedChain, selectedCurrency).then(async result => {
             if (Object.keys(result).length > 0) {
                 LoaderHelper.loaderStatus(false);
                 try {
                     setSelectDeposit(result?.address);
                     showAddress();
                     alertSuccessMessage(result.message);
                     setAmount("");
                 } catch (error) {
                     alertErrorMessage(error);
                 }
             } else {
                 LoaderHelper.loaderStatus(false);
                 alertErrorMessage(result.message);
             }
         });
     }
  */
    function showAddress() {
        let tab = document.getElementById("bnm");
        tab.classList.add("d-none");
        let tab2 = document.getElementById("zxcv");
        tab2.classList.remove("d-none");
    }

    function hideAddress() {
        let tab = document.getElementById("bnm");
        tab.classList.remove("d-none");
        let tab2 = document.getElementById("zxcv");
        tab2.classList.add("d-none");
    }

    const handleChangeInrImage = async (event) => {
        event.preventDefault();
        const fileUploaded = event.target.files[0];
        setInrImage(event.target.files[0].name);
        const imgata = URL.createObjectURL(fileUploaded);
        setLocalInrImage(fileUploaded);
    }

    const handleDepositCoinInr = async (amount_val, localInrImage) => {
        var formData = new FormData();
        formData.append('amount', amount_val);
        formData.append('depositeslip', localInrImage);
        LoaderHelper.loaderStatus(true);
        await HomeService.depositAmountInr(formData).then(async result => {
            if (result.message === 'Request Submitted to Admin') {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    $("#Deposit_modal").modal('hide');
                    setAmountVal("");
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }

    /*  const handleDepositCoinInr = async (amount_val, inrImage) => {
         LoaderHelper.loaderStatus(true);
         await HomeService.depositAmountInr(amount_val, inrImage).then(async result => {
             if (result.sucess) {
                 LoaderHelper.loaderStatus(false);
                 try {
                     alertSuccessMessage(result.message);
                     setAmountVal("");
                 } catch (error) {
                     alertErrorMessage(error);
                 }
             } else {
                 LoaderHelper.loaderStatus(false);
                 alertErrorMessage(result.message);
             }
         });
     } */

    const handleWithdrawCoinInr = async (withdrawAmount) => {
        LoaderHelper.loaderStatus(true);
        await HomeService.withdrawlAmountInr(withdrawAmount).then(async result => {
            if (result.message === "Request Submitted successfully") {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    setWithdrawAmount("");
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }

    const handleWithdrawCoin = async (wallet_Add, amount_val, coinId) => {
        LoaderHelper.loaderStatus(true);
        await HomeService.withdrawlAmount(wallet_Add, amount_val, coinId).then(async result => {
            LoaderHelper.loaderStatus(false);
            if (result.success) {
                try {
                    alertSuccessMessage(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }


    // console.log(selectedDeposit, 'selectedDeposit');

    return (
        <>
            <section class="inner-page-banner" >
                <div class="container">
                    <div class="inner text-center">
                        <h1 class="title">Funds</h1>
                        <nav class="mt-4">
                            <ol class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Funds</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <section class="">
                <div class="container">
                    <div class="d-flex-between mb-5">
                        <ul class="nav custom-tabs">
                            <li>
                                <a class=" active" data-bs-toggle="tab" href="#funds">Funds</a>
                            </li>
                            <li>
                                <a data-bs-toggle="tab" href="#tt_history" onClick={transHistory}>Transfer History</a>
                            </li>
                        </ul>
                        <div class="d-flex-between bidder">
                            <span>Estimated Portfolio : </span>
                            <div class="d-flex-center ms-1">
                                <span class="text-white">{estimatedportfolio}</span>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content custom-tab-content p-0">
                        <div class="tab-pane fade show container active form-field-wrapper table_scroll p-0 switch_btn  border-dashed border-gray-300 bg-lighten card-rounded" id="funds">
                            <div class="table-responsive">
                                {fundData.length === 0 ?
                                    <div className="favouriteData">
                                        <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                                        <br />
                                        <p className="mt-3 mb-4" > No Data Found. </p>
                                    </div>
                                    :
                                    <table class="table ">
                                        <thead style={{ backgroundColor: 'darkgoldenrod' }}>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>ASSETS</th>
                                                <th>Available Balance</th>
                                                <th>Locked</th>
                                                <th>Total</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fundData.length > 0 ?
                                                fundData.map((item, index) =>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.coinType}</td>
                                                        <td>{parseFloat(item?.spotBalance).toFixed(5)}</td>
                                                        <td>{item?.walletBalance}</td>
                                                        <td>{parseFloat(item?.spotBalance + item?.walletBalance).toFixed(5)}</td>
                                                        <td>
                                                            <a href="#" class=" tb_btn badge badge-success mx-1" data-bs-toggle="modal" data-bs-target="#Deposit_modal" onClick={() => handleDeposit(item)}>
                                                                Deposit
                                                            </a>
                                                            <a href="#" class=" tb_btn  badge badge-danger  mx-1" data-bs-toggle="modal" data-bs-target="#Withdraw_modal" onClick={() => handleWithdrawl(item)} >
                                                                Withdraw
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                                : <tr rowSpan="5" >
                                                    <td colSpan="6">
                                                        <p style={{ textAlign: "center" }}>No data Available</p>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                        <div class="tab-pane container fade form-field-wrapper table_scroll p-0 switch_btn  border-dashed border-gray-300 bg-lighten card-rounded" id="tt_history">
                            <div class="table-responsive">
                                {transactions.length === 0 ?
                                    <div className="favouriteData">
                                        <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                                        <br />
                                        <p className="mt-3 mb-4" > No Data Found. </p>
                                    </div>
                                    :
                                    <table class="table ">
                                        <thead style={{ backgroundColor: 'darkgoldenrod' }}>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Pair</th>
                                                <th>Amount</th>
                                                <th>Quantity</th>
                                                <th>TDS Amount</th>
                                                <th>Transaction Type</th>
                                                <th>Status  </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.length > 0 ?
                                                transactions.map((item, index) =>
                                                    <tr key={index} className="cursor_pointer" data-bs-toggle="modal" data-bs-target="#transfer_history" onClick={() => getTransactionDetail(item)} >

                                                        <td class="color-grey">
                                                            {index + 1}
                                                        </td>
                                                        <td class="color-grey">
                                                            {item?.coin}
                                                        </td>
                                                        <td class="color-grey">
                                                            {parseFloat(item?.amount).toFixed(5)}
                                                        </td>
                                                        <td class="color-grey">
                                                            {item?.quantity}
                                                        </td>
                                                        <td class="color-grey">
                                                            {!item?.tdsAmount ? '0' : parseFloat(item?.tdsAmount).toFixed(5)}
                                                        </td>
                                                        <td class="color-grey">
                                                            {item?.transType}
                                                        </td>
                                                        <td>
                                                            <span class={`${item?.status === "Completed" ? "badge badge-success" : item?.status === "Cancel" ? "badge badge-danger" : item?.status === "Cancelled" ? "badge badge-danger" : item?.status === "Pending" ? "badge badge-warning" : ""}`} >{item?.status}</span>
                                                        </td>

                                                    </tr>
                                                )
                                                : <tr rowSpan="5" >
                                                    <td colSpan="6">
                                                        <p style={{ textAlign: "center" }}>No data Available</p>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal fade" id="Deposit_modal" tabindex="-1" aria-labelledby="Deposit_modalLaebl" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header flex-column px-8">
                            <h3 class="modal-title" id="placeBitLaebl">Deposit Funds</h3>
                            <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i
                                class="ri-close-fill"></i></button>
                        </div>
                        <div class="modal-body px-8 py-5">
                            <form action="#">
                                {selectedCurrency == "INR" ?
                                    <>
                                        <h6 class="flex_amount mb-3"> Bank Account Details</h6> <hr />
                                        <div class="flex_amount mb-3">
                                            <div class="d-flex  flex_a">
                                                <strong>Bank Name :</strong> ICICI BANK
                                            </div>
                                            <div class=" d-flex  flex_a">
                                                <strong>Bank Account Number : </strong> 755001000141
                                            </div>
                                            <div class="d-flex  flex_a">
                                                <strong>Account Holder Name :</strong> BADDETI CHALAPATHI

                                            </div>
                                            <div class=" d-flex  flex_a">
                                                <strong>Branch Name :</strong> Indiranagar 100 feet road
                                            </div>
                                            <div class=" d-flex  flex_a">
                                                <strong>IFSC Code :</strong> ICIC0007550
                                            </div>
                                        </div>
                                        <div className="form-group mb-4" >
                                            <input className="form-control" type="text" name="amountVal" value={amountVal} placeholder="Amount" onChange={handleInputSellChange} />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 upload-area">
                                                <div className="brows-file-wrapper">
                                                    <input name="file" className="inputfile" type="file" onChange={handleChangeInrImage} />
                                                    {inrImage === "" ?
                                                        <label for="file" title="No File Choosen"
                                                            style={{ height: '167px' }}>
                                                            <i className="ri-upload-cloud-line"></i>
                                                            <span className="text-center mb-2">Choose a File</span>
                                                            < span className="file-type text-center mt--10">Drag or choose your file to upload</span>
                                                        </label>
                                                        :
                                                        <label for="file" title="No File Choosen" style={{ height: '167px' }} >
                                                            <i className=" text-success ri-check-double-fill"></i>
                                                            <span className="text-center mb-2">File Uploaded</span>
                                                            <span className="file-type text-center mt--10" >{inrImage}</span>
                                                        </label>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-4" >
                                            <button type="button" className="btn btn-gradient btn-small w-100 justify-content-center" onClick={() => handleDepositCoinInr(amountVal, localInrImage)} disabled={!amountVal}>
                                                <span>Deposit INR</span>
                                            </button>
                                            <small class="mt-1 d-block">
                                                <span className="onceDeposit">Once Deposit It will Take Minimum Two Hours for Confirm </span>
                                            </small>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {/* <div className="" id="bnm">
                                            <div className="form-group mb-4" >
                                                <select name="cars" value={selectedChain} className="" onChange={(e) => setSelectedchain(e.target.value)}>
                                                    <option selected>Select Network</option>
                                                    {chainInfo?.map(item =>
                                                        <option value={item} className="pt-3">{item}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group" >
                                                <button type="button" className="btn btn-gradient btn-small w-100 justify-content-center" onClick={() => handleSelectedChain(selectedChain, selectedCurrency)} disabled={!selectedChain}><span>Submit</span></button>
                                            </div>
                                        </div> */}

                                        <div className="d-none" id="bnm"><img src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${selectedDeposit}&choe=UTF-8`} className="qr_img img-fluid" />
                                            <input className="shareUrl-input copy_url js-shareUrl text-center" type="text" readonly="readonly" value={selectedDeposit} onClick={() => { navigator.clipboard.writeText(selectedDeposit) }} />
                                            <small className="text-center d-block mtb-2" >Click above to copy the Code.</small>
                                            <ul className="disclaimer mt-3">
                                                <label>Disclaimer</label>
                                                <li>• Minimum deposit of 0.0 {selectedCurrency}, deposit below that cannot be recovered.</li>
                                                <li>• Please deposit only {selectedCurrency} on this address. If you deposit any other coin, it will be lost forever.</li>
                                                <li>• This is {selectedChain} deposit address type. Transferring to an unsupported network could result in loss of deposit.</li>
                                            </ul>
                                        </div>
                                    </>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="Withdraw_modal" tabindex="-1" aria-labelledby="Withdraw_modalLaebl" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header flex-column px-8">
                            <h3 class="modal-title" id="placeBitLaebl">Withdraw Funds</h3>
                            <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i
                                class="ri-close-fill"></i></button>
                        </div>
                        <div class="modal-body px-8 py-5">
                            {selectedCurrency == "INR" ?
                                <>
                                    <div className="form-group mb-4" >
                                        <input className="form-control" type="text" name="withdrawAmount" value={withdrawAmount} placeholder="Amount" onChange={handleInputSellChange} />
                                    </div>
                                    <div className="form-group mb-4" >
                                        <button type="button" data-bs-dismiss="modal" className="btn btn-gradient btn-small w-100 justify-content-center" onClick={() => handleWithdrawCoinInr(withdrawAmount)}><span>Withdraw INR</span></button>
                                    </div>
                                </>
                                :
                                <>
                                    {/*  <div className="form-group mb-4" >
                                        <input className="form-control" type="text" value={selectedCurrency} readonly />
                                    </div> */}
                                    <div className="form-group mb-4" >
                                        <input className="form-control" type="text" name="wallet_Add" value={wallet_Add} placeholder="Walle Address" onChange={handleInputSellChange} />
                                    </div>
                                    <div className="form-group mb-4" >
                                        <input className="form-control" type="text" name="amount_val" value={amount_val} placeholder="Amount" onChange={handleInputSellChange} />
                                    </div>
                                    {/*  <div className="form-group mb-4" >
                                        <select name="cars" value={selectedChain} className="" onChange={(e) => setSelectedchain(e.target.value)}>
                                            <option selected>Select Network</option>
                                            {chainInfo?.map(item =>
                                                <option value={item}>{item}</option>
                                            )}
                                        </select>
                                    </div> */}
                                    <div className="form-group mb-4" >
                                        <button type="button" className="btn btn-gradient btn-small w-100 justify-content-center" data-bs-dismiss="modal" onClick={() => handleWithdrawCoin(wallet_Add, amount_val, coinId)}><span>Withdraw</span></button>
                                    </div>
                                    <p>Withdrawal Fee:- {fee}</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* TransHistory modal */}
            <div class="modal fade" id="transfer_history" tabindex="-1" aria-labelledby="transfer_history" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header flex-column px-8">
                            <h3 class="modal-title" id="placeBitLaebl">Transfer History</h3>
                            <button type="button" class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i class="ri-close-fill"></i></button>
                        </div>
                        <div class="modal-body px-8 py-5 body_history">
                            <div class="tt_item ">
                                <span class="tt_disable">Status</span>
                                <span class={`${status === "Completed" ? "badge badge-success" : status === "Cancel" ? "badge badge-danger" : status === "Pending" ? "badge badge-warning" : ""}`} >
                                    <strong>{status}</strong>
                                </span>
                            </div>
                            <div class="tt_data">
                                <div class="tt_item">
                                    <span class="tt_disable">Transaction Type</span>
                                    <span class="tt_normal">
                                        <b>{transactionType}</b>
                                    </span>
                                </div>
                                <div class="tt_item ">
                                    <span class="tt_disable">TDS Amount</span>
                                    <span class="tt_normal"><b>{tdsAmount}</b></span>
                                </div>
                                <div class="tt_item">
                                    <span class="tt_disable">Amount</span>
                                    <span class="tt_normal"><b>{amount}</b></span>
                                </div>
                                <div class="tt_item ">
                                    <span class="tt_disable">Transtion ID</span>
                                    <span class="tt_normal"><b>{transID}</b></span>
                                </div>
                                <div class="tt_item ">
                                    <span class="tt_disable">Date &amp; Time</span>
                                    <span class="tt_normal"><b> {moment(createdAt).format('L')} </b></span>
                                </div>
                                <div class="tt_item ">
                                    <span class="tt_disable">Transaction Fees <br /><small>Incl.of all applicable taxes</small></span>
                                    <span class="tt_normal"><b>{!fees ? "0" : fees}</b></span>
                                </div>
                                <div class="tt_item ">
                                    <span class="tt_disable">Remarks</span>
                                    <span class="tt_normal"><b>yugExchange</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default FundPage;