import React, { useState } from "react";
import ReactDrawer from "react-drawer";
import "react-drawer/lib/react-drawer.css";
import { withTranslation } from "react-i18next";

import { Link } from "react-router-dom";

// Import menuDropdown
import RightSidebar from "../CommonForBoth/RightSidebar";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//import images
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Header = (props: any) => {
  const [position, setPosition] = useState<string>();
  const [rightbarOpen, setrightbarOpen] = useState<boolean>(false);

  const onDrawerClose = () => {
    setrightbarOpen(false);
  };

  const toggleLeftmenu = () => {
    var element = document.getElementById("topnav-menu-content");
    if (element) {
      element.classList.toggle("show");
    }
  };
  return (
    <React.Fragment>
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link to="/HealthFoodData" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoDark} alt="" height="22" />
              </span>
            </Link>

            <Link to="/HealthFoodData" className="logo logo-light">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoLight} alt="" height="22" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
            onClick={() => {
              toggleLeftmenu();
            }}
          >
            <i className="fa fa-fw fa-bars" />
          </button>
        </div>

        <div className="d-flex">
          <ProfileMenu />
        </div>
      </div>

      <ReactDrawer
        open={rightbarOpen}
        position={position}
        onClose={onDrawerClose}
      >
        <RightSidebar onClose={onDrawerClose} />
      </ReactDrawer>
    </React.Fragment>
  );
};

export default withTranslation()(Header);
