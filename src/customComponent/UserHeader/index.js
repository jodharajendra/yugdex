import React, { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileProvider";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../api/services/AuthService";
import { ApiConfig } from "../../api/apiConfig/apiConfig";

const UserHeader = () => {

  const [profileState, updateProfileState] = useContext(ProfileContext);
  const navigate = useNavigate();
  const [getSelfy, setGetSelfy] = useState('');

  const handleLogOut = () => {
    updateProfileState({});
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    const tab = document.getElementById("body");
    let theme = localStorage.getItem("theme");
    if (theme === "1") {
      tab.classList.add("theme-dark")
    }
    else {
      tab.classList.toggle("theme-dark");
      tab.classList.toggle("theme-light");
    }
  }, [])

  const handleTheme = () => {
    const tab = document.getElementById("body");
    let theme = localStorage.getItem("theme");
    if (theme === "1") {
      localStorage.setItem("theme", "2");
      tab.classList.remove("theme-dark");
      tab.classList.add("theme-light");
    } else {
      localStorage.setItem("theme", "1");
      tab.classList.add("theme-dark");
      tab.classList.remove("theme-light");
    }
  }

  function showMenu() {
    let tab = document.getElementById("qwert");
    console.log(tab);
    tab.classList.add("active");
  }

  function hideMenu() {
    let tab = document.getElementById("qwert");
    console.log(tab);
    tab.classList.remove("active");
  }

  useEffect(() => {
    handleDetials();
  }, [])

  const handleDetials = async () => {
    await AuthService.getDetails().then(async result => {
      if (result.sucess) {
        setGetSelfy(result?.data?.logindata[0]?.profilepicture)
      }
    });

  }

  return (
    <>
      <header className="ib-header header-default header-fixed header--sticky fluid-header">
        <div className="header-inner d-flex align-items-center justify-content-between">
          <div className="header-left d-flex align-items-center">
            <div className="logo-wrapper">
              <Link to="/" className="logo logo-light"><img src="images/logo-white.png" alt="brand" /> </Link>
              <Link to="/" className="logo logo-dark"><img src="images/logo-dark.png" alt="brand" /> </Link>
            </div>
          </div>
          <div className="header-right d-flex align-items-center">
            <div className="mainmenu-wrapper">
              <nav id="sideNav" className="mainmenu-nav d-none d-xl-block">
                <ul className="mainmenu">
                  <li className="">
                    <Link className="" to="/">Home</Link>
                  </li>
                  <li className="">
                    <Link className="" to="/market">Market</Link>
                  </li>
                  <li className="">
                    <Link className="" to="/trade">Trade</Link>
                  </li>
                  <li className="">
                    <Link className="" to="/funds">Funds</Link>
                  </li>
                  <li className="">
                    <Link className="" to="/stacking">Stacking</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <ul className="header-right-inner">
              <li className="setting-option mobile-menu-bar d-block d-xl-none">
                <button className="hamberger-button" onClick={() => showMenu()}>
                  <i className="ri-menu-2-fill"></i>
                </button>
              </li>
              <li className="avatar-info">
                <span className="cursor_pointer">

                  {!getSelfy ? <img src="images/profilelogo.png" alt="user avatar" /> :
                    <img src={`${ApiConfig.baseUrl + '/uploads/' + getSelfy}`} alt="user avatar" />
                  }

                </span>
                <ul className="submenu">
                  <li><Link to="/profile"><i className="ri-user-line"></i> My Account</Link></li>
                  <li>
                    <Link className="" to="/referral"><i class="ri-share-line"></i>Invite & Earn</Link>
                  </li>
                  <li><a style={{ cursor: 'pointer' }} onClick={() => handleLogOut()}><i className="ri-logout-box-r-line"></i>Log out</a></li>
                </ul>
              </li>
              <li>
                <label className="theme-switcher-label d-flex active" for="theme-switcher" >
                  <input type="checkbox" className="theme-switcher" id="theme-switcher" onClick={() => handleTheme()} />
                  <div className="switch-handle">
                    <i className="ri-moon-line dark-text"></i>
                    <i className="ri-sun-line light-text"></i>
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="popup-mobile-menu" id="qwert">
        <div className="inner">
          <div className="header-top">
            <div className="logo logo-custom-css">
              <a className="logo-light" href="index.php"><img src="images/logo-white.png" alt="nft-logo" /></a>
            </div>
            <div className="close-menu">
              <button className="close-button" onClick={() => hideMenu()}>
                <i className="ri-close-fill"></i>
              </button>
            </div>
          </div>
          <nav>
            <ul className="mainmenu">
              <li> <Link className="" to="/">Home</Link>
              </li>
              <li className="">
                <Link className="" to="/market">Market</Link>
              </li>
              <li className="">
                <Link className="" to="/trade">Trade</Link>
              </li>
              <li className="">
                <Link className="" to="/funds">Funds</Link>
              </li>
              <li>
                <Link className="" to="/stacking">Stacking</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default UserHeader;