import React from "react";
import { Navigate } from "react-router-dom";

function isAuthenticated() {
  const token = localStorage.getItem("access_token");
  return !!token;
}

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
