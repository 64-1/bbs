import React from "react";

const ShareBox = ({ share, theme, a, onClose, onChange, onShare }) => {
  console.log();
  return theme === "daytime"
    ? a.shareBox && (
        <div className="share-box position-absolute bg-white rounded-lg shadow">
          <div className="d-flex justify-content-between drag-head">
            <p
              className="p-2 pl-3 m-0 rounded-top text-dark drag handle"
              style={{ width: "90%" }}
            >
              转发
            </p>
            <span
              className="align-text-bottom pointer p-2 pr-3"
              onClick={onClose}
            >
              x
            </span>
          </div>

          <div className="m-3  row bg-light rounded-lg pointer">
            {a.img && <img width="50px" height="50px" src={a.img} alt="" />}
            <p className="ml-3">{a.title}</p>
          </div>
          <div className="d-flex flex-column m-3 ">
            <textarea
              name="text"
              value={share.shareword}
              cols="50"
              rows="1"
              className="form-control "
              aria-label="Text input with radio button "
              placeholder={share.shareTip}
              maxLength="20"
              onChange={onChange}
            />
            <input
              type="button"
              className="btn  border-0  shadow-none ml-auto text-light bg-primary mt-2 mb-2"
              value="发送"
              onClick={onShare}
            />
          </div>
        </div>
      )
    : //夜间模式
      a.shareBox && (
        <div className="share-box position-absolute bg-dark text-light rounded-lg shadow border">
          <div className="d-flex justify-content-between drag-head rounded-top  border-bottom bg-dark text-light">
            <p className="p-2 pl-3 m-0  drag handle" style={{ width: "90%" }}>
              转发
            </p>
            <span
              className="align-text-bottom  pointer p-2 pr-3"
              onClick={onClose}
            >
              x
            </span>
          </div>

          <div className="m-3  row bg-dark text-light rounded-lg pointer">
            {a.img && <img width="50px" height="50px" src={a.img} alt="" />}
            <p className="ml-3">{a.title}</p>
          </div>
          <div className="d-flex flex-column m-3 ">
            <textarea
              name="text"
              value={share.shareword}
              cols="50"
              rows="1"
              className="form-control "
              aria-label="Text input with radio button "
              placeholder={share.shareTip}
              maxLength="20"
              onChange={onChange}
            />
            <input
              type="button"
              className="btn  border-0  shadow-none ml-auto text-light bg-secondary mt-2 mb-2"
              value="发送"
              onClick={onShare}
            />
          </div>
        </div>
      );
};

export default ShareBox;
