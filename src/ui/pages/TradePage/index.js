import React, { useState, useEffect } from "react";
import useWebSocket from 'react-use-websocket';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { $ } from 'react-jquery-plugin';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import HomeService from '../../../api/services/HomeService';
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage, alertSuccessMessageTrade } from "../../../customComponent/CustomAlertMessage";
import { ApiConfig } from '../../../api/apiConfig/apiConfig';
import "./trade.css";
import AuthService from "../../../api/services/AuthService";
import TVChartContainer from "../../../customComponent/TVChartContainer";

const TradePage = () => {
  const { state } = useLocation();
  const [buySellOrders, setBuySellOrders] = useState([]);
  const [buySellOrdersHistory, setBuySellOrdersHistory] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [buyActiveOrder, setBuyActiveOrder] = useState([]);
  const [sellActiveOrder, setSellActiveOrder] = useState([]);
  const [infoPlaceOrder, setInfoPlaceOrder] = useState('Limit');
  const [pairData, setPairData] = useState([]);
  const [selectedPairedData, setSelectedPairedData] = useState(state ? state : {});
  const [selectedPairFid, setSelectedPairFid] = useState(state ? state?.fCoinId : '');
  const [selectedPairSid, setSelectedPairSid] = useState(state ? state?.sCoinId : '');
  const [selectedPairData, setSelectedPairData] = useState(state ? state : {});
  const [buyPrice, setBuyPrice] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [buyTotal, setBuyTotal] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [sellTotal, setSellTotal] = useState(0);
  const [buyCoinBal, setBuyCoinBal] = useState(0);
  const [sellCoinBal, setSellCoinBal] = useState(0);
  const [changeTotal, setChangeTotal] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedBuyPercent, setSelectedBuyPercent] = useState(25);
  const [selectedSellPercent, setSelectedSellPercent] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const { webSocketUrl } = ApiConfig;
  const [kycDetail, setkycDetail] = useState("");
  const token = localStorage.getItem("token");

  const getAllActivebuyOrder = async (fid, sid) => {
    await HomeService.getAllActiveOrderBuy(fid, sid).then(async result => {
      if (result?.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setBuyActiveOrder(result?.data || []);
          //setSellActiveOrder(result?.sellOrderData?.data || []);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
        }
      } else {
        setBuyActiveOrder([]);
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage("Something went wrong");
      }
      getAllActiveSellOrder(fid, sid)
    });
  }

  const getAllActiveSellOrder = async (fid, sid) => {
    await HomeService.getAllActiveOrderSell(fid, sid).then(async result => {
      if (result?.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setSellActiveOrder(result?.data || []);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        setSellActiveOrder([]);
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage("Something went wrong");
      }
      if (token) {
        getCoinBuyDetail(fid, sid);
      }
    });
  }

  const getActiveOrders = async (fid, sid) => {
    await HomeService.getActiveOrders(fid, sid).then(async result => {
      if (result?.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setBuySellOrders([...result?.data]);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        setBuySellOrders([...result?.data]);
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage("Something went wrong");
      }
      getCompleteOrders(fid, sid);
    });
  };

  const getCompleteOrders = async (fid, sid) => {
    await HomeService.getCompleteOrders(fid, sid).then(async result => {
      if (result?.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setBuySellOrdersHistory([...result?.data]);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
        }
      } else {
        setBuySellOrdersHistory([...result?.data]);
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage("Something went wrong");
      }
      getMarketTrades(fid, sid);
    });

  };

  const getMarketTrades = async (fid, sid) => {
    await HomeService.getMarketTrades(fid, sid).then(async result => {
      if (result?.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setOrdersHistory(result?.data);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage("Something went wrong");
      }
      getAllActivebuyOrder(fid, sid);
    });
  };

  //Public API that will echo messages sent to it back to the client

  const { lastJsonMessage, } = useWebSocket(webSocketUrl, {
    onOpen: () => console.log('opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    /*  console.log(lastJsonMessage, 'lastJsonMessageRajendra'); */
    if (!search) {
      if (lastJsonMessage && Object.keys(lastJsonMessage).length > 0) {
        setPairData(lastJsonMessage);
        if (Object.keys(selectedPairData).length === 0) {
          let data = lastJsonMessage.filter(item => item?.fname === 'BTC');
          setSelectedPairData(data[0]);
          setSelectedPairedData(data[0])
          setSelectedPairFid(data[0]?.fCoinId);
          setSelectedPairSid(data[0]?.sCoinId);
        } else {
          let data = lastJsonMessage.filter(item => item?._id === selectedPairedData?._id);
          setSelectedPairedData(data[0]);
        }
      }
    }
  }, [lastJsonMessage, pairData]);

  const onSelectPair = (data) => {
    setSelectedPairedData(data);
    setSelectedPairFid(data?.fCoinId);
    setSelectedPairSid(data?.sCoinId);
    setSelectedPairData(data);
    setShowModal(!showModal);
  }

  useEffect(() => {
    if (selectedPairedData.price?.toFixed(5) !== buyPrice) {
      setBuyPrice(selectedPairedData?.price?.toFixed(5));
      let buyTotal = selectedPairedData?.price?.toFixed(5) * 1;
      setBuyTotal(buyTotal);

      setSellPrice(selectedPairedData?.price?.toFixed(5));
      let sellTotal = selectedPairedData?.price?.toFixed(5) * 1;
      setSellTotal(sellTotal);
    }

  }, [selectedPairedData]);

  useEffect(() => {
    setBuyPrice(selectedPairData?.price?.toFixed(5));
    setBuyAmount(1);
    let buyTotal = selectedPairData?.price?.toFixed(5) * 1;
    setBuyTotal(buyTotal);

    setSellPrice(selectedPairData?.price?.toFixed(5));
    setSellAmount(1);
    let sellTotal = selectedPairData?.price?.toFixed(5) * 1;
    setSellTotal(sellTotal);

    if (selectedPairData?.fCoinId && selectedPairData?.sCoinId) {
      if (token) {
        getActiveOrders(selectedPairData?.fCoinId, selectedPairData?.sCoinId);
      } else {
        getMarketTrades(selectedPairData?.fCoinId, selectedPairData?.sCoinId);
      }
    }
  }, [selectedPairData]);

  const getCoinBuyDetail = async (fid, sid) => {
    let buyCoinBal = await getCoinBal(sid);
    setBuyCoinBal(buyCoinBal?.data || 0);
    getCoinSellDetail(fid, sid);
  }

  const getCoinSellDetail = async (fid, sid) => {
    let sellCoinBal = await getCoinBal(fid);
    setSellCoinBal(sellCoinBal?.data || 0);
  }

  const getCoinBal = async (cid) => {


    const coinDetails = await HomeService.getCoinBal(cid);

    LoaderHelper.loaderStatus(false);

    return coinDetails;
  };

  useEffect(() => {
    if (!changeTotal) {
      let buyTotal = (buyPrice * buyAmount)?.toFixed(5);
      setBuyTotal(buyTotal);
    }

  }, [buyPrice, buyAmount]);

  useEffect(() => {
    if (!changeTotal) {
      let buyTotal = (sellPrice * sellAmount)?.toFixed(5);
      setSellTotal(buyTotal);
    }

  }, [sellPrice, sellAmount]);

  useEffect(() => {
    if (changeTotal) {
      let buyAmount = (buyTotal / buyPrice)?.toFixed(5);
      setBuyAmount(buyAmount);
    }

  }, [buyTotal]);

  useEffect(() => {
    if (changeTotal) {
      let sellAmount = (sellTotal / sellPrice)?.toFixed(5);
      setSellAmount(sellAmount);
    }

  }, [sellTotal]);

  const getTotal = (price, amount) => {
    return (price * amount)?.toFixed(5);
  }

  const selectBuyPercent = (percent) => {
    setSelectedBuyPercent(percent);
    let totalPrice = (buyCoinBal * percent) / 100;
    setBuyTotal(totalPrice);
    let amount = (totalPrice / buyPrice);
    setBuyAmount(amount);
  }

  const selectSellPercent = (percent) => {
    setSelectedSellPercent(percent);
    let amount = (sellCoinBal * percent) / 100;
    let totalPrice = (amount * sellPrice);
    setSellTotal(totalPrice);
    setSellAmount(amount);
  }

  useEffect(() => {
    if (search) {
      if (search.length > 2) {
        let mySearch = pairData.filter(item => item?.fname === search.toUpperCase());
        setPairData([...mySearch]);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const openPopup = () => {
    $("#display_name").on("click", function (e) {
      e.preventDefault();
      $("#spotlight").toggleClass("show_spot");
    });
  }

  const handleActiveOrder = async (infoPlaceOrder, per_price, volume, firstCoinId, secondCoinId, orderType) => {
    // if (userData?.identity_status === "2" && userData?.identity_status2 === "2" && userData?.selfie_status === "2") {
    //   handleActive(per_price, volume, firstCoinId, secondCoinId, orderType);
    // } else {
    //   alertErrorMessage('Please verify your kyc first.');
    // }
    handleActive(infoPlaceOrder, per_price, volume, firstCoinId, secondCoinId, orderType);
  };

  const handleActive = async (infoPlaceOrder, per_price, volume, firstCoinId, secondCoinId, orderType) => {
    let price = parseFloat(per_price).toFixed(2);
    await HomeService.activeOrder(infoPlaceOrder, per_price, volume, firstCoinId, secondCoinId, orderType).then(async result => {
      if (result?.success) {
        try {
          LoaderHelper.loaderStatus(false);
          alertSuccessMessageTrade(result.data);
          getActiveOrders(firstCoinId, secondCoinId);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        const errorMessage = result.message;
        alertErrorMessage(errorMessage);
      }
    });
  };

  const handleDelete = async (orderId, odtype) => {
    await HomeService.deleteActiveOrder(orderId, odtype).then(async result => {
      if (result?.success) {
        try {
          LoaderHelper.loaderStatus(false);
          alertSuccessMessage(result.data);
          getActiveOrders(selectedPairFid, selectedPairSid);
        } catch (error) {
          alertErrorMessage(error);
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        const errorMessage = result.message;
        alertErrorMessage(errorMessage);
      }
    });
  }

  useEffect(() => {
    handleDetials();
  }, []);

  const handleDetials = async () => {
    await AuthService.getDetails().then(async result => {
      if (result) {
        setkycDetail(result?.data?.kycVerified)
        /* alertSuccessMessage(result); */
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result);
      }
    });
  }

  /*   console.log(kycDetail,'kycDetail'); */

  return (
    <>
      <div class="trade-wrapper spot">
        <div class="spot-container">
          <div class="spot-container-main">
            <div class="top trade_row ">
              <div class="top-left trade_col pb-0">
                <div class="container-chart-briefing trade_card ">
                  <div className="container-chart-briefing-info">
                    <div className="display-name-asset wm-50" onClick={() => setShowModal(!showModal)}>
                      <h2 id="display_name" className="displayName"><span >{`${selectedPairedData?.fname}/${selectedPairedData?.sname}`}</span><i class="ri-arrow-down-s-line"></i></h2>
                      <div className="asset" style={{ cursor: "pointer" }}>Asset Info</div>
                    </div>
                    <dl className="wm-50" ><dt className="big green">{selectedPairedData?.price?.toFixed(2)}</dt></dl>
                    <dl className="wm-50" ><dt >24H Change</dt>
                      <dd className={selectedPairedData?.pChange >= 0 ? "green" : "red"}>{selectedPairedData?.pChange?.toFixed(2)}</dd>
                    </dl>
                    <dl className="wm-50" ><dt >24h High</dt>
                      <dd >{selectedPairedData?.dHigh}</dd>
                    </dl>
                    <dl className="wm-50" ><dt >24h Low</dt>
                      <dd >{selectedPairedData?.dLow}</dd>
                    </dl>
                    <dl className="wm-50" ><dt >24H Vol</dt>
                      <dd >{selectedPairedData?.volume}</dd>
                    </dl>
                  </div>

                  {showModal ?
                    <div class="spotList show_spot">
                      <div class="spot-container-left">
                        <div class="spot-list-search">
                          <i class="ri-search-2-line"></i>
                          <input autocomplete="off" spellcheck="false" type="text" placeholder="Search" onChange={(event) => setSearch(event.target.value)} class="ivu-input ivu-input-default ivu-input-with-prefix" />
                        </div>
                        <div class="price_card">
                          <div class="price_card_head">
                            <div>Pair</div>
                            <div>Last Price</div>
                            <div>24H%</div>
                          </div>

                          <div class="price_card_body scroll_y" style={{ cursor: 'pointer' }}>
                            {pairData.length > 0 ?
                              pairData.map((item, index) =>
                                <div class="price_item_value">
                                  <span class="" onClick={() => onSelectPair(item)}  >{`${item?.fname}/${item?.sname}`}</span>
                                  <span class="">{item?.price}</span>
                                  <span className={item?.pChange >= 0 ? "text-success" : "text-danger"}>
                                    {item?.pChange?.toFixed(2)}%
                                  </span>
                                </div>
                              ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
                <div class="tv-chart trade_card p-0 overflow-hidden">
                  <div class="containers">
                    {/* <TVChartContainer symbol={`${selectedPairData?.fname}${selectedPairData?.sname}`} /> */}
                    <TradingViewWidget theme={Themes.DARK} width={'100%'} height={'500'} symbol={`${selectedPairData?.fname}${selectedPairData?.sname}`} />
                  </div>
                </div>
              </div>
              {/* <!-- top right --> */}
              <div class=" top-right trade_col">
                <div class="single-widget trade_card trade_card_body">
                  <h4 class="title">Order Book</h4>
                  <div class="d-flex-between trade_tabs w-100 align-items-center buy_sell_cards   ">
                    <ul class="nav custom-tabs nav_order">
                      <li class="buysell-tab">
                        <a class="active" data-bs-toggle="tab" href="#all_orders"> All Orders </a>
                      </li>
                      <li class="buy-tab">
                        <a data-bs-toggle="tab" href="#buy_orders">
                          Buy{" "}
                        </a>
                      </li>
                      <li class="sell-tab">
                        <a data-bs-toggle="tab" href="#sell_orders" class="">
                          Sell
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="tab-content">
                    <div
                      class="tab-pane fade show  px-0 container active"
                      id="all_orders"
                    >
                      <div class="price_card">
                        <div class="price_card_head">
                          <div>Price({selectedPairData?.sname})</div>
                          <div>Quantity({selectedPairData?.fname})</div>
                          <div>
                            Accumulated <br />
                            Volume({selectedPairData?.fname})
                          </div>
                        </div>
                        <div class="price_card_body">
                          {buyActiveOrder.length > 0 ?
                            buyActiveOrder.map((item, index) =>
                              <div class="price_item_value">
                                <span className={item?.orderType === 'Buy' ? "text-success wm-50" : "text-danger wm-50"} >
                                  {(item?.price).toFixed(6)}
                                </span>
                                <span className="wm-50">{(item?.amount).toFixed(6)}</span>
                                <span className="wm-50">{(item?.quantity.toFixed(6))}</span>
                              </div>
                            ) : null}

                        </div>
                        <div class="live_ppc text-success">{selectedPairedData?.price?.toFixed(2)} </div>
                        <div class="price_card_body">
                          {sellActiveOrder.length > 0 ?
                            sellActiveOrder.map((item, index) =>
                              <div class="price_item_value">
                                <span className={item?.orderType === 'Buy' ? "text-success wm-50" : "text-danger wm-50"} >
                                  {(item?.price).toFixed(6)}
                                </span>
                                <span class="wm-50">{(item?.amount).toFixed(6)}</span>
                                <span class="wm-50">{(item?.quantity).toFixed(6)}</span>
                              </div>
                            ) : null}
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade show  px-0 container" id="buy_orders" >
                      <div class="price_card">
                        <div class="price_card_head">
                          <div>Price({selectedPairData?.sname})</div>
                          <div>Quantity({selectedPairData?.fname})</div>
                          <div>
                            Accumulated <br />
                            Volume({selectedPairData?.fname})
                          </div>
                        </div>
                        <div class="price_card_body price_card_body_full">
                          {buyActiveOrder.length > 0 ?
                            buyActiveOrder.map((item, index) =>
                              <div class="price_item_value">
                                <span className={item?.orderType === 'Buy' ? "text-success wm-50" : "text-danger wm-50"} >
                                  {(item?.price).toFixed(6)}</span>
                                <span class="wm-50">{(item?.amount).toFixed(6)}</span>
                                <span class="wm-50">{(item?.quantity).toFixed(6)}</span>
                              </div>
                            ) : null}
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade show  px-0 container" id="sell_orders" >
                      <div class="price_card">
                        <div class="price_card_head">
                          <div>Price({selectedPairData?.sname})</div>
                          <div>Quantity({selectedPairData?.fname})</div>
                          <div>
                            Accumulated <br />
                            Volume({selectedPairData?.fname})
                          </div>
                        </div>
                        <div class="price_card_body price_card_body_full">
                          {sellActiveOrder.length > 0 ?
                            sellActiveOrder.map((item, index) =>
                              <div class="price_item_value">
                                <span className={item?.orderType === 'Buy' ? "text-success wm-50" : "text-danger wm-50"} >
                                  {(item?.price).toFixed(6)}</span>
                                <span class="wm-50">{(item?.amount).toFixed(6)}</span>
                                <span class="wm-50">{(item?.quantity).toFixed(6)}</span>
                              </div>
                            ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom trade_row ">
              <div class="bottom-left trade_col pt-0">
                <div class="trade_card mb-0">
                  <div class="d-flex-between trade_tabs w-100 align-items-center buy_sell_cards   ">
                    <ul class="nav custom-tabs order_his_tabs ">
                      <li class="buysell-tab">
                        <a class="active" data-bs-toggle="tab" href="#open_orders">
                          Open Orders
                        </a>
                      </li>
                      <li class="buysell-tab">
                        <a data-bs-toggle="tab" href="#past_orders">
                          Past Orders{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* {!token ?
                    <span className="must_login" >
                      <div className="login_req" >
                        <a href="/login" className="login_a"  > Login </a>
                        or
                        <a href="/signup" className="login_a"  > Create an Account </a>
                      </div>
                    </span>
                    : */}
                  <div class="tab-content">
                    <div class="tab-pane fade show  px-0 active container" id="open_orders" >
                      <div class="scroll_y">
                        {buySellOrders.length === 0 ?
                          <div className="favouriteData">
                            <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                            <br />
                            <p className="mt-3 mb-4" > No Data Found. </p>
                          </div>
                          :
                          <table class="table  ">
                            <thead>
                              <tr>
                                <th>Pair</th>
                                <th> Price</th>
                                <th>Quantity</th>
                                <th>TDS Amount</th>
                                <th>Total</th>
                                <th> Action </th>
                              </tr>
                            </thead>
                            <tbody>
                              {buySellOrders.length > 0 ?
                                buySellOrders.map((item, index) =>
                                  <tr>
                                    <td>{`${selectedPairData?.fname}/${selectedPairData?.sname}`}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.tdsAmount.toFixed(2)}</td>
                                    <td>{item?.amount.toFixed(2)}</td>
                                    <td>
                                      <a class=" btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(item?._id, 'Buy')}>
                                        <i class="ri-delete-bin-6-line pr-0"></i>
                                      </a>
                                    </td>
                                  </tr>
                                ) : null}
                            </tbody>
                          </table>
                        }
                      </div>
                    </div>
                    <div class="tab-pane fade show  px-0 container" id="past_orders">
                      <div class="scroll_y">
                        {buySellOrdersHistory.length === 0 ?
                          <div className="favouriteData">
                            <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                            <br />
                            <p className="mt-3 mb-4" > No Data Found. </p>
                          </div>
                          :
                          <table class="table  ">
                            <thead>
                              <tr>
                                <th>Pair</th>
                                <th> Price</th>
                                <th>Quantity</th>
                                <th>TDS Amount</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {buySellOrdersHistory.length > 0 ?
                                buySellOrdersHistory.map((item, index) =>
                                  <tr>
                                    <td>{`${selectedPairData?.fname}/${selectedPairData?.sname}`}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.tdsAmount}</td>
                                    <td>{item?.amount}</td>
                                  </tr>
                                ) : null}
                            </tbody>
                          </table>
                        }
                      </div>
                    </div>
                  </div>
                  {/*  } */}
                </div>
              </div>
              <div class="bottom-right trade_col pt-0">
                <div class="trade_card single-widget ">
                  <h4 class="title">Recent Trade</h4>
                  <div class="price_card mt-4">
                    <div class="price_card_head">
                      <div>Price({selectedPairData?.sname})</div>
                      <div>Quantity({selectedPairData?.fname})</div>
                      <div>
                        Accumulated <br />
                        Volume({selectedPairData?.fname})
                      </div>
                    </div>
                    <div class="price_card_body price_card_body_full">
                      {ordersHistory.length > 0 ?
                        ordersHistory.map((item, index) =>
                          <div class="price_item_value">
                            <span className={item?.orderType === 'Buy' ? "text-success wm-50" : "text-danger wm-50"} >
                              {(item?.price).toFixed(6)}</span>
                            <span class="wm-50">{(item?.amount).toFixed(6)}</span>
                            <span class="wm-50">{(item?.quantity).toFixed(6)}</span>
                          </div>
                        ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="spot-container-right-right">
            <div class=" trade_col pb-0">
              <div class="trade_card buy_sell_cards">
                <ul class="nav custom-tabs">
                  <li class="buy-tab">
                    <a class="active" data-bs-toggle="tab" href="#buy_coin">
                      Buy
                    </a>
                  </li>
                  <li class="sell-tab">
                    <a data-bs-toggle="tab" href="#sell_coin" class="">
                      Sell
                    </a>
                  </li>
                </ul>
                <div class="tab-content spot-deal-warp">
                  <div class="tab-pane fade show  px-0 container active data-buy" id="buy_coin">
                    <form action="">
                      <div class="field-box mb-3 ">
                        <select name="infoPlaceOrder"
                          value={infoPlaceOrder} onChange={(event) => {
                            setInfoPlaceOrder(event.target.value)
                            setBuyPrice(selectedPairData?.price?.toFixed(5))
                          }}>
                          <option value="Limit">Limit</option>
                          <option value="Market">Market</option>
                        </select>
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text text-start">
                          <small>
                            At Price <br />
                            {selectedPairData?.sname}
                          </small>
                        </span>
                        <input
                          type="number"
                          id="buyPrice"
                          value={buyPrice}
                          name="buyPrice"
                          class="form-control"
                          onChange={(event) => {
                            setChangeTotal(false);
                            setBuyPrice(event.target.value)
                          }} className="form-control" aria-label="Amount (to the nearest dollar)"
                          disabled={infoPlaceOrder === "Market"} />
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text text-start">
                          <small>
                            Amount <br />
                            {selectedPairData?.fname}
                          </small>
                        </span>
                        <input
                          type="number"
                          name="buyAmount"
                          id="buyAmount"
                          aria-invalid="true"
                          class="form-control"
                          value={buyAmount}
                          onChange={(event) => {
                            setChangeTotal(false);
                            setBuyAmount(event.target.value)
                          }}
                          aria-label="Amount (to the nearest dollar)"
                        />
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text text-start">
                          <small>
                            Total <br />
                            {selectedPairData?.sname}
                          </small>
                        </span>
                        <input
                          type="number"
                          id="buy_order_total"
                          name="buy_order_total"
                          class="form-control"
                          onChange={(event) => {
                            setChangeTotal(true);
                            setBuyTotal(event.target.value)
                          }}
                          aria-label="Amount (to the nearest dollar)"
                          value={buyTotal}
                        />
                      </div>
                      <div
                        class="btn-group btn-group-mini my-4"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio125"
                          autocomplete="off"
                          checked={(selectedBuyPercent === 25)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio125"
                          onClick={() => selectBuyPercent(25)}
                        >
                          25%
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio250"
                          autocomplete="off"
                          checked={(selectedBuyPercent === 50)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio250"
                          onClick={() => selectBuyPercent(50)}
                        >
                          50%
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio375"
                          autocomplete="off"
                          checked={(selectedBuyPercent === 75)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio375"
                          onClick={() => selectBuyPercent(75)}
                        >
                          75%
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio3100"
                          autocomplete="off"
                          checked={(selectedBuyPercent === 100)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio3100"
                          onClick={() => selectBuyPercent(100)}
                        >
                          100%
                        </label>
                      </div>
                      {!token ?
                        <div className="btn btn-success btn-block w-100 text-center" >
                          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
                        </div>

                        : kycDetail === 0 ? <a href="/kyc" className="btn btn-dark d-flex align-items-center justify-content-center w-100 text-center" style={{ fontSize: "15px" }}>Please verify KYC to Buy</a> :
                          kycDetail === 1 ? <small className="btn btn-warning d-flex align-items-center justify-content-center w-100 text-center" style={{ fontSize: "15px" }}>KYC Pending</small> :
                            kycDetail === 3 ? <a href="/kyc" className="btn btn-danger  d-flex align-items-center justify-content-center w-100 text-center" style={{ fontSize: "15px" }}>KYC Reject verify Again
                            </a> :

                              <button type="button" onClick={() => handleActiveOrder(infoPlaceOrder, buyPrice, buyAmount, selectedPairData?.fCoinId, selectedPairData?.sCoinId, 'Buy')}
                                disabled={!buyPrice || !buyAmount || !token || buyAmount === '0'}
                                class="btn btn-success btn-block w-100 text-center">
                                Buy {selectedPairData?.fname}
                              </button>
                      }
                      <small class="note">
                        Fee: Maker: 0.2% | Taker: 0.2% | Incl. of all applicable
                        taxes
                      </small>
                    </form>
                  </div>
                  <div
                    class="tab-pane fade show  data-sell  px-0 container"
                    id="sell_coin"
                  >
                    <form action="">
                      <div class="field-box mb-3 ">
                        <select name="infoPlaceOrder"
                          value={infoPlaceOrder} onChange={(event) => {
                            setInfoPlaceOrder(event.target.value);
                            setSellPrice(selectedPairData?.price?.toFixed(5))
                          }}>
                          <option value="Limit">Limit</option>
                          <option value="Market">Market</option>
                        </select>
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text text-start">
                          <small>
                            At Price <br />
                            {selectedPairData?.sname}
                          </small>
                        </span>
                        <input
                          type="number"
                          id="buyPrice"
                          name="buyPrice"
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          onChange={(event) => {
                            setChangeTotal(false);
                            setSellPrice(event.target.value)
                          }} value={sellPrice}
                          disabled={infoPlaceOrder === "Market"}
                        />
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text text-start">
                          <small>
                            Amount <br />
                            {selectedPairData?.fname}
                          </small>
                        </span>
                        <input
                          type="number"
                          name="buyAmount"
                          id="buyAmount"
                          aria-invalid="true"
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          onChange={(event) => {
                            setChangeTotal(false);
                            setSellAmount(event.target.value)
                          }} value={sellAmount}
                        />
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text text-start">
                          <small>
                            Total <br />
                            {selectedPairData?.sname}
                          </small>
                        </span>
                        <input
                          type="number"
                          id="buy_order_total"
                          name="buy_order_total"
                          class="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          value={sellTotal}
                          onChange={(event) => {
                            setChangeTotal(true);
                            setSellTotal(event.target.value)
                          }}
                        />
                      </div>
                      <div
                        class="btn-group btn-group-mini my-4"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio125_sell"
                          autocomplete="off"
                          checked={(selectedSellPercent === 25)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio125_sell"
                          onClick={() => selectSellPercent(25)}
                        >
                          25%
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio250_sell"
                          autocomplete="off"
                          checked={(selectedSellPercent === 50)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio250_sell"
                          onClick={() => selectSellPercent(50)}
                        >
                          50%
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio375_sell"
                          autocomplete="off"
                          checked={(selectedSellPercent === 75)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio375_sell"
                          onClick={() => selectSellPercent(75)}
                        >
                          75%
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="btnradio3100_sell"
                          autocomplete="off"
                          checked={(selectedSellPercent === 100)}
                        />
                        <label
                          class="btn btn-outline-primary"
                          for="btnradio3100_sell"
                          onClick={() => selectSellPercent(100)}
                        >
                          100%
                        </label>
                      </div>

                      {!token ?
                        <div className="btn btn-danger btn-block w-100 text-center" >
                          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
                        </div>

                        : kycDetail === 0 ? <a href="/kyc" className="btn btn-dark d-flex align-items-center justify-content-center w-100 text-center" style={{ fontSize: "15px" }}>Please verify KYC to Sell</a> :
                          kycDetail === 1 ? <small className="btn btn-warning d-flex align-items-center justify-content-center w-100 text-center" style={{ fontSize: "15px" }}>KYC Pending</small> :
                            kycDetail === 3 ? <a href="/kyc" className="btn btn-danger  d-flex align-items-center justify-content-center w-100 text-center" style={{ fontSize: "15px" }}>KYC Reject verify Again
                            </a> :

                              <button type="button" onClick={() => handleActiveOrder(infoPlaceOrder, sellPrice, sellAmount, selectedPairData?.fCoinId, selectedPairData?.sCoinId, 'Sell')} disabled={!sellPrice || !sellAmount || !token || sellAmount === '0'} class="btn btn-danger btn-block w-100 text-center">  Sell {selectedPairData?.fname} </button>

                      }
                      <small class="note">
                        Fee: Maker: 0.2% | Taker: 0.2% | Incl. of all applicable
                        taxes
                      </small>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class=" trade_col pt-0">
              <div class="single-widget trade_card trade_card_body">
                <h4 class="title">Asset</h4>
                <div class="trade_assets">
                  <div class="product-owner  d-flex-between">
                    <span class="bid-owner">
                      <strong>{selectedPairData?.fname}</strong> Balance
                    </span>
                    <span class="biding-price d-flex-center">
                      {" "}
                      <strong>{sellCoinBal ? parseFloat(sellCoinBal).toFixed(6) : 0}</strong>{" "}
                    </span>
                  </div>
                  <div class="product-owner d-flex-between">
                    <span class="bid-owner">
                      <strong>{selectedPairData?.sname}</strong> Balance
                    </span>
                    <span class="biding-price d-flex-center">
                      {" "}
                      <strong>{buyCoinBal ? parseFloat(buyCoinBal).toFixed(6) : 0}</strong>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Place a bit Modal --> */}
      <div
        class="modal fade"
        id="Deposit_modal"
        tabindex="-1"
        aria-labelledby="Deposit_modalLaebl"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header flex-column px-8">
              <h3 class="modal-title" id="placeBitLaebl">
                Deposit Funds
              </h3>
              <button
                type="button"
                class="btn-custom-closer"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="ri-close-fill"></i>
              </button>
            </div>
            {/* <!-- End modal-header --> */}
            <div class="modal-body px-8 py-5">
              <form action="#">
                <div class="form-group mb-4">
                  <label for="bit">
                    Use the following data to credit your account with yugExchange
                    Exchange{" "}
                  </label>
                  <img
                    src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=&choe=UTF-8"
                    class="qr_img"
                  />
                </div>
                {/* <!-- End .form-group --> */}

                <div class="form-group">
                  <div class="field-box verify_mail">
                    {/* <!-- <label for="mail" class="form-label">Email</label> --> */}
                    <input
                      id="mail"
                      type="text"
                      disabled
                      value="S1DF51V145SDF14SD"
                    />
                    <button class="btn btn-small btn-gradient">
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                {/* <!-- End .form-group --> */}

                <ul class="disclaimer mt-3">
                  <label>Disclaimer</label>
                  <li>
                    • Minimum deposit of 0.0 USDT, deposit below that cannot be
                    recovered.
                  </li>
                  <li>
                    • Please deposit only USDT on this address. If you deposit
                    any other coin, it will be lost forever.
                  </li>
                  <li>
                    • This is BEP20 deposit address type. Transferring to an
                    unsupported network could result in loss of deposit.
                  </li>
                </ul>
              </form>
            </div>
          </div>
          {/* <!-- End .modal-content --> */}
        </div>
      </div>
      {/* <!-- End Place a bit Modal --> */}

      {/* <!-- Withdraw_modal Modal --> */}
      <div
        class="modal fade"
        id="Withdraw_modal"
        tabindex="-1"
        aria-labelledby="Withdraw_modalLaebl"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header flex-column px-8">
              <h3 class="modal-title" id="placeBitLaebl">
                Withdraw Funds
              </h3>
              <button
                type="button"
                class="btn-custom-closer"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="ri-close-fill"></i>
              </button>
            </div>
            {/* <!-- End modal-header --> */}
            <div class="modal-body px-8 py-5">
              <form action="#">
                <div class="form-group mb-4">
                  <label for="bit">Wallet Address</label>
                  <input type="text" id="bit" placeholder="" />
                </div>
                {/* <!-- End .form-group --> */}

                <div class="form-group">
                  <label for="quantity">Enter Amount</label>
                  <input type="number" id="quantity" placeholder="0.00" />
                </div>
                {/* <!-- End .form-group --> */}

                <ul class="bidding-list">
                  <li>
                    Withdrawal Fee: <strong>0.002</strong>
                  </li>
                </ul>
              </form>
            </div>
            {/* <!-- End modal-body --> */}
            <div class="modal-footer px-8">
              <button
                type="button"
                class="btn btn-gradient btn-small w-100 justify-content-center"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span>Withdraw</span>
              </button>
            </div>
            {/* <!-- End .modal-footer --> */}
          </div>
          {/* <!-- End .modal-content --> */}
        </div>
      </div>
      {/* <!-- End Withdraw_modal Modal --> */}


    </>
  );
};

export default TradePage;
