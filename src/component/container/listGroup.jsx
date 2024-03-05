import React from "react";
import { Link } from "react-router-dom";

const ListGroup = (props) => {
  const { theme } = props;
  const options = [
    { label: "Introduction", path: "/introduction" },
    { label: "Activities", path: "/activities" },
    { label: "My Concerns", path: "/my-concern" },
    { label: "Find Friends", path: "/find-friends" },
  ];

  return theme === "daytime" ? (
    <div className="list-group col-3">
      <div className="sticky-top" style={{ top: "1em" }}>
        <div className="rounded">
          {options.map((o) => (
            <Link
              key={o.label}
              className="list-group-item list-group-item-action bg-light"
              to={o.path}
            >
              {o.label}
            </Link>
          ))}
        </div>

        <div className="mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Content Title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Content Description</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <div className="text-center">
                <a
                  href="https://user.qzone.qq.com/1303140304/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link text-danger font-weight-bolder"
                >
                  QQ Space
                </a>
                <a
                  href="https://github.com/fcater/React-bbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link text-danger font-weight-bolder"
                >
                  Code Repository
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-muted">Forum Name</h5>
              <h6 className="card-subtitle mt-2 text-muted">Copyright Statement</h6>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // Night mode
    <div className="list-group col-3">
      <div className="sticky-top" style={{ top: "1em" }}>
        <div className="rounded">
          {options.map((o) => (
            <Link
              key={o.label}
              className="list-group-item list-group-item-action bg-dark text-light"
              to={o.path}
            >
              {o.label}
            </Link>
          ))}
        </div>

        <div className="mt-3">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title">Content Title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Content Description</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <div className="text-center">
                <a
                  href="https://user.qzone.qq.com/1303140304/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link text-danger font-weight-bolder"
                >
                  QQ Space
                </a>
                <a
                  href="https://github.com/fcater/React-bbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link text-danger font-weight-bolder"
                >
                  Code Repository
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-muted">Forum Name</h5>
              <h6 className="card-subtitle mt-2 text-muted">Copyright Statement</h6>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListGroup;
