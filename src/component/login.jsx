import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Joi from "joi";
import auth from "./../services/authServices";

class Login extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schemaObj = {
    email: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("email")
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(6).max(15).required().label("password"),
  };
  schema = Joi.object(this.schemaObj);

  translate = (errors) => {
    //手动汉化...
    //邮箱
    errors.email === `"email" is not allowed to be empty` &&
      (errors.email = "Email should not be empty");
    errors.email === `"email" length must be at least 5 characters long` &&
      (errors.email = "Email must be at least 5 characters long");
    errors.email === `"email" must be a valid email` &&
      (errors.email = "Invalid email format");
    errors.email ===
      `"email" length must be less than or equal to 30 characters long` &&
      (errors.email = "Email must be less than or equal to 30 characters long");
    //密码
    errors.password === `"password" is not allowed to be empty` &&
      (errors.password = "Password should not be empty");
    errors.password === `"password" length must be at least 6 characters long` &&
      (errors.password = "Password must be at least 6 characters long");
    errors.password ===
      `"密码" length must be less than or equal to 15 characters long` &&
      (errors.password = "Password must be less than or equal to 15 characters long");
    return errors;
  };

  handleChange = (e) => {
    let { data, errors } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    errors[e.currentTarget.id] = this.validateProperty(
      e.currentTarget.id,
      e.currentTarget.value
    );
    this.translate(errors);
    this.setState({ data, errors });
  };

  handleSubmit = async () => {
    const { data } = this.state;
    try {
      await auth.login(data.email, data.password);
      window.location = "/";
      //登陆必须要重载读取本地用户
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.warning = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  validata = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schemaObj[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  render() {
    if (auth.getCurrentUserOffLine()) return <Navigate to="/" replace />;

    const { errors } = this.state;
    const { theme, device } = this.props;
    return theme === "daytime" ? (
      <React.Fragment>
        <div
          className={
            device === "mobile"
              ? "container bg-white  mb-5 p-0 rounded"
              : "container bg-white w-50 mb-5 p-0 rounded"
          }
        >
          <h5 className="text-center pt-3">Login</h5>

          <form onSubmit={this.handleSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkBox"
              />
              <label className="form-check-label" htmlFor="checkBox">
                I'm just a pretty.
              </label>
              {errors.warning && (
                <div className="alert alert-danger w-50 m-auto text-center  ">
                  {errors.warning}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-white">SURPRISE</div>
              <Link to="/register" className="">
                Register
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmit}
                disabled={this.validata()}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    ) : (
      //夜间模式
      <React.Fragment>
        <div
          className={
            device === "mobile"
              ? "container bg-dark text-light mb-5 p-0 rounded"
              : "container bg-dark text-light w-50 mb-5 p-0 rounded"
          }
        >
          <h5 className="text-center pt-3">Login</h5>

          <form onSubmit={this.handleSubmit} className="p-3">
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkBox"
              />
              <label className="form-check-label" htmlFor="checkBox">
                I'm just a pretty.
              </label>
              {errors.warning && (
                <div className="alert alert-danger w-50 m-auto text-center  ">
                  {errors.warning}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-white">SURPRISE!</div>
              <Link to="/register" className="text-light">
                Register
              </Link>
              <button
                type="button"
                className="btn btn-secondary "
                onClick={this.handleSubmit}
                disabled={this.validata()}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
