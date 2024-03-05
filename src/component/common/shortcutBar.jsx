import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserOffLine } from "./../../services/authServices";

class ShortcutBar extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    const user = getCurrentUserOffLine();
    this.setState({ user });
  }
  render() {
    return (
      this.state.user && (
        <div>
          <div className="col " style={{ height: "214px" }}></div>
          {/* 撑高度用的 */}
          <div className="sticky-top" style={{ top: "3em" }}>
            <Link to="/home">
              <i
                className="fa fa-home fa-fw pointer homeIcon mb-2 d-block"
                style={{ fontSize: "2em" }}
              ></i>
            </Link>
            <Link to="/personal-information">
              <i
                className="fa fa-address-book fa-fw pointer personInfoIcon mb-2 d-block"
                style={{ fontSize: "2em" }}
              ></i>
            </Link>
            <Link to="/setting">
              <i
                className="fa fa-cog fa-fw pointer settingIcon mb-2 d-block"
                style={{ fontSize: "2em" }}
              ></i>
            </Link>
            <Link to="/logout">
              <i
                className="fa fa-sign-out fa-fw pointer logoutIcon mb-2 d-block"
                style={{ fontSize: "2em" }}
              ></i>
            </Link>
            <div className="position-sticky">
              <a href="#top">
                <i
                  className="fa fa-arrow-up fa-fw pointer topIcon mt-5"
                  style={{ fontSize: "2em" }}
                ></i>
              </a>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default ShortcutBar;
