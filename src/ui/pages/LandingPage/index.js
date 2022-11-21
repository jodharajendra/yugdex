import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";

import { ApiConfig } from "../../../api/apiConfig/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";

const LandingPage = () => {
  const [upperPairData, setUpperPairData] = useState([]);
  const [marketUpdate, setMarketUpdate] = useState([]);

  const navigate = useNavigate();

  const { webSocketUrl } = ApiConfig;

  let { lastJsonMessage } = useWebSocket(webSocketUrl, {
    onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (lastJsonMessage && Object.keys(lastJsonMessage).length > 0) {
     /*  lastJsonMessage = lastJsonMessage.slice(0, 4); */
      setUpperPairData(lastJsonMessage.slice(0, 4));
      setMarketUpdate(lastJsonMessage);
    }    
  }, [lastJsonMessage]);

  const nextPage = (data) => {
    navigate("/trade", { state: data });
  };
  return (
    <>
      <section className="hero-banner-style top-section-gap ">
        <div className="hero-banner_inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-7 col-xl-7 col-lg-7">
                <div className="banner-content">
                  <h2 className="mb-6 title">India's Most Trusted Bitcoin & Cryptocurrency Exchange
                  </h2>
                  <p>Welcome to the World’s First Decentralized Community Support Fund on Blockchain. A DeFi Support Model Built on Smart Contract Technology By the People, For the People.</p>
                  <div className="group-btn mt-8">
                    <a href="/trade" className="btn btn-gradient"><span>
                      Get Start</span></a>

                  </div>
                  <img src="images/shape/2.png" alt="shape" className="shape shape-2 dark rotate-360" />
                  <img src="images/shape/3.png" alt="shape" className="shape shape-3 dark rotate-360" />
                  <img src="images/shape/2-light.png" alt="shape" className="shape shape-2 light rotate-360" />
                  <img src="images/shape/3-light.png" alt="shape" className="shape shape-3 light rotate-360" />
                </div>
                {/* <!-- End banner-content --> */}

              </div>
              {/* <!-- End .col --> */}
              <div className="col-xxl-5 col-xl-5 col-lg-5">
                <img src="images/main_img.svg" className=" img_roteate main_img w-100" />
                <img src="images/main_img_coin.svg" className="main_img w-100" />
              </div>
              {/* <!-- End .col --> */}
            </div>
          </div>
          {/* <!-- End .container --> */}
        </div>
      </section>
      {/* <!-- Start Live Auction --> */}
      <section className=" live_prices">
        <div className="container">
          <div className="section-title mb-5">
            <h3>Market Trend</h3>
          </div>
          {/* <!-- End .section-title --> */}
        </div>
        {/* <!-- End .container --> */}

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
            {marketUpdate.length > 0
              ? marketUpdate.map((item) => (
                <SwiperSlide>
                  <div class="top-seller-style-two ">
                    <div class="d-flex-between">
                      <div class="d-flex-center">
                        <div class="thumb-wrapper">
                          <a href="#" class="thumb no-border" onClick={() => nextPage(item)}>
                            <img
                              src={ApiConfig.appUrl + item?.iconPath}
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
        {/* <!-- End .slick-activation-01 --> */}
      </section>
      {/* <!-- End Live Auction -->

  <!-- Start Top Seller --> */}
      <section className="about_us ptb-120">
        <div className="container">
          <div className="row align-items-center " >
            <div className="col-lg-6" >
              <img src="images/about_img.png" />
            </div>
            <div className="col-lg-6" >
              <h1>About Us</h1>
              <h3>What is Yug Exchange</h3>
              <h5>Explore sensational features to prepare your best investment in cryptocurrency</h5>
              <ul>
                <li> <i className="ri-arrow-right-line"></i> Transactions</li>
                <li> <i className="ri-arrow-right-line"></i>  Asset Transfers.</li>
                <li> <i className="ri-arrow-right-line"></i>  More Confidential Transactions.</li>
                <li> <i className="ri-arrow-right-line"></i>  Transaction Fees.</li>
                <li> <i className="ri-arrow-right-line"></i>  Safe & Speedy Transactions</li>
                <li> <i className="ri-arrow-right-line"></i> Greater Access To Credit.</li>
                <li> <i className="ri-arrow-right-line"></i> Easier International Trade.</li>
                <li> <i className="ri-arrow-right-line"></i>  Individual Ownership</li>
                <li> <i className="ri-arrow-right-line"></i>  Cryptocurrency Payment Gateway</li>
                <li> <i className="ri-arrow-right-line"></i>  A Decentralized Wallet.</li>
              </ul>
            </div>
          </div>
        </div>
        /
      </section>
      {/* <!-- End Top Seller --> */}

      {/* <!-- Start Top Faetures --> */}
      <section className=" pb-90">
        <div className="container">
          <div className="section-title">
            <h2>Market Trend</h2>
            <p>Explore sensational features to prepare your best investment in cryptocurrency</p>
          </div>
          {/* <!-- End .section-title --> */}
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 mb-6">
                <div className="wallet-block">
                  <div className="thumb">
                    <img src="images/feature/1.png" alt="nft wallet" />
                  </div>
                  <h4 className="title">Manage Portfolio</h4>
                  <p>Buy and sell popular digital currencies, keep track of them in the one place.</p>
                </div>
              </div>
              {/* <!-- End .col --> */}
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 mb-6">
                <div className="wallet-block">
                  <div className="thumb">
                    <img src="images/feature/2.png" alt="nft wallet" />
                  </div>
                  <h4 className="title">Protected Securely</h4>
                  <p>All cash balances are covered by FDIC insurance, up to a maximum of $250,000.</p>
                </div>
              </div>
              {/* <!-- End .col --> */}
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 mb-6">
                <div className="wallet-block">
                  <div className="thumb">
                    <img src="images/feature/3.png" alt="nft wallet" />
                  </div>
                  <h4 className="title">Cryptocurrency Variety</h4>
                  <p>Supports a variety of the most popular digital currencies and always uptodate.</p>
                </div>
              </div>
              {/* <!-- End .col --> */}
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 mb-6">
                <div className="wallet-block">
                  <div className="thumb">
                    <img src="images/feature/4.png" alt="nft wallet" />
                  </div>
                  <h4 className="title">Learn Best Practice</h4>
                  <p>Easy to know how to cryptocurrency works and friendly to newbie.</p>
                </div>
              </div>
              {/* <!-- End .col --> */}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Top Faetures -->
  <!-- Start Live Auction --> */}
      <section className=" market_update pb-90">
        <div className="container">
          <div className="section-title">
            <h2>Market Update</h2>
            <p>Cryptocurrency Portfolio Today</p>
          </div>
          {/* <!-- End .section-title --> */}
        </div>
        {/* <!-- End .container --> */}

        <div className="container">
          <div class="table-responsive">
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
                {upperPairData.length > 0
                  ? upperPairData.map((item) => (
                    <tr>
                      <td>
                        {" "}
                        <div class="td_div">
                          {/* <span class="star_btn btn_icon">
                            <i class="ri-star-line"></i>
                          </span> */}
                          <img
                            src={ApiConfig.appUrl + item?.iconPath}
                            className="img-fluid icon_img coinimg me-2 "
                          />
                          {item?.fname}/{item?.sname}
                        </div>
                      </td>
                      <td>
                        <b>{item?.price}</b>
                      </td>
                      <td
                        className={
                          item?.pChange >= 0
                            ? "color-green text-success"
                            : "color-red text-danger"
                        }
                      >
                        <b>{item?.pChange.toFixed(2)} </b>{" "}
                      </td>
                      <td>
                        <b>{item?.dHigh}</b>
                      </td>
                      <td>
                        <b>{item?.dLow}</b>
                      </td>
                      <td>
                        <b>{(item?.volume).toFixed(2)}</b>
                      </td>
                      <td>
                        <b>{(item?.price * item?.volume).toFixed(2)}</b>
                      </td>
                      <td>
                        {" "}
                        <a
                          href=""
                          onClick={() => nextPage(item)}
                          class="btn btn-theme btn-sm"
                        >
                          Trade
                        </a>{" "}
                      </td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        {/* <!-- End .slick-activation-01 --> */}
      </section>
      {/* <!-- End Live Auction --> */}


      <section className="explore_sec " >
        <div className="container" >
          <div className="explore_warp py-9 px-12" >
            <div className="explore_text" >
              <h2 className="mb-2" >
                New In Cryptocurrency?
              </h2>
              <p className="pb-0" >
                We'll tell you what cryptocurrencies are, how they work and why you should own <br />  one right now. So let's do it.
              </p>
            </div>
            <div className="group-btn ">
              <a href="/aboutus" className="btn btn-gradient"><span>
                Learn & Explore Now </span></a>

            </div>
          </div>
        </div>
      </section>
    </>

  );
}

export default LandingPage;