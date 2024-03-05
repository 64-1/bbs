import React from "react";
import authServices from "../../services/authServices";

const Sharer = ({ theme, a, user, onDelete }) => {
  const authorized = authServices.compareAuthorization(
    a.sharer && a.sharer._id,
    user && user._id
  );
  //是否为分享者
  const admin = user && user.isAdmin;
  //是否为管理员
  return theme === "daytime" ? (
    <React.Fragment>
      {a.sharer && (
        <div
          className="d-flex justify-content-start"
          style={{ height: "100%", width: "100%" }}
        >
          <a
            className="d-flex justify-content-start p-2"
            href="https://user.qzone.qq.com/1303140304"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={a.sharer.portrait}
              alt=""
              className="pl-0 pr-0 rounded-circle  "
              style={{
                width: "3em",
                height: "3em",
                objectFit: "cover",
              }}
            />

            <div className="col" width={"20%"}>
              <div className="row">
                <p
                  className="card-title m-0 ml-3"
                  style={{ fontWeight: "bold" }}
                >
                  {a.sharer.userName}
                </p>
                {a.content && (
                  <p className="card-text font-weight-bolder ml-1">
                    {" "}
                    : {a.content}
                  </p>
                )}
              </div>
              <h6 className="" style={{ fontSize: "1em" }}>
                {a.date.slice(0, 10) + " " + a.date.slice(11, 19)}
              </h6>
            </div>
          </a>

          {(authorized || admin) && (
            <div
              className="pointer ml-auto mr-4 mt-3"
              onClick={() => onDelete(a)}
              style={{
                color: "red",
                height: "30px",
                width: "30px",
                textAlign: "center",
              }}
            >
              x
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  ) : (
    //夜间模式
    <React.Fragment>
      {a.sharer && (
        <div
          className="d-flex justify-content-start"
          style={{ height: "100%", width: "100%" }}
        >
          <a
            className="d-flex justify-content-start p-2"
            href="https://user.qzone.qq.com/1303140304"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={a.sharer.portrait}
              alt=""
              className="pl-0 pr-0 rounded-circle "
              style={{
                width: "3em",
                height: "3em",
                objectFit: "cover",
              }}
            />

            <div className="col text-light" width={"20%"}>
              <div className="row ">
                <p
                  className="card-title m-0 ml-3 "
                  style={{ fontWeight: "bold" }}
                >
                  {a.sharer.userName}
                </p>
                {a.content && (
                  <p className="card-text font-weight-bolder ml-1">
                    {" "}
                    : {a.content}
                  </p>
                )}
              </div>
              <h6 className="" style={{ fontSize: "1em" }}>
                {a.date.slice(0, 10) + " " + a.date.slice(11, 19)}
              </h6>
            </div>
          </a>
          {(authorized || admin) && (
            <div
              className="pointer ml-auto mr-4 mt-3"
              onClick={() => onDelete(a)}
              style={{
                color: "white",
                height: "30px",
                width: "30px",
                textAlign: "center",
              }}
            >
              x
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
export default Sharer;
