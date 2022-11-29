import React, { useState, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import HomeService from "../../../api/services/HomeService";
const TransferHistory = () => {

    const { SearchBar } = Search;
    const [transactions, setTransactions] = useState("");
    const [amount, setAmount] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [fees, setFees] = useState("");
    const [transactionType, setTransactiontype] = useState("");
    const [transID, setTransID] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [tdsAmount, setTdsAMount] = useState("");

    useEffect(() => {
        transHistory();
        handleGetRecive();
    }, []);

    const handleGetRecive = async () => {
        await HomeService.getReciveOrder().then(async result => {
        });
    };


    const transHistory = async () => {
        await AuthService.getTransHistory().then(async result => {
            if (result.success) {
                setTransactions(result?.data)
            } else {
                alertErrorMessage(result.message);
            }
        });
    };

    const linkFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <span className={`badge text-white rounded-pill ${row?.status === 'Pending' ? "bg-warning" : row?.status === 'Cancel' ? "bg-danger" :
                    row?.status === "Cancelled" ? "bg-danger" : row?.status === 'Completed' ? "bg-success" : null} `}>{row?.status}</span>
            </div>
        );
    };

    const PairFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="cursor_pointer" data-bs-toggle="modal" data-bs-target="#transfer_history" onClick={() => getTransactionDetail(row)}>
                <span > {row?.coin} </span>
            </div>
        );
    };

    const AmountFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="cursor_pointer" data-bs-toggle="modal" data-bs-target="#transfer_history" onClick={() => getTransactionDetail(row)}>
                <span > {(row?.amount).toFixed(2)} </span>
            </div>
        );
    };

    const QuantityFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="cursor_pointer" data-bs-toggle="modal" data-bs-target="#transfer_history" onClick={() => getTransactionDetail(row)}>
                <span > {row?.quantity} </span>
            </div>
        );
    };

    const FeesFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="cursor_pointer" data-bs-toggle="modal" data-bs-target="#transfer_history" onClick={() => getTransactionDetail(row)}>
                <span>
                    {!row?.tdsAmount ? 0 : parseFloat(row?.tdsAmount).toFixed(5)}
                </span>
            </div>
        );
    };

    const TransactionFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="cursor_pointer" data-bs-toggle="modal" data-bs-target="#transfer_history" onClick={() => getTransactionDetail(row)}>
                <span > {row?.transType} </span>
            </div>
        );
    };

    const columns = [
        { dataField: 'coinSymbol', text: 'Pair', sort: true, formatter: PairFollow },
        { dataField: 'amount', text: 'Amount', sort: true, formatter: AmountFollow },
        { dataField: 'quantity', text: 'Quantity', sort: true, formatter: QuantityFollow },
        { dataField: 'tdsAmount', text: 'TDS Amount', sort: true, formatter: FeesFollow },
        { dataField: 'transType', text: 'Transaction Type', sort: true, formatter: TransactionFollow },
        { dataField: 'status', text: 'Status', formatter: linkFollow },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 7,
        lastPageText: '>>',
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        alwaysShowAllBtns: true,
    });


    const getTransactionDetail = (transaction) => {
        setAmount(transaction?.amount);
        setPrice(transaction?.price);
        setCreatedAt(transaction?.createdAt);
        setFees(transaction?.fees);
        setTransactiontype(transaction?.transType);
        setTdsAMount(transaction?.tdsAmount);
        setTransID(transaction?._id);
        setStatus(transaction?.status)
    }

    return (
        <>
            <div class="tab-pane" id="TransitionsPill" role="tabpanel" aria-labelledby="Transitions-pill">
                <div class="upload-formate mb-6 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 class="mb-1">
                            Transfer History Details
                        </h3>
                        {/*  <p class="formate mb-0">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p> */}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 m-auto">
                        <div class="form-field-wrapper table_scroll p-0 switch_btn  border-dashed border-gray-300 bg-lighten card-rounded ">
                            <div class=" ">
                                {transactions.length === 0 ?
                                    <div className="favouriteData">
                                        <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                                        <br />
                                        <p className="mt-3 mb-4" > No Data Found. </p>
                                    </div>
                                    :
                                    <table class="table">
                                        {/* <thead style={{ backgroundColor: 'darkgoldenrod' }}>
                                            <tr>
                                                <th> Sr No.</th>
                                                <th> Pair</th>
                                                <th> Amount</th>
                                                <th> Quantity</th>
                                                <th> Fees</th>
                                                <th> Transaction Type</th>
                                                <th> Status</th>
                                            </tr>
                                        </thead> */}


                                        {/* <tbody>
                                            {transactions.map((item, index) =>
                                                <tr key={index} className="cursor_pointer" data-bs-toggle="modal" data-bs-target="#transfer_history" onClick={() => getTransactionDetail(item)} >
                                                    <td class="color-grey">
                                                        {index + 1}
                                                    </td>
                                                    <td class="color-grey">
                                                        {item?.coinSymbol}
                                                    </td>
                                                    <td class="color-grey">
                                                        {item?.amount}
                                                    </td>
                                                    <td class="color-grey">
                                                        {item?.quantity}
                                                    </td>
                                                    <td class="color-grey">
                                                        {!item?.fees ? "0" : item?.fees}
                                                    </td>
                                                    <td class="color-grey">
                                                        {item?.transType}
                                                    </td>
                                                    <td class="color-grey">
                                                        <span className={`badge text-white rounded-pill ${item?.status === 'Pending' ? "bg-warning" : item?.status === 'Cancel' ? "bg-danger" : item?.status === 'Completed' ? "bg-success" : ""} `}>{item?.status}</span>
                                                    </td>
                                                </tr>
                                            )
                                            }
                                        </tbody> */}

                                        <BootstrapTable

                                            bootstrap4
                                            keyField='_id'
                                            columns={columns}
                                            data={transactions}
                                            pagination={pagination}
                                        />


                                    </table>
                                }
                            </div>
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
                        {/* <!-- End modal-header --> */}
                        <div class="modal-body px-8 py-5 body_history">
                            <div class="tt_item ">
                                <span class="tt_disable">Status</span>

                                <span class={`${status === "Completed" ? "badge badge-success" : status === "Cancel" ? "badge badge-danger" : status === "Pending" ? "badge badge-warning" : ""}`} ><strong>{status}</strong></span>
                            </div>
                            <div class="tt_data">
                                <div class="tt_item">
                                    <span class="tt_disable">Transaction Type</span>
                                    <span class="tt_normal">
                                        <b> {transactionType}</b>
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
            {/* TransHistory modal */}
        </>
    );
}

export default TransferHistory;