import React, { useEffect } from "react";
import Header from "../Header/Header";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { dispatchLogout } from "../Store/Action/AuthAction";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const currentToken = Date.now() / 1000;

  const decodeToken = jwtDecode(token);

  useEffect(() => {
    document.title =
      window.location.pathname === "/home" ? "Jobspot | Home" : "Jobspot";
  }, []);

  useEffect(() => {
    const expireToken = decodeToken.exp;

    if (currentToken > expireToken) {
      navigate("/sign-in");
      dispatch(dispatchLogout());
    }
  }, [currentToken]);

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-card">
          <h1 className="home-title">Find the Job that Fits your Life</h1>
          <p className="home-description">
            Navigate your carrer journey with confidence, for every opportunity
            holds the potential to shape your future.
          </p>
          <button className="home-button" onClick={() => navigate("/jobs")}>
            Find Jobs
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
