import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute2() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  return <div>{token ? <Outlet /> : <Navigate to={"/sign-in"} />}</div>;
}

export default ProtectedRoute2;
