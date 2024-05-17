import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="not-found-card">
        <img
          className="not-found-image"
          src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1715002061/404_Error-rafiki_laouw6.png"
          alt="not found"
        />
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-para">
          We are sorry, the page you requested could not be found
        </p>
        <button className="not-found-button" onClick={() => navigate("/home")}>
          Go Home
        </button>
      </div>
    </>
  );
}

export default NotFound;
