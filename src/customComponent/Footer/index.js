import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer-wrapper">
    <div className="footer-inner pt-120 pb-40">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 mb-8">
            <div className="footer-widget first-block">
              <div className="mb-4">
                <Link to="/" className="logo-light"><img src="images/logo-white.png" alt="brand" /></Link>
                <Link to="/" className="logo logo-dark"><img src="images/logo-dark.png" alt="brand" /> </Link>
              </div>
              <p className="mb-5">We'll tell you what cryptocurrencies are, how they work and why you should own one right now. So let's do it.</p>
              <div className="social">
                <a className="icon-facebook" href="#"><i className="ri-facebook-line"></i></a>
                <a className="icon-twitter" href="#"><i className="ri-twitter-line"></i></a>
                <a className="icon-instagram" href="#"><i className="ri-instagram-line"></i></a>
                <a className="icon-linkedin" href="#"><i className="ri-linkedin-line"></i></a>
              </div>
            </div>
          </div>
          {/* <!-- End .col --> */}

          <div className="col-lg-2 col-md-6 mb-8">
            <div className="footer-widget">
              <h4>About</h4>
              <ul className="footer-list-widget">
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="/PrivacyPolicy">Privacy Policy </a></li>
                <li><a href="/termsConditions">Terms Of Use</a></li>
                <li><a href="#"> KYC Policy </a></li>
                <li><a href="#">AML Policy</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- End .col --> */}

          <div className="col-lg-2 col-md-6 mb-8">
            <div className="footer-widget">
              <h4>Contact</h4>
              <ul className="footer-list-widget">
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="#">support@yugcoins.io</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- End .col --> */}

          <div className="col-lg-3 col-md-6 mb-8">
            <div className="footer-widget">
              <h4>Download mobile app</h4>
              <div className="down_tab" >
                <div >
                  <a href="#" ><img src="images/play_store.png" className="img-fluid" /></a>
                  <a href="#" ><img src="images/app_store.png" className="img-fluid" /></a>
                </div>
                <div className=" ms-3">
                  <img src="images/qr_code.png" />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End .col --> */}
        </div>
      </div>
      {/* <!-- End .container --> */}
    </div>
    <div className="copyright text-center">
      <div className="container">
        <p>Copyright © 2022 All Rights Reserved.</p>
      </div>
    </div>
  </footer>
    );
}

export default Footer;