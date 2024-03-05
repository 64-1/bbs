import React from "react";

const HeartSVG = ({ theme, like }) => {
  const userList = like ? like.slice(0, 7) : null;

  return like && like.length ? (
    <div style={{ width: "75%" }}>
      <div className="row ml-2">
        <i
          className={
            like ? "fa fa-heart fa-lg text-danger mt-1" : "fa fa-heart-o fa-lg"
          }
        ></i>
        <i className="fa fa-heart-o"></i>
        <div className="row ml-3 text-danger" style={{ width: "80%" }}>
          {userList.map((u) => (
            <a
              className={theme === "daytime" ? null : "text-light"}
              key={userList.indexOf(u)}
              href="https://user.qzone.qq.com/1303140304"
              target="_black"
            >
              {u.userName}
              {userList.indexOf(u) === userList.length - 1 ? "" : "，"}
            </a>
          ))}
          <p className="mb-0 ml-1">
            {like.length > 7 ? "......" : " 觉得很赞"}
          </p>
        </div>
      </div>
      <div className="row ml-5 text-danger">
        {like.length > 7 && (
          <p className=" ml-5 mb-0">等{like.length}人觉得很赞</p>
        )}
      </div>
    </div>
  ) : null;
};

const LikeSVG = ({ a, device, user, onLike }) => {
  return (
    <i
      className={
        user && a.like && a.like.some((u) => u._id === user._id)
          ? "fa fa-thumbs-up  text-danger pointer"
          : "fa fa-thumbs-o-up  pointer"
      }
      onClick={onLike}
      // onClick={!a.like.some((u) => u._id === user._id) ? onLike : null}
      //判断是否点过赞
      style={{ fontSize: device === "mobile" ? "1em" : "2em" }}
    ></i>
  );
};

const TalkSVG = ({ a, device, onTalk }) => {
  return (
    <i
      className={
        a.talk
          ? "fa fa-commenting-o  text-primary ml-1"
          : "fa fa-commenting-o  pointer ml-1"
      }
      onClick={() => onTalk(a)}
      style={{ fontSize: device === "mobile" ? "1em" : "2em" }}
    ></i>
  );
};

const ShareSVG = ({ a, device, onShare }) => {
  return (
    <i
      className={
        a.share ? "fa fa-share text-primary ml-1" : "fa fa-share pointer ml-1"
      }
      onClick={onShare}
      style={{ fontSize: device === "mobile" ? "1em" : "2em" }}
    ></i>
  );
};

export { LikeSVG, TalkSVG, ShareSVG, HeartSVG };
