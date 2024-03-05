import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserOffLine } from "./../../services/authServices";

class MobileShortcut extends Component {
  state = {
    user: {},
    toggle: "d-none position-fixed",
  };
  componentDidMount() {
    const user = getCurrentUserOffLine();
    this.setState({ user });
  }

  handleTool = () => {
    let { toggle } = this.state;
    toggle === "d-none position-fixed"
      ? (toggle = "position-fixed")
      : (toggle = "d-none position-fixed");
    this.setState({ toggle });
  };

  render() {
    const { toggle } = this.state;
    const { theme } = this.props;
    return theme === "daytime"
      ? this.state.user && (
          <div className="ml-auto mr-4">
            <i
              className={
                toggle === "d-none position-fixed"
                  ? "fa fa-eject fa-rotate-180 rounded-circle fa-2x"
                  : "fa fa-eject rounded-circle fa-2x "
              }
              onClick={this.handleTool}
            ></i>
            <div className={toggle} style={{ top: "6em", right: "1px" }}>
              <div className="rounded-pill">
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
              </div>
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
      : //夜间模式
        this.state.user && (
          <div className="ml-auto mr-4">
            <i
              className={
                toggle === "d-none position-fixed"
                  ? "fa fa-eject fa-rotate-180 rounded-circle fa-2x"
                  : "fa fa-eject rounded-circle fa-2x "
              }
              onClick={this.handleTool}
            ></i>
            <div className={toggle} style={{ top: "6em", right: "1px" }}>
              <div className="rounded-pill ">
                <Link to="/home">
                  <i
                    className="fa fa-home fa-fw pointer homeIcon mb-2 d-block text-light"
                    style={{ fontSize: "2em" }}
                  ></i>
                </Link>
                <Link to="/personal-information">
                  <i
                    className="fa fa-address-book fa-fw pointer personInfoIcon mb-2 d-block text-light"
                    style={{ fontSize: "2em" }}
                  ></i>
                </Link>
                <Link to="/setting">
                  <i
                    className="fa fa-cog fa-fw pointer settingIcon mb-2 d-block text-light"
                    style={{ fontSize: "2em" }}
                  ></i>
                </Link>
                <Link to="/logout">
                  <i
                    className="fa fa-sign-out fa-fw pointer logoutIcon mb-2 d-block text-light"
                    style={{ fontSize: "2em" }}
                  ></i>
                </Link>
              </div>
              <div className="position-sticky">
                <a href="#top">
                  <i
                    className="fa fa-arrow-up fa-fw pointer topIcon mt-5 text-light"
                    style={{ fontSize: "2em" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        );
  }
}

export default MobileShortcut;
