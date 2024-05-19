import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { Avatar, Stack } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogout } from "../Store/Action/AuthAction";
import { FaHome } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiMenuLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let decodeToken = token ? jwtDecode(token) : "";

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(".")[0][0]}${name.split(".")[1][0]}`,
    };
  }

  const handleLogout = () => {
    dispatch(dispatchLogout());
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShow(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <nav className="header-container">
        <img
          onClick={() => navigate("/")}
          className="logo-icon"
          src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1709374952/New_Project_8_najqjs.png"
          alt="job spot logo"
        />
        {token ? (
          <>
            <div className="header-links-container">
              <Link to="/home" className="header-link">
                <span className="header-link-text">Home</span>
              </Link>
              <Link to="/Jobs" className="header-link">
                <span className="header-link-text">Jobs</span>
              </Link>
              <Link to="/activity" className="header-link">
                <span className="header-link-text">Activity</span>
              </Link>
              <div className="dropdown" ref={dropdownRef}>
                <Stack
                  onClick={() => setIsShow(!isShow)}
                  direction="row"
                  spacing={2}
                >
                  {decodeToken && (
                    <Avatar {...stringAvatar(decodeToken.name)} />
                  )}
                </Stack>
                <ul className={`dropdown-menu ${isShow && "show"}`}>
                  <Link to="/change-password" className="header-link">
                    <li className="dropdown-button">
                      <span className="dropdown-link-button">
                        Change Password
                      </span>
                    </li>
                  </Link>
                  <Link
                    to="/sign-in"
                    className="header-link"
                    onClick={handleLogout}
                  >
                    <li className="dropdown-button">
                      <span className="dropdown-link-button">Logout</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="navbar-buttons-container">
              <FaHome
                className="navbar-icon"
                onClick={() => {
                  navigate("/home");
                }}
              />
              <MdWork
                className="navbar-icon"
                onClick={() => {
                  navigate("/jobs");
                }}
              />
              {isOpen ? (
                <RxCross2
                  className="navbar-icon"
                  onClick={() => setIsOpen(false)}
                />
              ) : (
                <RiMenuLine
                  className="navbar-icon"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
          </>
        ) : (
          <div className="header-button-group">
            <button
              onClick={() => navigate("/sign-in")}
              className="header-button"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className="header-button"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>
      {isOpen && (
        <ul className="navbar-menu-container" ref={dropdownRef}>
          <li
            onClick={() => navigate("/activity")}
            className="navbar-menu-items"
          >
            Activity
          </li>
          <li
            onClick={() => navigate("/change-password")}
            className="navbar-menu-items"
          >
            Change Password
          </li>
          <li onClick={handleLogout} className="navbar-menu-items">
            Logout
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
