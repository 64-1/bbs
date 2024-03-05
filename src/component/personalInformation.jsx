import React from "react";
import { Link } from "react-router-dom";

const PersonalInformation = ({ theme, user }) => {
  if (!user) return (window.location = "/");
  //如果在此页面刷新会丢失app传来的user
  return theme === "daytime" ? (
    <React.Fragment>
      <div
        className={
          document.documentElement.clientWidth < 500
            ? "card container w-100 mb-5"
            : "card container w-50 mb-5"
        }
        style={{ width: "18rem" }}
      >
        <div className="row">
          <img
            src={user.portrait}
            alt=""
            className="m-3 rounded-circle d-inline"
            style={{
              width: "4em",
              height: "4em",
              objectFit: "cover",
            }}
          />
          <div className="card-body w-50 col">
            <div className="row">
              <h5 className="card-title pl-3">{user.userName}</h5>
              <small className="text-muted pl-2 pt-1">
                {user.isAdmin ? "(Admin)" : "(User)"}
              </small>
            </div>
            <p className="card-text">{user.email}</p>
          </div>
          <Link
            to="/setting"
            className="btn btn-primary col-1 h-25 p-0 mt-5 mr-5 text-white"
          >
            Modify
          </Link>
        </div>
        <div>
          <h5>Id:{user._id}</h5>
          <h5>Gender:{user.sex ? "Female" : "Male"}</h5>
          <h5>Photo:</h5>
          <div className="row justify-content-md-center">
            <img className="w-50" src={user.portrait} alt="" />
          </div>
          <div className="text-center">
            <small className="text-muted">
              Registration date:
              {user.registrationrDate &&
                user.registrationrDate.slice(0, 10) +
                  " | " +
                  user.registrationrDate.slice(11, 19)}
            </small>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    //夜间模式
    <React.Fragment>
      <div
        className={
          document.documentElement.clientWidth < 500
            ? "card container w-100 mb-5 bg-dark text-light"
            : "card container w-50 mb-5 bg-dark text-light"
        }
        style={{ width: "18rem" }}
      >
        <div className="row">
          <img
            src={user.portrait}
            alt=""
            className="m-3 rounded-circle d-inline"
            style={{
              width: "4em",
              height: "4em",
              objectFit: "cover",
            }}
          />
          <div className="card-body w-50 col">
            <div className="row">
              <h5 className="card-title pl-3">{user.userName}</h5>
              <small className="text-muted pl-2 pt-1">
                {user.isAdmin ? "(Admin)" : "(User)"}
              </small>
            </div>
            <p className="card-text">{user.email}</p>
          </div>
          <Link
            to="/setting"
            className="btn btn-primary col-1 h-25 p-0 mt-5 mr-5 text-white"
          >
            Modify
          </Link>
        </div>
        <div>
          <h5>Id:{user._id}</h5>
          <h5>Gender:{user.sex ? "女" : "男"}</h5>
          <h5>Photo:</h5>
          <div className="row justify-content-md-center">
            <img className="w-50" src={user.portrait} alt="" />
          </div>
          <div className="text-center">
            <small className="text-muted">
              Registration date:
              {user.registrationrDate &&
                user.registrationrDate.slice(0, 10) +
                  " | " +
                  user.registrationrDate.slice(11, 19)}
            </small>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalInformation;
