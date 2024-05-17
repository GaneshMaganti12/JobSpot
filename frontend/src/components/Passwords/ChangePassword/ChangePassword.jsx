import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ChangePassword.css";
import {
  dispatchChange,
  dispatchClearChangePasswordData,
  dispatchLogout,
} from "../../Store/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../../NotificationBar/NotificationBar";
import ValidationList from "../ChangePassword/ValidationList/ValidationList";
import InputField from "../../InputField/InputField";

function ChangePassword() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [validations, setValidations] = useState({
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const navigate = useNavigate();
  const currentToken = Date.now() / 1000;

  const isLoading = useSelector((state) => state.auth.isLoading);
  const { successMsg, errorMsg, isSuccess } = useSelector(
    (state) => state.auth.changePasswordData
  );

  const [open, setOpen] = useState(false);
  const decodeToken = jwtDecode(token);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validate = Yup.object({
    oldPassword: Yup.string().required("Required*"),
    newPassword: Yup.string()
      .required("Required*")
      .min(6, "Password must be min 6 characters")
      .max(12, "password must be max 12 charactors")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_+?|/])[A-Za-z0-9!@#$%^&*_+?|/]+$/,
        "Password is Invalid"
      ),
    confirmPassword: Yup.string()
      .required("Required*")
      .oneOf([Yup.ref("newPassword"), null], "Password must be matched"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: validate,
    onSubmit: async (values) => {
      const newData = {
        password: values.oldPassword,
        newPassword: values.newPassword,
      };

      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      dispatch(dispatchChange(newData, options));

      values.oldPassword = "";
      values.newPassword = "";
      values.confirmPassword = "";

      setShowPassword(!showPassword);
      setIsChecked(!isChecked);
    },
  });

  useEffect(() => {
    document.title =
      window.location.pathname === "/change-password"
        ? "Jobspot | Change Password"
        : "Jobspot";
    dispatch(dispatchClearChangePasswordData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  }, [isSuccess, errorMsg]);

  const validationRegex = (value) => {
    let error = {};

    const upperRegex = /(?=.*[A-Z])[A-Z]+/;
    const lowerRegex = /(?=.*[a-z])[a-z]+/;
    const numberRegex = /(?=.*[0-9])[0-9]+/;
    const specialRegex = /(?=.*[!@#$%^&*_+?|/])[!@#$%^&*_+?|/]+/;

    if (upperRegex.test(value)) {
      error.upper = true;
    }
    if (lowerRegex.test(value)) {
      error.lower = true;
    }
    if (numberRegex.test(value)) {
      error.number = true;
    }
    if (specialRegex.test(value)) {
      error.special = true;
    }

    return error;
  };

  useEffect(() => {
    setValidations(validationRegex(formik.values.newPassword));
  }, [formik.values.newPassword]);

  useEffect(() => {
    const expireToken = decodeToken.exp;

    if (currentToken > expireToken) {
      navigate("/sign-in");
      dispatch(dispatchLogout());
    }
  }, [decodeToken.exp, navigate]);

  return (
    <>
      <Header />
      <div className="change-container">
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
        <div className="change-card">
          <div className="change-form-card">
            <div className="logo-title-card">
              <img
                src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1709372709/logo_o3dvmq.png"
                alt="logo"
                className="logo"
              />
              <h1 className="change-title">Change Password</h1>
            </div>
            <form
              className="change-form"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <InputField
                error={formik.errors.oldPassword}
                touch={formik.touched.oldPassword}
                change={formik.handleChange}
                blur={formik.handleBlur}
                value={formik.values.oldPassword}
                id="oldPassword"
                type="password"
                label={"Old Password*"}
              />
              <InputField
                error={formik.errors.newPassword}
                touch={formik.touched.newPassword}
                change={formik.handleChange}
                blur={formik.handleBlur}
                value={formik.values.newPassword}
                id="newPassword"
                type={showPassword ? "text" : "password"}
                label={"New Password*"}
              />
              <InputField
                error={formik.errors.confirmPassword}
                touch={formik.touched.confirmPassword}
                change={formik.handleChange}
                blur={formik.handleBlur}
                value={formik.values.confirmPassword}
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                label={"Confirm Password*"}
              />
              <div className="show-password-card">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setShowPassword(!showPassword);
                    setIsChecked(!isChecked);
                  }}
                  className="checkbox-input"
                  id="show"
                />
                <label className="label" htmlFor="show">
                  Show Password
                </label>
              </div>
              <ValidationList validation={validations} />
              <button
                style={{ backgroundColor: isLoading ? "#848484" : "#caa933" }}
                type="submit"
                className="change-button"
              >
                Change Password
                {isLoading && <div className="loader"></div>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
