import React from "react";
import auth from "../../services/authServices";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation(); // Get the current location
  const user = auth.getCurrentUserOffLine(); // Check if the user is authenticated

  if (!user) {
    // Redirect unauthenticated users to the login page, but pass the current location in state
    // so you can redirect them back after logging in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // If the user is authenticated, render the children components
};

export default ProtectedRoute;
