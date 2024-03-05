import React from "react";
import authServices from "../../services/authServices";

const User = (props) => {
  const { theme, a, user, query, dateRevise, onDelete } = props;

  const authorized = authServices.compareAuthorization(
    a.author && a.author._id,
    user._id
  );
  //用户是否为当前文章的作者
  const admin = user && user.isAdmin;
  //是否为管理员
  const dateToMap = a.oldDate ? a.oldDate : a.date;
  //判断是否分享
  const nameQuery = query.option === "userName" && query.word;
  const nameBefore = a.author.userName.slice(
    0,
    a.author.userName.indexOf(query.word)
  );
  const nameAfter = a.author.userName.slice(
    a.author.userName.indexOf(query.word) + query.word.length,
    a.author.userName.length
  );
  //搜索高亮

  a.date = dateRevise("YYYY-mm-dd HH:MM:SS", new Date(a.date));
  return theme === "daytime" ? (
    <div
      className="d-flex justify-content-between"
      style={{ height: "100%", width: "100%" }}
    >
      <a
        className="d-flex justify-content-start p-2"
        href="https://user.qzone.qq.com/1303140304"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={a.author && a.author.portrait}
          alt=""
          className="pl-0 pr-0 rounded-circle  "
          style={{
            width: "4em",
            height: "4em",
            objectFit: "cover",
          }}
        />

        <div className="col" width={"20%"}>
          <h6
            className="card-title mt-1"
            style={{ fontSize: "1em", fontWeight: "bold" }}
          >
            {!nameQuery && a.author.userName}
            {nameQuery && nameBefore}
            {nameQuery && <span className="text-danger">{query.word}</span>}
            {nameQuery && nameAfter}
          </h6>
          <h6 className="mt-3" style={{ fontSize: "1em" }}>
            {dateToMap.slice(0, 10) + " " + dateToMap.slice(11, 19)}
          </h6>
        </div>
      </a>
      {!a.sharer && (authorized || admin) && (
        <div
          className="pointer"
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
  ) : (
    //夜间模式
    <div
      className="d-flex justify-content-between"
      style={{ height: "100%", width: "100%" }}
    >
      <a
        className="d-flex justify-content-start p-2"
        href="https://user.qzone.qq.com/1303140304"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={a.author && a.author.portrait}
          alt=""
          className="pl-0 pr-0 rounded-circle  "
          style={{
            width: "4em",
            height: "4em",
            objectFit: "cover",
          }}
        />

        <div className="col text-light" width={"20%"}>
          <h6
            className="card-title mt-1"
            style={{ fontSize: "1em", fontWeight: "bold" }}
          >
            {!nameQuery && a.author.userName}
            {nameQuery && nameBefore}
            {nameQuery && <span className="text-danger">{query.word}</span>}
            {nameQuery && nameAfter}
          </h6>
          <h6 className="mt-3" style={{ fontSize: "1em" }}>
            {dateToMap.slice(0, 10) + " " + dateToMap.slice(11, 19)}
          </h6>
        </div>
      </a>
      {!a.sharer && (authorized || admin) && (
        <div
          className="pointer"
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
  );
};

export default User;
