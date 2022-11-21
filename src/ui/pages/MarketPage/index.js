import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import HomeService from "../../../api/services/HomeService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { ApiConfig } from "../../../api/apiConfig/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";
const MarketPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [upperPairData, setUpperPairData] = useState([]);
  const [pairData, setPairData] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [AllData, setAllData] = useState([]);

  const { webSocketUrl } = ApiConfig;

  let { lastJsonMessage } = useWebSocket(webSocketUrl, {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
  });


  useEffect(() => {
    if (lastJsonMessage && Object.keys(lastJsonMessage).length > 0) {
      setUpperPairData(lastJsonMessage);

      setAllData(lastJsonMessage);
      if (AllData.length === 0)
        setPairData(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    handleFavouriteList();
    handlefilterFavourite();
  }, []);

  const nextPage = (data) => {
    navigate('/trade', { state: data });
  };

  const showFavourite = (id, cid) => {
    let tab = document.getElementById(`row${id}`);
    tab.classList.toggle("ri-star-line");
    tab.classList.toggle("ri-star-fill");
    checkFavClass(tab, cid)
    // handleAddFavourite(cid);
  }

  const checkFavClass = (tab, cid) => {
    console.log(tab.classList[3], cid);
    let type = "coinAdd";
    // tab.classList[3] == "fav_selected" ? type = "coinAdd" : type = "coinRemove";
    handleAddFavourite(cid, type);

  }

  const handleAddFavourite = async (cid, type) => {
    LoaderHelper.loaderStatus(true);
    await HomeService.addFavourite(cid, type).then(async result => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          //alertSuccessMessage(result.data);
          setFavouriteData([]);
          handleFavouriteList();
        } catch (error) {
          alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        // alertErrorMessage(result.data);
      }
    });
  }

  const handlefilterFavourite = () => {
    if (favouriteList.length > 0) {
      lastJsonMessage.filter(item => {
        if (favouriteList.includes(item?._id)) {
          let a = false
          favouriteData.map(e => {
            if (e._id == item?._id) {
              a = true;
            }
          })
          if (!a)
            favouriteData.push(item);
        }
      })
    }
  }

  const handleFavouriteList = async () => {
    await HomeService.getFavouriteList().then(async result => {
      LoaderHelper.loaderStatus(true);
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setFavouriteList(result?.data[0]?.coinId);
          //alertSuccessMessage(result.data);
        } catch (error) {
          alertErrorMessage(error);
          /*  console.log('error', `${error}`); */
        }
      } else {
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage(result.data);
      }
    });
  }
  const [activeTab, setActiveTab] = useState("ALL");

  const handleTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'ALL') {
      setPairData(AllData);
    } else if (tab === "INR") {
      let data = AllData.filter(item => item?.sname === "INR");
      setPairData(data);
    } else if (tab === "USDT") {
      let data = AllData.filter(item => item?.sname === "USDT");
      setPairData(data);
    }
  };


  console.log(AllData, 'AllData');

  return (
    <>
      <section class="inner-page-banner">
        <div class="container">
          <div class="inner text-center">
            <h1 class="title">Market</h1>
            <nav class="mt-4">
              <ol class="breadcrumb justify-content-center">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Market
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section> 
      <section class=" live_prices mt-0 market_prices">
        <div class="container">
          <Swiper className="market_slider  pb-10"
            spaceBetween={10}
            autoplay={{
              delay: 2000,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            // slidesPerView={5}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
          >
            {upperPairData.length > 0
              ? upperPairData.map((item) => (
                <SwiperSlide>
                  <div class="top-seller-style-two ">
                    <div class="d-flex-between">
                      <div class="d-flex-center">
                        <div class="thumb-wrapper">
                          <a href="#" class="thumb no-border" onClick={() => nextPage(item)}>
                            <img
                              src={ApiConfig.baseUrl + item?.iconPath}
                              alt="top sellter"
                            />
                          </a>
                        </div>
                        <div class="content">
                          <h4 class="title pb-0 mb-0">
                            <a href="#" onClick={() => nextPage(item)}>
                              {item?.fname}/{item?.sname}
                            </a>
                          </h4>
                        </div>
                        {/* <!-- End .content --> */}
                      </div>
                      {/* <!-- End .d-flex-center --> */}
                      <i onClick={() => nextPage(item)} class="ri-arrow-right-line btn_icon"></i>
                    </div>
                    <hr />
                    <div class="d-flex-between">
                      <div>
                        <span class="price">{item?.price.toFixed(6)}</span>
                        <br />
                        <span
                          className={`price_small ${item?.pChange >= 0
                            ? "text-success"
                            : "text-danger"
                            }`}
                        >
                          {item?.pChange.toFixed(2)}%
                        </span>
                        <div>
                          <small>{item?.volume.toFixed(6)}</small>
                        </div>
                      </div>
                      <img
                        src="images/graph/graph.png"
                        alt="top sellter"
                        class=""
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
              : null}
          </Swiper>
        </div>
        <div class="container">
          <div class="d-flex-between mb-5">
            <ul class="nav custom-tabs">
              <li>
                <a data-bs-toggle="tab" href="#tt_history" onClick={() => handlefilterFavourite()}>
                  Favorite
                </a>
              </li>
              <li>
                <a class="active" data-bs-toggle="tab" href="#funds">
                  Spot
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content custom-tab-content p-0">
            <div class="tab-pane container active show fade  " id="funds" >
              <div class="btn-group btn_radio_group " role="group" aria-label="Basic radio toggle button group">
                <button onClick={() => handleTab('ALL')} type="button" class={`btn  btn-outline-primary ${activeTab === 'ALL' && 'active'}`} for="ALL">ALL</button>
                <button onClick={() => handleTab('INR')} type="button" class={`btn  btn-outline-primary ${activeTab === 'INR' && 'active'}`} for="INR">INR</button>
                <button onClick={() => handleTab('USDT')} type="button" class={`btn  btn-outline-primary ${activeTab === 'USDT' && 'active'}`} for="USDT">USDT</button>
              </div>
              <div >
                <table class="table ">
                  <thead>
                    <tr>
                      <th> Pair</th>
                      <th> Last Price</th>
                      <th> 24H Change</th>
                      <th> 24H High</th>
                      <th> 24H Low</th>
                      <th> 24H Vol</th>
                      <th> 24H Turnover</th>
                      <th> Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pairData.length > 0
                      ? pairData.map((item, key) => (
                        <tr>
                          <td>

                            <div class="td_div">
                              {!token ? "" :
                                <span className={`star_btn btn_icon ${favouriteList?.some(id => id == item?._id) ? "active" : ""}`}><i className={favouriteList?.some(id => id == item?._id) ? "ri-star-fill" : "ri-star-line"} id={`row${key}`} onClick={() => showFavourite(key, item?._id)} ></i></span>
                              }
                              <img
                                src={ApiConfig.baseUrl + item?.iconPath}
                                className="img-fluid icon_img coinimg me-2 " />
                              {item?.fname}/{item?.sname}
                            </div>

                          </td>
                          <td>
                            <b>{item?.price.toFixed(4)}</b>
                          </td>
                          <td className={item?.pChange >= 0 ? "color-green text-success" : "color-red text-danger"}>
                            <b>{item?.pChange.toFixed(2)}</b>
                            {" "}
                          </td>
                          <td>
                            <b>{item?.dHigh.toFixed(4)}</b>
                          </td>
                          <td>
                            <b>{item?.dLow.toFixed(4)}</b>
                          </td>
                          <td>
                            <b>{(item?.volume).toFixed(2)}</b>
                          </td>
                          <td>
                            <b>{(item?.price * item?.volume).toFixed(2)}</b>
                          </td>
                          <td>
                            <a href="" onClick={() => nextPage(item)} class="btn btn-gradient btn-sm">
                              <span>Trade</span>
                            </a>
                          </td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- End bid ifno --> */}

            {/* Favourite Table Start */}
            <div class="tab-pane container fade" id="tt_history">
              {!token ?
                <div className="favouriteData">
                  <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                  <br />
                  <p className="mt-3 mb-4" > No results, Go to <a className="btn-link" href="/login" >Sign in</a> and add your favorite coins from Spot. </p>
                </div>
                :
                <div>
                  {favouriteData.length === 0 ?
                    <div className="favouriteData">
                      <img src="images/no-data.svg" className="img-fluid" width="96" height="96" alt="" />
                      <br />
                      <p className="mt-3 mb-4" > No Data Found. </p>
                    </div>
                    :
                    <table class="table ">
                      <thead>
                        <tr>
                          <th> Pair</th>
                          <th> Last Price</th>
                          <th> 24H Change</th>
                          <th> 24H High</th>
                          <th> 24H Low</th>
                          <th> 24H Vol</th>
                          <th> 24H Turnover</th>
                          <th> Operation</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {favouriteData.length > 0 ?
                          favouriteData.map((item, key) =>
                            <tr>
                              {/* <td>
                              {" "}
                              <div class="td_div">
                                <span className={`star_btn btn_icon ${favouriteList?.some(id => id == item?._id) ? "active" : ""}`}><i className={favouriteList?.some(id => id == item?._id) ? "ri-star-fill" : "ri-star-line"} id={`row${key}`} onClick={() => showFavourite(key, item?._id)} ></i></span>
                                <img
                                  src={ApiConfig.baseUrl + item?.iconPath}
                                  className="img-fluid icon_img coinimg me-2 " />
                                {item?.fname}/{item?.sname}
                              </div>
                            </td> */}
                              <td>
                                <span className="d-flex align-items-center" >
                                  <img src={ApiConfig.appUrl + item?.iconPath} className="img-fluid icon_img coinimg me-2 " />
                                  {item?.fname}/{item?.sname}
                                </span>
                              </td>
                              <td><b>{item?.price}</b></td>
                              <td className={item?.pChange >= 0 ? "text-success" : "text-danger"} ><b>{item?.pChange.toFixed(2)} </b>
                              </td>
                              <td><b>{item?.dHigh}</b></td>
                              <td><b>{item?.dLow}</b></td>
                              <td><b>{item?.volume}</b></td>
                              <td><b>{(item?.price * item?.volume).toFixed(2)}</b></td>
                              <td> <a href="" onClick={() => nextPage(item)} className="btn btn-theme btn-sm" >Trade</a> </td>
                            </tr>
                          ) : <tr rowspan="8" tspan="10" ><td rowspan="8" height="100"> No Data </td></tr>}
                      </tbody>
                    </table>
                  }
                </div>
              }
            </div>

            {/* Favourite Table End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPage;
