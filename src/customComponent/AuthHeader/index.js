import React,{useEffect} from "react";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  const token = localStorage.getItem("token");

 /*  function myToggleFunction() {
    let element = document.getElementById("body");
          element.classList.toggle("theme-light");
          element.classList.toggle("theme-dark");
          switcher();
          
  };

  function switcher() {
    let element2 = document.getElementById("body");
    element2.classList.toggle("active");
  } */



  useEffect(() => {
    const tab = document.getElementById("body");
    console.log(tab.classList[0], 'tab');
    let theme = localStorage.getItem("theme");
    

    if(theme === "1") {
        // tab.classList.toggle("theme-dark");
        // tab.classList.toggle("theme-light");
        tab.classList.add("theme-dark")
        
    }
    else{
        tab.classList.toggle("theme-light");
        tab.classList.toggle("theme-dark");
        
        
    } 
},[])

const handleTheme = () => {
    const tab = document.getElementById("body");
    console.log(tab, 'tab');
    let theme = localStorage.getItem("theme");
    if(theme === "1") {
      localStorage.setItem("theme", "2");
        tab.classList.toggle("theme-light");
        tab.classList.toggle("theme-dark");
    }else{
        localStorage.setItem("theme", "1");
        tab.classList.toggle("theme-dark");
        tab.classList.toggle("theme-light");
        
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
    return (
        <>
            <header className="ib-header header-default header-fixed header--sticky fluid-header">
    <div className="header-inner d-flex align-items-center justify-content-between">
      <div className="header-left d-flex align-items-center">
        <div className="logo-wrapper">
          <Link to="/" className="logo logo-light"><img src="images/logo-white.png" alt="brand" /> </Link>
          <Link to="/" className="logo logo-dark"><img src="images/logo-dark.png" alt="brand" /> </Link>
        </div>
        {/* <!-- End .logo-wrapper --> */}
      </div>
      {/* <!-- End .header-left --> */}

      <div className="header-right d-flex align-items-center">

        <div className="mainmenu-wrapper">
          <nav id="sideNav" className="mainmenu-nav d-none d-xl-block">
            {/* <!-- Start Mainmanu Nav --> */}
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
              {/* <li className="">
                {token ? <Link className="" to="/funds">Funds</Link> : <Link className="" to="/login">Funds</Link>}
              </li> */}

             {/* <!--  <li className="has-dropdown has-menu-child-item">
                <a href="#">Explore</a>
                <ul className="submenu">
                  <li>
                    <a href="explore-filter.html">Explore Filter</a>
                  </li>
                  <li>
                    <a href="explore-filter.html">Explore Filter</a>
                  </li>
                  <li>
                    <a href="explore-filter.html">Explore Filter</a>
                  </li>
                  <li>
                    <a href="explore-filter.html">Explore Filter</a>
                  </li>
                </ul>
              </li> --> */}
              {/* <!-- <li>
                  <a href="contact.php">Contact</a>
              </li> --> */}
            </ul>
            {/* <!-- End Mainmanu Nav --> */}
          </nav>
        </div>
        <ul className="header-right-inner">
          

          {/* <!-- End .search-mobile-icon --> */}

          <li className="wallet-button"> 
            <div className="btn-group" >
                  <Link to="/login" className="btn btn-gradient btn-small">
                    <span>Sign In</span>
                  </Link>
                  <Link to="/signup" className="btn btn-gradient btn-small">
                    <span>Sign Up</span>
                  </Link>
            </div>
          </li>
          {/* <!-- End .wallet-button --> */}

          <li className="setting-option mobile-menu-bar d-block d-xl-none">
            <button className="hamberger-button" onClick={() => showMenu()}>
              <i className="ri-menu-2-fill"></i> 
            </button>
          </li>
          {/* <!-- End .mobile-menu-bar --> */}
          {/* <!-- <li className="avatar-info"> <a href="#"><img src="images/avatar/user.png" alt="user avatar"></a>
            <ul className="submenu">
              <li><a href="#"><i className="ri-user-line"></i> Profile</a></li>
              <li><a href="#"><i className="ri-edit-line"></i> Create Item</a></li>
              <li><a href="#"><i className="ri-layout-grid-line"></i>Authors</a></li>
              <li><a href="#"><i className="ri-logout-box-r-line"></i>Sign in</a></li>
            </ul>
          </li> --> */}
          {/* <!-- End .avatar-info --> */}

          <li>
            <label  className="theme-switcher-label d-flex active " for="theme-switcher" >
              <input type="checkbox" className="theme-switcher" id="theme-switcher" onClick={() => handleTheme()}/>
              <div className="switch-handle">
                    <i className="ri-moon-line dark-text"></i>
                    <i className="ri-sun-line light-text"></i>
              </div>
            </label>
          </li>
          {/* <!-- End Dark & Light Swither --> */}
        </ul>

      </div>
      {/* <!-- End .header-left --> */}
    </div>
  </header>
  {/* <!-- End header area --> */}

    {/* <!-- Start mobile menu area --> */}
  <div className="popup-mobile-menu" id="qwert">
    <div className="inner">
      <div className="header-top">
        <div className="logo logo-custom-css">
          <Link className="logo-light" to="/"><img src="images/logo-white.png" alt="nft-logo" /></Link>
        </div>
        <div className="close-menu">
          <button className="close-button" onClick={() => hideMenu()}>
            <i className="ri-close-fill"></i>
          </button>
        </div>
      </div>
      <nav>
        {/* <!-- Start Mainmanu Nav --> */}
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

             {/* <!--  <li className="has-dropdown has-menu-child-item">
                <a href="#">Explore</a>
                <ul className="submenu">
                  <li>
                    <a href="#">Explore Filter</a>
                  </li>
                </ul>
              </li> --> */}
              <li><Link to="/comingsoon">Contact</Link></li>

         
        </ul>
        {/* <!-- End Mainmanu Nav --> */}
      </nav>
    </div>
  </div>
        </>
    );
}

export default AuthHeader;
