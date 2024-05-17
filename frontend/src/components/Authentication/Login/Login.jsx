import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../Header/Header";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchClearLoginData,
  dispatchLogin,
} from "../../Store/Action/AuthAction";
import NotificationBar from "../../NotificationBar/NotificationBar";
import InputField from "../../InputField/InputField";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { isSuccess, errorMsg } = useSelector((state) => state.auth.loginData);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validate = Yup.object({
    username: Yup.string()
      .required("Required*")
      .matches(/^[A-Z][a-z]+\.[A-Z][a-z]+$/, "Username is invalid"),
    password: Yup.string()
      .required("Required*")
      .min(6, "Password must be min 6 characters")
      .max(12, "password must be max 12 charactors"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const newData = {
        username: values.username,
        password: values.password,
      };

      dispatch(dispatchLogin(newData));

      values.username = "";
      values.password = "";
    },
  });

  useEffect(() => {
    document.title =
      window.location.pathname === "/sign-in" ? "Jobspot | Sign In" : "Jobspot";

    dispatch(dispatchClearLoginData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSuccess, errorMsg]);

  return (
    <>
      <Header />
      <div className="login-container">
        {errorMsg && (
          <NotificationBar
            severity="error"
            message={errorMsg}
            open={open}
            handleClose={handleClose}
          />
        )}
        <div className="login-container-card">
          <div className="login-card">
            <div className="login-form-card">
              <div className="logo-title-card">
                <img
                  alt="logo"
                  className="logo"
                  src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1709372709/logo_o3dvmq.png"
                />
                <h1 className="login-title">Sign In</h1>
              </div>
              <form
                className="login-form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <InputField
                  error={formik.errors.username}
                  touch={formik.touched.username}
                  change={formik.handleChange}
                  blur={formik.handleBlur}
                  value={formik.values.username}
                  id={"username"}
                  type={"text"}
                  label={"Username*"}
                />
                <InputField
                  error={formik.errors.password}
                  touch={formik.touched.password}
                  change={formik.handleChange}
                  blur={formik.handleBlur}
                  value={formik.values.password}
                  id={"password"}
                  type={"password"}
                  label={"Password*"}
                />
                <p
                  onClick={() => navigate("/reset-password")}
                  className="forget-password"
                >
                  Forget your password?
                </p>
                <button
                  style={{ backgroundColor: isLoading ? "#848484" : "#caa933" }}
                  type="submit"
                  className="login-button"
                >
                  Sign In
                  {isLoading && <div className="loader"></div>}
                </button>
                <span className="login-signup">
                  Don't have an account?
                  <span
                    onClick={() => navigate("/sign-up")}
                    className="login-signup-button"
                  >
                    Sign Up
                  </span>
                </span>
              </form>
            </div>
            <div className="login-content-card"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
