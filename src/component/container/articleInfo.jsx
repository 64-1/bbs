import React from "react";

const ArticleInfo = ({ theme, a, query }) => {
  const titleQuery = query.option === "title" && query.word;
  const titleBefore =
    titleQuery && a.title.slice(0, a.title.indexOf(query.word));
  const titleAfter =
    query.option === "title" &&
    query.word &&
    a.title.slice(
      a.title.indexOf(query.word) + query.word.length,
      a.title.length
    );
  return theme === "daytime" ? (
    <React.Fragment>
      <h6 className="card-subtitle mt-2 mb-2 font-weight-bold">
        {!titleQuery && a.title}
        {titleQuery && titleBefore}
        {titleQuery && <span className="text-danger">{query.word}</span>}
        {titleQuery && titleAfter}
      </h6>
      {a.img && (
        <img width="60%" src={a.img} alt="" className="card-img-botton" />
      )}
    </React.Fragment>
  ) : (
    //夜间模式
    <React.Fragment>
      <h6 className="card-subtitle mt-2 mb-2 font-weight-bold text-light">
        {!titleQuery && a.title}
        {titleQuery && titleBefore}
        {titleQuery && <span className="text-danger">{query.word}</span>}
        {titleQuery && titleAfter}
      </h6>
      {a.img && (
        <img width="60%" src={a.img} alt="" className="card-img-botton" />
      )}
    </React.Fragment>
  );
};

export default ArticleInfo;
