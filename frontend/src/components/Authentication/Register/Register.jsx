import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../Header/Header";
import "./Register.css";
import {
  dispatchClearRegisterData,
  dispatchRegister,
} from "../../Store/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import NotificationBar from "../../NotificationBar/NotificationBar";
import InputField from "../../InputField/InputField";

function Register() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [isChecked, setIsChecked] = useState(false);
  const { errorMsg, successMsg, isSuccess } = useSelector(
    (state) => state.auth.registerData
  );

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const usernameTooltip = {
    text: "You must provide the username in the examples below.",
    examples: ["Vijay.Kumar", "Priyanka.Sharma"],
  };

  const passwordTooltip = {
    text: "You must provide the password in the below cases.",
    examples: [
      "At least one upper case [A-Z]",
      "At least one lower case [a-z]",
      "At least one special [!@#$%^&*_+?|/]",
      "At least one number [0-9]",
    ],
  };

  const validate = Yup.object({
    username: Yup.string()
      .required("Required*")
      .matches(/^[A-Z][a-z]+\.[A-Z][a-z]+$/, "Username is Invalid"),
    email: Yup.string().required("Required*").email("Email is Invalid"),
    password: Yup.string()
      .required("Required*")
      .min(6, "Password must be min 6 characters")
      .max(12, "password must be max 12 charactors")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_+?|/])[A-Za-z0-9!@#$%^&*_+?|/]+$/,
        "Password is Invalid"
      ),
    confirmPassword: Yup.string()
      .required("Required*")
      .oneOf([Yup.ref("password"), null], "password must be matched"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const newData = {
        username: values.username,
        email: values.email.toLowerCase(),
        password: values.password,
      };

      dispatch(dispatchRegister(newData));

      values.username = "";
      values.email = "";
      values.password = "";
      values.confirmPassword = "";

      setIsChecked(false);
      setShowPassword(false);
    },
  });

  useEffect(() => {
    document.title =
      window.location.pathname === "/sign-up" ? "Jobspot | Sign Up" : "Jobspot";

    dispatch(dispatchClearRegisterData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  }, [isSuccess, errorMsg]);

  return (
    <>
      <Header />
      <div className="register-container">
        {errorMsg && (
          <NotificationBar
            severity="error"
            message={errorMsg}
            open={open}
            handleClose={handleClose}
          />
        )}
        {successMsg && (
          <NotificationBar
            severity="success"
            message={successMsg}
            open={open}
            handleClose={handleClose}
          />
        )}
        <div className="register-container-card">
          <div className="register-card">
            <div className="register-content-card"></div>
            <div className="register-form-card">
              <div className="logo-title-card">
                <img
                  src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1709372709/logo_o3dvmq.png"
                  alt="logo"
                  className="logo"
                />
                <h1 className="register-title">Sign Up</h1>
              </div>
              <form
                className="register-form"
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
                  tooltipData={usernameTooltip}
                />
                <InputField
                  error={formik.errors.email}
                  touch={formik.touched.email}
                  change={formik.handleChange}
                  blur={formik.handleBlur}
                  value={formik.values.email}
                  id={"email"}
                  type={"email"}
                  label={"Email*"}
                />
                <InputField
                  error={formik.errors.password}
                  touch={formik.touched.password}
                  change={formik.handleChange}
                  blur={formik.handleBlur}
                  value={formik.values.password}
                  id={"password"}
                  type={showPassword ? "text" : "password"}
                  label={"Create Password*"}
                  tooltipData={passwordTooltip}
                />
                <InputField
                  error={formik.errors.confirmPassword}
                  touch={formik.touched.confirmPassword}
                  change={formik.handleChange}
                  blur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  id={"confirmPassword"}
                  type={showPassword ? "text" : "password"}
                  label={"Confirm Password*"}
                />
                <div className="show-password-card">
                  <input
                    type="checkbox"
                    checked={isChecked ? true : false}
                    onChange={() => {
                      setShowPassword(!showPassword);
                      setIsChecked(!isChecked);
                    }}
                    className="checkbox-input"
                    id="show-password"
                  />
                  <label className="label" htmlFor="show-password">
                    Show Password
                  </label>
                </div>
                <button
                  style={{ backgroundColor: isLoading ? "#848484" : "#caa933" }}
                  type="submit"
                  className="register-button"
                >
                  Sign Up
                  {isLoading && <div className="loader"></div>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
