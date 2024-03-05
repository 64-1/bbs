import React, { forwardRef } from "react";

const CreatBox = forwardRef((props, ref) => {
  const {
    theme,
    newArticle,
    onUpload,
    onUrlChange,
    onTitle,
    onNewArticle,
  } = props;
  return theme === "daytime" ? (
    <div className="creat-box bg-white rounded-lg shadow">
      <p className="p-2 pl-3 pr-3 rounded-top text-dark d-flex justify-content-between drag">
        New Post
      </p>
      <div className="d-flex flex-column m-3 ">
        <img src={newArticle.imgView} alt="" className="pb-2" width="50%" />
        <textarea
          name="text"
          cols="50"
          rows="3"
          className="form-control"
          aria-label="Text input with radio button"
          placeholder={newArticle.placeholder}
          maxLength="100"
          value={newArticle.title}
          onChange={onTitle}
          style={{ resize: "none" }}
        />
        <div className="d-flex justify-content-between">
          <i
            className="fa fa-image text-primary fa-2x mt-2 pointer"
            onClick={onUpload}
          ></i>
          <input
            accept="image/png, image/jpeg, image/gif"
            type="file"
            className="file-input d-none"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            ref={ref}
            onChange={onUrlChange}
          />
          <input
            type="button"
            className="btn border-0 shadow-none text-light bg-primary mt-2 mb-2"
            value="Publish"
            onClick={onNewArticle}
          />
        </div>
      </div>
    </div>
  ) : (
    // Night mode
    <div className="creat-box bg-dark text-light rounded-lg shadow">
      <p className="p-2 pl-3 pr-3 rounded-top d-flex justify-content-between drag">
        New Post
      </p>
      <div className="d-flex flex-column m-3 ">
        <img src={newArticle.imgView} alt="" className="pb-2" width="50%" />
        <textarea
          name="text"
          cols="50"
          rows="3"
          className="form-control bg-secondary text-light"
          aria-label="Text input with radio button"
          placeholder={newArticle.placeholder}
          maxLength="100"
          value={newArticle.title}
          onChange={onTitle}
          style={{ resize: "none" }}
        />
        <div className="d-flex justify-content-between">
          <i
            className="fa fa-image text-light fa-2x mt-2 pointer"
            onClick={onUpload}
          ></i>
          <input
            accept="image/png, image/jpeg, image/gif"
            type="file"
            className="file-input d-none"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            ref={ref}
            onChange={onUrlChange}
          />
          <input
            type="button"
            className="btn border-0 shadow-none text-light bg-dark mt-2 mb-2"
            value="Publish"
            onClick={onNewArticle}
          />
        </div>
      </div>
    </div>
  );
});

export default CreatBox;
