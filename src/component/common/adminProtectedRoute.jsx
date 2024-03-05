import React from "react";
import auth from "../../services/authServices";
import { Route, Navigate } from "react-router-dom";

const AdminProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          !auth.getCurrentUserOffLine() ||
          (auth.getCurrentUserOffLine() &&
            !auth.getCurrentUserOffLine().isAdmin)
        )
          return <Navigate to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminProtectedRoute;
