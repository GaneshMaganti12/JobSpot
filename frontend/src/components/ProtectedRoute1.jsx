import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute1() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  return <>{token ? <Navigate to={"/home"} /> : <Outlet />}</>;
}

export default ProtectedRoute1;
