import React from "react";

const Comment = ({ theme, a, user, dateRevise, onCommentDelete }) => {
  const admin = user && user.isAdmin;
  const img =
    "http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcV9rQ8hBQluBPp5G9UgdbghQfKJTylgMZITdpGuk5ONWTu5e.5G17FCbb1cNcfP4mEuNEm7mySIFxj4eVKJ7x2Q!/r";
  a.comment.forEach((e) =>
    e.author === null
      ? (e.author = {
          _id: "5ffd16bc926b7b1a2c74170e",
          userName: "Unknown User",
          portrait: img,
        })
      : null
  );

  return theme === "daytime" ? (
    <React.Fragment>
      {a.comment.map((c) => (
        <div
          className="d-flex justify-content-start m-1 ml-4 border border-primary rounded-pill"
          key={c.commentDate}
          style={{
            width: "80%",
            backgroundColor: "rgb(245,245,245)",
          }}
        >
          <img
            src={c.author.portrait}
            alt=""
            className="m-2 mt-auto mb-auto pl-0 pr-0 rounded-circle"
            style={{ width: "3em", height: "3em" }}
          />
          <div style={{ width: "70%" }}>
            <h6 className="card-title pt-2 mb-1" style={{ fontSize: "1em" }}>
              {c.author.userName}:
              <div className="mt-1">
                <b>
                  {c.author.userName === "Unknown User" ? "This user has been blocked" : c.word}
                </b>
              </div>
            </h6>
            <p className="mb-1">
              {dateRevise("YYYY-mm-dd HH:MM:SS", new Date(c.commentDate))}
            </p>
          </div>
          {user &&
            (c.author._id === user._id ||
              a.author._id === user._id ||
              admin) && (
              <div
                className="mt-auto mb-auto pointer text-danger"
                onClick={() => onCommentDelete(a, c)}
              >
                x
              </div>
            )}
        </div>
      ))}
    </React.Fragment>
  ) : (
    // Night mode
    <React.Fragment>
      {a.comment.map((c) => (
        <div
          className="d-flex justify-content-start m-1 ml-4 border border-primary rounded-pill bg-dark text-light"
          key={c.commentDate}
          style={{
            width: "80%",
            backgroundColor: "rgb(245,245,245)",
          }}
        >
          <img
            src={c.author.portrait}
            alt=""
            className="m-2 mt-auto mb-auto pl-0 pr-0 rounded-circle"
            style={{ width: "3em", height: "3em" }}
          />
          <div style={{ width: "70%" }}>
            <h6 className="card-title pt-2 mb-1" style={{ fontSize: "1em" }}>
              {c.author.userName}:
              <div className="mt-1">
                <b>
                  {c.author.userName === "Unknown User" ? "This user has been blocked" : c.word}
                </b>
              </div>
            </h6>
            <p className="mb-1">
              {dateRevise("YYYY-mm-dd HH:MM:SS", new Date(c.commentDate))}
            </p>
          </div>
          {user &&
            (c.author._id === user._id ||
              a.author._id === user._id ||
              admin) && (
              <div
                className="mt-auto mb-auto pointer text-light"
                onClick={() => onCommentDelete(a, c)}
              >
                x
              </div>
            )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default Comment;
