import React, { Component } from "react";
import authServices from "../services/authServices";
import userService from "../services/userService";

class UserList extends Component {
  state = {
    userList: [],
    test: [],
    user: {},
    userToDelete: {},
  };

  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  }
  //转换日期格式

  async componentDidMount() {
    const user = this.props.user || (await authServices.getCurrentUser);
    const { data } = await userService.getAllUsers();
    for (let user of data) {
      const date = this.dateFormat(
        "YYYY-mm-dd HH:MM:SS",
        new Date(user.registrationrDate)
      );
      user.registrationrDate = date;
      //坑爹的mongdb,utc时间转中国标准时间
    }
    this.setState({ user, userList: data });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  //子组件设置被挂起后注销异步操作。

  handleUserToDelete = (user) => {
    this.setState({ userToDelete: user });
  };

  handleUserDelete = async (userId) => {
    const { data } = await userService.Delete(userId);
    this.setState({ userList: data, userToDelete: {} });
  };

  render() {
    const { user, userList } = this.state;
    const nobody = "5ffc2e9880aa87ceaca0364a";
    // const userListExceptAdmin = userList.filter((u) => u._id !== user._id);
    const userListExceptAdminAndNobody = userList.filter(
      (u) => u._id !== nobody && u._id !== user._id
    );
    return this.props.theme === "daytime" ? (
      <div className="card container w-100 mb-5">
        <div className="row border-bottom">
          <img
            src={user.portrait}
            alt=""
            className="m-3 rounded-circle d-inline"
            style={{
              width: "4em",
              height: "4em",
              objectFit: "cover",
            }}
          />
          <div className="card-body col-5 p-0 pt-3">
            <div className="row">
              <h5 className="card-title pl-3">{user.userName}</h5>
              <small className="text-muted pl-2 pt-1 text-danger">
                {user.isAdmin ? "(Admin)" : "(User)"}
              </small>
            </div>
            <p className="card-text">{user.email}</p>
          </div>
          <div className="row align-items-center">
            <p className="text-muted">
              Register date:
              {user.registrationrDate &&
                user.registrationrDate.slice(0, 10) +
                  " | " +
                  user.registrationrDate.slice(11, 19)}
            </p>
          </div>
        </div>
        {userListExceptAdminAndNobody.map((u) => (
          <div key={u._id} className="row border-top">
            <img
              src={u.portrait}
              alt=""
              className="m-3 rounded-circle d-inline"
              style={{
                width: "4em",
                height: "4em",
                objectFit: "cover",
              }}
            />
            <div className="card-body col-5 p-0 pt-3">
              <div className="row">
                <h5 className="card-title pl-3">{u.userName}</h5>
                <small className="text-muted pl-2 pt-1">
                  {u.isAdmin ? "(Admin)" : "(User)"}
                </small>
              </div>
              <p className="card-text">{u.email}</p>
            </div>
            <div className="row align-items-center">
              <p className="text-muted m-0">
                Register date:
                {u.registrationrDate &&
                  u.registrationrDate.slice(0, 10) +
                    " | " +
                    u.registrationrDate.slice(11, 19)}
              </p>
              <button
                data-toggle="modal"
                data-target="#userDeleteWarning"
                className="btn btn-danger ml-4 "
                onClick={() => this.handleUserToDelete(u)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div
          className="modal fade"
          id="userDeleteWarning"
          tabIndex="1"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">【Important Notice】</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body row">
                <i
                  className="fa fa-warning fa-fw ml-2"
                  style={{ fontSize: "2em" }}
                ></i>
                <p className="m-0 ml-2 w-75" style={{ fontSize: "1em" }}>
                  Deleted user cannot be recovered, confirm deleting user【
                  {this.state.userToDelete.userName}】
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() =>
                    this.handleUserDelete(this.state.userToDelete._id)
                  }
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      //夜间模式
      <div className="card container w-100 mb-5 bg-dark text-light">
        <div className="row border-bottom">
          <img
            src={user.portrait}
            alt=""
            className="m-3 rounded-circle d-inline"
            style={{
              width: "4em",
              height: "4em",
              objectFit: "cover",
            }}
          />
          <div className="card-body col-5 p-0 pt-3">
            <div className="row">
              <h5 className="card-title pl-3">{user.userName}</h5>
              <small className="text-muted pl-2 pt-1 text-danger">
                {user.isAdmin ? "(Admin)" : "(User)"}
              </small>
            </div>
            <p className="card-text">{user.email}</p>
          </div>
          <div className="row align-items-center">
            <p className="text-muted">
              Register date:
              {user.registrationrDate &&
                user.registrationrDate.slice(0, 10) +
                  " | " +
                  user.registrationrDate.slice(11, 19)}
            </p>
          </div>
        </div>
        {userListExceptAdminAndNobody.map((u) => (
          <div key={u._id} className="row border-top">
            <img
              src={u.portrait}
              alt=""
              className="m-3 rounded-circle d-inline"
              style={{
                width: "4em",
                height: "4em",
                objectFit: "cover",
              }}
            />
            <div className="card-body col-5 p-0 pt-3">
              <div className="row">
                <h5 className="card-title pl-3">{u.userName}</h5>
                <small className="text-muted pl-2 pt-1">
                  {u.isAdmin ? "(Admin)" : "(User)"}
                </small>
              </div>
              <p className="card-text">{u.email}</p>
            </div>
            <div className="row align-items-center">
              <p className="text-muted m-0">
                Register date:
                {u.registrationrDate &&
                  u.registrationrDate.slice(0, 10) +
                    " | " +
                    u.registrationrDate.slice(11, 19)}
              </p>
              <button
                data-toggle="modal"
                data-target="#userDeleteWarning"
                className="btn btn-danger ml-4 "
                onClick={() => this.handleUserToDelete(u)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div
          className="modal fade"
          id="userDeleteWarning"
          tabIndex="1"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title">【Important Notice】</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body row">
                <i
                  className="fa fa-warning fa-fw ml-2"
                  style={{ fontSize: "2em" }}
                ></i>
                <p className="m-0 ml-2 w-75" style={{ fontSize: "1em" }}>
                  Deleted user cannot be recovered, confirm deleting user【
                  {this.state.userToDelete.userName}】
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() =>
                    this.handleUserDelete(this.state.userToDelete._id)
                  }
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
