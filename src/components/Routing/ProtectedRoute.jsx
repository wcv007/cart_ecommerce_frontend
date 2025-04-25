import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../services/userServices";

const ProtectedRoute = () => {
  const user = getUser();
  console.log(user);
  const location = useLocation();
  console.log(location);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ redirect: location.pathname }} />
  );
};

export default ProtectedRoute;
