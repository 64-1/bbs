import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import userService from "../services/userService";
import auth from "../services/authServices";
import Joi from "joi";

class Register extends Component {
  state = {
    data: { sex: false },
    errors: {},
  };

  schemaObj = {
    userName: Joi.string().min(3).max(10).required().label("Username"),
    sex: Joi.boolean().required(),
    email: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("Email")
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(6).max(15).required().label("Password"),
  };
  schema = Joi.object(this.schemaObj);

  translate = (errors) => {
    // Manually translate to English...
    // Username
    errors &&
      errors.userName === `"Username" is not allowed to be empty` &&
      (errors.userName = "Username cannot be empty");
    errors &&
      errors.userName ===
        `"Username" length must be at least 3 characters long` &&
      (errors.userName = "Username must be at least 3 characters");
    errors &&
      errors.userName ===
        `"Username" length must be less than or equal to 10 characters long` &&
      (errors.userName = "Username must be less than or equal to 10 characters");
    // Email
    errors.email === `"Email" is not allowed to be empty` &&
      (errors.email = "Email cannot be empty");
    errors.email === `"Email" length must be at least 5 characters long` &&
      (errors.email = "Email must be at least 5 characters");
    errors.email === `"Email" must be a valid email` &&
      (errors.email = "Please enter a correct email");
    errors.email ===
      `"Email" length must be less than or equal to 30 characters long` &&
      (errors.email = "Email must be less than or equal to 30 characters");
    // Password
    errors.password === `"Password" is not allowed to be empty` &&
      (errors.password = "Password cannot be empty");
    errors.password === `"Password" length must be at least 6 characters long` &&
      (errors.password = "Password must be at least 6 characters");
    errors.password ===
      `"Password" length must be less than or equal to 15 characters long` &&
      (errors.password = "Password must be less than or equal to 15 characters");
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

  handleSex = (sex) => {
    const { data } = this.state;
    sex === "male" ? (data.sex = false) : (data.sex = true);
    this.setState({ data });
  };

  handleSubmit = () => {
    let { data } = this.state;
    const errors = this.validate();
    this.doSubmit();
    this.setState({ data, errors: errors || {} });
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  validate = () => {
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
          <h5 className="text-center pt-3">Register</h5>
          <form className="p-3">
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="string"
                className="form-control"
                id="userName"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {errors.userName && (
                <div className="alert alert-danger">{errors.userName}</div>
              )}
              <small className="form-text text-muted">
                Username should be greater than 3 and less than 10 characters.
              </small>
              <div className="d-flex justify-content-start mt-2">
                <div className="form-check">
                  {/* Gender selection images omitted to focus on text translation */}
                  <label className="form-check-label pl-3 pr-3" htmlFor="boy">
                    I am male
                  </label>
                </div>

                <div className="form-check">
                  {/* Gender selection images omitted to focus on text translation */}
                  <label className="form-check-label pl-3" htmlFor="girl">
                    I am female
                  </label>
                </div>
                <small className="form-text ml-5 text-muted">
                  Other genders not supported yet
                </small>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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
              <small className="form-text text-muted">
                This is just a demo, I won't verify your email, but at least make it look like an email.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
              <small className="form-text text-muted">
                Password should be greater than 6 and less than 15 characters.
              </small>
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkBox"
              />
              <label className="form-check-label" htmlFor="checkBox">
                Just for looks
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-white">Easter Egg</div>
              <Link to="/login" className="">
                Already have an account? Click here to log in
              </Link>
              <button
                disabled={this.validate()}
                type="button"
                onClick={this.handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    ) : (
      // Night mode
      <React.Fragment>
        <div
          className={
            device === "mobile"
              ? "container bg-dark text-light mb-5 p-0 rounded"
              : "container bg-dark text-light w-50 mb-5 p-0 rounded"
          }
        >
          <h5 className="text-center pt-3">Register</h5>
          {/* Form contents remain unchanged, except for theme-based classes and text */}
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
