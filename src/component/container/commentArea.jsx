import React from "react";

const CommentArea = ({
  theme,
  a,
  talkArea,
  onFocus,
  onBlur,
  onChange,
  onComment,
}) => {
  if (talkArea[a._id]) {
    const { value, commentHeight, commentTip } = talkArea[a._id];
    return theme === "daytime" ? (
      <div
        className="d-flex justify-content-start mt-2 "
        onFocus={() => onFocus(a)}
        onBlur={() => onBlur(a)}
      >
        <textarea
          id={a.id}
          value={value}
          name="text"
          cols="40"
          rows={commentHeight}
          className="form-control"
          aria-label="Text input with radio button"
          placeholder={commentTip || "Organizing language..."}
          maxLength="100"
          onChange={onChange.bind(this, a)}
          style={{ resize: "none", width: "90%" }}
        />
        <input
          type="button"
          className="btn border-0 shadow-none text-light bg-primary ml-4 "
          value="Send"
          onClick={() => onComment(a)}
        />
      </div>
    ) : (
      // Night mode
      <div
        className="d-flex justify-content-start mt-2 "
        onFocus={() => onFocus(a)}
        onBlur={() => onBlur(a)}
      >
        <textarea
          id={a.id}
          value={value}
          name="text"
          cols="40"
          rows={commentHeight}
          className="form-control bg-secondary text-light"
          aria-label="Text input with radio button"
          placeholder={commentTip || "Organizing language..."}
          maxLength="100"
          onChange={onChange.bind(this, a)}
          style={{ resize: "none", width: "90%" }}
        />
        <input
          type="button"
          className="btn border-0 shadow-none text-light bg-secondary ml-4 "
          value="Send"
          onClick={() => onComment(a)}
        />
      </div>
    );
  }
};

export default CommentArea;
