import React, { useContext } from "react";
import LandingPage from "../ui/pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthHeader from "../customComponent/AuthHeader";
import UserHeader from "../customComponent/UserHeader";
import Footer from "../customComponent/Footer";
import LoginPage from "../ui/pages/LoginPage";
import ForgotPassPage from "../ui/pages/ForgotPassPage";
import ReferralPage from "../ui/pages/ReferralPage";
import TermsOfUsePage from '../ui/pages/TermsOfUsePage';
import PrivacyPolicyPage from '../ui/pages/PrivacyPolicyPage';
import SignupPage from "../ui/pages/SignupPage";
import TradePage from "../ui/pages/TradePage";
import ProfilePage from "../ui/pages/ProfilePage";
import { ProfileContext } from "../context/ProfileProvider";
import ContactPage from "../ui/pages/ContactPage";
import MarketPage from "../ui/pages/MarketPage";
import FundPage from "../ui/pages/FundPage";
import ComingSoonPage from "../ui/pages/ComingSoonPage";
import AboutUs from "../ui/pages/AboutUs";
import KycPage from "../ui/pages/KycPage";
import StakingPage from "../ui/pages/StakingPage";

const Routing = () => {
  const [profileState] = useContext(ProfileContext);
  const token = localStorage.getItem("token");

  const myTheme = localStorage.getItem("theme");
  if (!myTheme) {
    localStorage.setItem("theme", "1");
  }

  return (
    <Router>
      {(!token && !profileState.token) ? <AuthHeader /> : <UserHeader />}
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/signup" element={<SignupPage />}></Route>
        <Route exact path="/forgotpassword" element={<ForgotPassPage />}></Route>
        <Route exact path="/trade" element={<TradePage />}></Route>
        <Route exact path="/market" element={<MarketPage />}></Route>
        <Route exact path="/PrivacyPolicy" element={<PrivacyPolicyPage />}></Route>
        <Route exact path="/termsConditions" element={<TermsOfUsePage />}></Route>
        <Route exact path="/aboutus" element={<AboutUs />}></Route>
        <Route exact path="/contact" element={<ContactPage />}></Route>
        <Route exact path="/stacking" element={<StakingPage />}></Route>
        {(!token && !profileState.token) ? <Route path='*' element={<ComingSoonPage />} />
          :
          <>
            <Route exact path="/funds" element={<FundPage />}></Route>
            <Route exact path="/profile" element={<ProfilePage />}></Route>
            <Route exact path="/referral" element={<ReferralPage />}></Route>
            <Route exact path="/kyc" element={<KycPage />}></Route>
          </>
        }
        <Route path='*' element={<ComingSoonPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Routing;