import React, { useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { withTranslation } from "react-i18next";

//import drawer
import ReactDrawer from "react-drawer";
import "react-drawer/lib/react-drawer.css";

//import component
import RightSidebar from "../CommonForBoth/RightSidebar";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//import images
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Header = (props: any) => {
  const [position, setPosition] = useState<string>();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  /**
   * Rightsidebar drawer
   */

  const toggleTopDrawer = () => {
    setPosition("right");
    setOpenDrawer(!openDrawer);
  };

  const onDrawerClose = () => {
    setOpenDrawer(false);
  };

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    }
    document.body.setAttribute("data-sidebar-size", "lg");
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/drug-table" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="22" />
                </span>
              </Link>

              <Link to="/drug-table" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="22" />
                </span>
              </Link>
            </div>

            <button
              onClick={() => {
                tToggle();
              }}
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>

          <div className="d-flex">
            <ProfileMenu />
          </div>
        </div>
      </header>

      <ReactDrawer
        open={openDrawer}
        onClose={onDrawerClose}
        position={position}
      >
        <RightSidebar onClose={onDrawerClose} />
      </ReactDrawer>
    </React.Fragment>
  );
};

export default withTranslation()(Header);
