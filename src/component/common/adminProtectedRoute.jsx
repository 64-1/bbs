import React from "react";
import auth from "../../services/authServices";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation(); // Get the current location
  const user = auth.getCurrentUserOffLine(); // Check if the user is authenticated and an admin

  if (!user || !user.isAdmin) {
    // If the user is not authenticated or not an admin, redirect to the home page
    // You might choose a different redirect based on your application's needs
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children; // If the user is authenticated and an admin, render the children components
};

export default AdminProtectedRoute;
