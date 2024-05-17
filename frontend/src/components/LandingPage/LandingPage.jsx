import React from "react";
import Header from "../Header/Header";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="landing-page-container">
        <div className="landing-page-content-card">
          <h1 className="landing-page-title">
            Find a job that matches your passion.
          </h1>
          <p className="landing-page-para">
            Every job is a stepping stone to your dream career. Embrace the
            journey.
          </p>
          <button
            className="landing-page-btn"
            onClick={() => navigate("/sign-up")}
          >
            Learn more
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
