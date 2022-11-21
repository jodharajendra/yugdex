import React, { useEffect, useState } from "react";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import HomeService from "../../../api/services/HomeService";
import { ApiConfig } from "../../../api/apiConfig/apiConfig";
import { useNavigate, Link } from "react-router-dom";

const ReferralPage = () => {
  const navigate = useNavigate();

  const { appUrl } = ApiConfig;
  const [totalReferrals, setTotalReferrals] = useState('');
  const [totalRewards, setTotalRewards] = useState('');
  // const [totalRewardRate, setTotalRewardRate] = useState('');
  const [referralLink, setReferralLink] = useState('');



  useEffect(() => {
    handleReferralData();
    handleReferralLink();
    handleReferralAmount();
  }, [])

  const handleReferralData = async () => {
    await HomeService.referralData().then(async result => {
      if (result.sucess) {
        try {
          // alertSuccessMessage(result.sucess);
          setTotalReferrals(result.data);

        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        alertErrorMessage(result.sucess);
      }
    })
  }

  const handleReferralAmount = async () => {
    await HomeService.referralAmount().then(async result => {
      if (result.sucess) {
        try {
          // alertSuccessMessage(result.sucess);
          setTotalRewards(result.data);

        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        alertErrorMessage(result.sucess)
      }
    })
  }

  const handleReferralLink = async () => {
    await HomeService.referralLink().then(async result => {
      //console.log(typeof result, "dfsdfsdf");
      if (result.sucess) {
        try {
          // alertSuccessMessage("hdkjghdfjhdfkgfd");
          setReferralLink(result?.code);

        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        alertErrorMessage("Something Went Wrong");
      }
    })
  }



  return (
    <>
      <section class="inner-page-banner">
        <div class="container">
          <div class="inner text-center">
            <h1 class="title">Yug Referral Program</h1>
            <span class="partnerx-hero-description-title pt-3">Refer &amp; earn 50% of trading fee paid by your friends as reward. Be your own Boss!</span>
            <nav class="mt-4">
              <ol class="breadcrumb justify-content-center">
                <li class="breadcrumb-item">
                  <Link to="/profile">My Account</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Referral Program</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <div className="bg-1" >

        <section class=" invite_sec logg_inn bg_img" >
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-12 col-md-12 mx-auto">
                <div class="card" >
                  <div class="card-body invite_card " >
                    <h5> <i class="fa fa-link" ></i>  Your referral link </h5>

                    <form data-copy="true">
                      <input type="text" value={"http://yugdex.com/" + 'signup?reffcode=' + referralLink} data-click-select-all />
                      <button type="button" style={{ cursor: 'pointer' }} value="Copy" onClick={() => navigator.clipboard.writeText("http://yugdex.com/" + 'signup?reffcode=' + referralLink)}> <i class="ri-file-copy-line"></i> </button>
                    </form>

                    {/* <div class="share mb-3" >
                    <a href="javascript:void(0)" className={`pr_item ${referalPer === "30" ? "pr_item_current" :""}`} onClick={() => setReralPr("30")}>  30/0 </a>
                    <a href="javascript:void(0)" className={`pr_item ${referalPer === "20" ? "pr_item_current" :""}`} onClick={() => setReralPr("20")}>  20/10 </a>
                    <a href="javascript:void(0)" className={`pr_item ${referalPer === "15" ? "pr_item_current" :""}`} onClick={() => setReralPr("15")}>  15/15 </a>
                   
                  </div> */}

                    <div class="share" >
                      <a href="#" className="item-facebook" ><i class="ri-facebook-circle-fill"></i> </a>
                      <a href="#" className="item-whatsapp"> <i class="ri-whatsapp-fill"></i> </a>
                      <a href="#" className="item-telegram"> <i class="ri-telegram-fill"></i></a>
                      <a href="#" className="item-twitter"><i class="ri-twitter-fill"></i> </a>
                    </div>

                    <div class="row" >
                      <div class="col-md-4" >
                        <div class="bl_card" >
                          <img src="images/download_1.png" class="img-fluid" />
                          <h3 class="" >
                            <small>Total Referrals</small>
                            {totalReferrals}
                          </h3>
                        </div>
                      </div>
                      <div class="col-md-4" >
                        <div class="bl_card" >
                          <img src="images/download_2.png" class="img-fluid" />
                          <h3 class="" >
                            <small>Total Rewards</small>
                            {totalRewards}
                          </h3>
                        </div>
                      </div>
                      <div class="col-md-4" >
                        <div class="bl_card" >
                          <img src="images/download_3.png" class="img-fluid" />
                          <h3 class="" >
                            <small>Your Reward Rate </small>
                            30 %
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="partnerx-section partnerx-hero">
          <div class="partnerx-hero-bullets">
            <ul class="partnerx-hero-bullets-list">
              <li class="partnerx-hero-bullets-list-item">
                <img src="images/50.png" alt="Bullet-1" class="partnerx-hero-bullets-list-item-image" /><span class="partnerx-hero-bullets-list-item-text">Earn 50% as reward of every trading fee</span>
              </li>
              <li class="partnerx-hero-bullets-list-item">
                <img src="images/cash-on-delivery.png" alt="Bullet-2" class="partnerx-hero-bullets-list-item-image" /><span class="partnerx-hero-bullets-list-item-text">Payout every 24 hours!</span>
              </li>
              <li class="partnerx-hero-bullets-list-item">
                <img src="images/bitcoin_new.png" alt="Bullet-3" class="partnerx-hero-bullets-list-item-image" /><span class="partnerx-hero-bullets-list-item-text">Unlimited referrals</span>
              </li>
              <li class="partnerx-hero-bullets-list-item">
                <img src="images/money.png" alt="Bullet-4" class="partnerx-hero-bullets-list-item-image" /><span class="partnerx-hero-bullets-list-item-text">Unlimited rewards</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

export default ReferralPage;