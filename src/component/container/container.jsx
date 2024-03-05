import React, { Component } from "react";
import * as articleService from "../../services/articleService";
import ShareBox from "../common/shareBox";
import CreatBox from "../common/creatBox";
import CommentArea from "./commentArea";
import Comment from "./comment";
import SvgGroup from "./svgGroup";
import User from "./user";
import Draggable from "react-draggable";
import ArticleInfo from "./articleInfo";
import Sharer from "./sharer";

class Container extends Component {
  state = {
    user: this.props.user,
    articles: [],
    newArticle: { placeholder: "Speak your mind" },
    talkArea: {},
    share: { shareWord: "", shareTip: "Please enter" },
  };

  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  async componentDidMount() {
    const { data: articles } = await articleService.getArticles();
    this.initializeLocalArticleProperties(articles);
    // Fetch articles and initialize the comment section and share toggle
    this.setState({ articles });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  // Stop asynchronous operations when the component is unmounted

  handleLike = async (article) => {
    const { user } = this.state;
    await articleService.likeArticles(article._id, user);

    const { data } = await articleService.getArticles();
    this.initializeLocalArticleProperties(data);
    this.setState({ articles: data });
  };

  handleChange = (a, e) => {
    let { talkArea } = this.state;
    talkArea[a._id].value = e.currentTarget.value;
    this.setState({ talkArea });
  };

  handleFocus = (a) => {
    let { talkArea, articles } = this.state;
    articles[articles.indexOf(a)].talk = true;
    talkArea[a._id].commentHeight = 3;
    this.setState({ talkArea, articles });
  };

  handleBlur = (a) => {
    let { talkArea, articles } = this.state;
    articles[articles.indexOf(a)].talk = false;
    talkArea[a._id].commentHeight = 1;
    this.setState({ talkArea, articles });
  };

  handleTalk = (a) => {
    this.handleFocus(a);
  };

  initializeLocalArticleProperties = (articles) => {
    const { talkArea } = this.state;

    for (let a of articles) {
      a.shareBox = false;
      talkArea[a._id] = {};
      talkArea[a._id].commentTip = null;
      talkArea[a._id].commentHeight = 1;
    }
    this.setState({ talkArea, articles });
  };

  handleComment = async (a) => {
    let { user, talkArea } = this.state;
    if (!talkArea[a._id].value) {
      talkArea[a._id].commentTip = "Comments cannot be empty.";
      this.setState({ talkArea });
      return;
    }
    if (!user) {
      return (window.location = "/login");
    }
    await articleService.reviewArticles(a._id, user, talkArea[a._id].value);
    const { data } = await articleService.getArticles();
    this.initializeLocalArticleProperties(data);
    // Fetch articles and initialize the comment section and share toggle

    talkArea[a._id].commentHeight = 1;
    talkArea[a._id].value = "";
    talkArea[a._id].commentTip = "Want to say more...";
    this.setState({ articles: data, talkArea });
  };

  handleShareWord = (e) => {
    const { share } = this.state;
    share.shareWord = e.currentTarget.value;
    this.setState({ share });
  };

  handleShare = async (a) => {
    const { user, share } = this.state;
    const { data } = await articleService.shareArticles(a, user, share.shareWord);
    this.initializeLocalArticleProperties(data);
    share.shareWord = "";
    this.setState({ articles: data, share });
  };

  handleShareBoxOpen = (a) => {
    const { articles } = this.state;
    articles.forEach((a) => (a.shareBox = a.share = false));
    articles[articles.indexOf(a)].share = !articles[articles.indexOf(a)].share;
    articles[articles.indexOf(a)].shareBox = !articles[articles.indexOf(a)].shareBox;
    this.setState({ articles });
  };

  handleShareBoxClose = (a) => {
    const { articles } = this.state;
    articles[articles.indexOf(a)].shareBox = false;
    articles[articles.indexOf(a)].share = false;
    this.setState({ articles });
  };

  handleDelete = async (a) => {
    const { data } = await articleService.deleteArticles(a._id);
    this.initializeLocalArticleProperties(data);
    this.setState({ articles: data });
  };

  handleCommentDelete = async (a, c) => {
    const { data } = await articleService.deleteComment(a._id, c);
    this.initializeLocalArticleProperties(data);
    // Fetch articles and initialize the comment section and share toggle
    this.setState({ articles: data });
  };

  handleImgUpload = () => {
    this.imgRef.current.click();
  };

  handleImgUrl = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      return alert("Uploaded image cannot exceed 1MB.");
    }
    if (file) {
      const { newArticle } = this.state;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imgcode = e.target.result;
        newArticle.img = imgcode;
      };
      // Convert the image to base64 code ready
      const url = window.webkitURL.createObjectURL(this.imgRef.current.files[0]);
      newArticle.imgView = url;
      // Create a quick preview
      this.setState({ newArticle });
    }
  };

  handleNewArticleTitle = (e) => {
    let { newArticle } = this.state;
    newArticle["title"] = e.currentTarget.value;
    this.setState({ newArticle });
  };

  handleNewArticle = async () => {
    let { newArticle } = this.state;
    if (!newArticle.title && !newArticle.imgView) {
      newArticle.placeholder = "Please enter text or add a picture";
      this.setState({ newArticle });
      // Can't post without text and image
    } else {
      const { user, talkArea } = this.state;
      if (!user) {
        return (window.location = "/login");
      }
      newArticle["author"] = user._id;
      const { data } = await articleService.newArticle(newArticle);
      // Add a new article
      newArticle.title = "";
      newArticle.img = null;
      newArticle.imgView = "";
      // Reset the posting window text and image
      this.initializeLocalArticleProperties(data);
      // Initialize the comment section and share toggle
      newArticle.placeholder = "Speak your mind";
      this.setState({ newArticle, articles: data, talkArea });
    }
  };

  render() {
    const {
      user,
      allUsersId,
      articles,
      newArticle,
      talkArea,
      share,
    } = this.state;
    const { theme, device, dateRevise, query } = this.props;
    const articlesQuery =
      query.option === "userName"
        ? query.word
          ? articles.filter((a) => a.author.userName.includes(query.word))
          : articles
        : query.word
        ? articles.filter((a) => a.title.includes(query.word))
        : articles;

    return theme === "daytime" ? (
      <React.Fragment>
        <div className="col">
          <CreatBox
            theme={theme}
            ref={this.imgRef} //为了隐藏难看的input而设的ref
            newArticle={newArticle} //获取待上传文章
            placeholder={this.state.newArticlePlaceholder} //提示语
            onUpload={this.handleImgUpload} //点击隐藏文件按钮
            onUrlChange={this.handleImgUrl} //获取文章图片
            onTitle={this.handleNewArticleTitle} //获取新标题
            onNewArticle={this.handleNewArticle} //发表新文章
          ></CreatBox>
          {articlesQuery.map((a) => (
            <div key={a._id} className="p-1 mb-3 bg-white rounded">
              <Sharer
                theme={theme}
                a={a}
                user={user}
                onDelete={() => this.handleDelete(a)}
              />
              <div className="card  border-secondary bg-light">
                <div className="card-body">
                  <User
                    theme={theme}
                    a={a}
                    user={user || {}}
                    query={query}
                    dateRevise={dateRevise}
                    onDelete={() => this.handleDelete(a)}
                  />
                  <ArticleInfo
                    theme={theme}
                    a={a}
                    query={query}
                    onHighLight={this.handleHighLihghtString}
                  />
                  <SvgGroup
                    theme={theme}
                    device={device}
                    a={a}
                    user={user}
                    onLike={this.handleLike}
                    onTalk={this.handleTalk}
                    onShareBoxOpen={this.handleShareBoxOpen}
                  ></SvgGroup>
                  <Comment
                    theme={theme}
                    a={a}
                    user={user}
                    allUsersId={allUsersId}
                    dateRevise={dateRevise}
                    onCommentDelete={this.handleCommentDelete}
                  ></Comment>
                  <CommentArea
                    theme={theme}
                    a={a}
                    talkArea={talkArea}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onComment={this.handleComment}
                  ></CommentArea>
                </div>
                <Draggable
                  axis="both"
                  handle=".handle"
                  defaultPosition={{ x: 0, y: 0 }}
                  bounds={{
                    left: -820,
                    right: 625,
                    top: -470,
                  }}
                  position={null}
                  grid={[5, 5]}
                  scale={1}
                  onStart={this.handleStart}
                  onDrag={this.handleDrag}
                  onStop={this.handleStop}
                >
                  <div style={{ zIndex: "999" }}>
                    <ShareBox
                      theme={theme}
                      user={user}
                      a={a}
                      share={share}
                      onClose={() => this.handleShareBoxClose(a)}
                      onChange={this.handleShareWord}
                      onShare={() => this.handleShare(a)}
                    />
                  </div>
                </Draggable>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    ) : (
      //夜间模式
      <React.Fragment>
        <div className="col">
          <CreatBox
            theme={theme}
            ref={this.imgRef} //为了隐藏难看的input而设的ref
            newArticle={newArticle} //获取待上传文章
            placeholder={this.state.newArticlePlaceholder} //提示语
            onUpload={this.handleImgUpload} //点击隐藏文件按钮
            onUrlChange={this.handleImgUrl} //获取文章图片
            onTitle={this.handleNewArticleTitle} //获取新标题
            onNewArticle={this.handleNewArticle} //发表新文章
          ></CreatBox>
          {articlesQuery.map((a) => (
            <div key={a._id} className="p-1 mb-3 bg-dark text-light rounded">
              <Sharer
                theme={theme}
                a={a}
                user={user}
                onDelete={() => this.handleDelete(a)}
              />
              <div className="card border-secondary bg-dark text-light">
                <div className="card-body">
                  <User
                    theme={theme}
                    a={a}
                    user={user || {}}
                    query={query}
                    dateRevise={dateRevise}
                    onDelete={() => this.handleDelete(a)}
                  />
                  <ArticleInfo
                    theme={theme}
                    a={a}
                    query={query}
                    onHighLight={this.handleHighLihghtString}
                  />
                  <SvgGroup
                    theme={theme}
                    device={device}
                    a={a}
                    user={user}
                    onLike={this.handleLike}
                    onTalk={this.handleTalk}
                    onShareBoxOpen={this.handleShareBoxOpen}
                  ></SvgGroup>
                  <Comment
                    theme={theme}
                    a={a}
                    user={user}
                    allUsersId={allUsersId}
                    dateRevise={dateRevise}
                    onCommentDelete={this.handleCommentDelete}
                  ></Comment>
                  <CommentArea
                    theme={theme}
                    a={a}
                    talkArea={talkArea}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onComment={this.handleComment}
                  ></CommentArea>
                </div>
                <Draggable
                  axis="both"
                  handle=".handle"
                  defaultPosition={{ x: 0, y: 0 }}
                  bounds={{
                    left: -820,
                    right: 625,
                    top: -470,
                  }}
                  position={null}
                  grid={[5, 5]}
                  scale={1}
                  onStart={this.handleStart}
                  onDrag={this.handleDrag}
                  onStop={this.handleStop}
                >
                  <div style={{ zIndex: "999" }}>
                    <ShareBox
                      theme={theme}
                      user={user}
                      a={a}
                      share={share}
                      onClose={() => this.handleShareBoxClose(a)}
                      onChange={this.handleShareWord}
                      onShare={() => this.handleShare(a)}
                    />
                  </div>
                </Draggable>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Container;
