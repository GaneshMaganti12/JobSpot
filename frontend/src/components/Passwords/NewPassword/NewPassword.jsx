import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./NewPassword.css";
import {
  dispatchClearNewPasswordData,
  dispatchNew,
} from "../../Store/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotificationBar from "../../NotificationBar/NotificationBar";
import InputField from "../../InputField/InputField";

function NewPassword() {
  const dispatch = useDispatch();
  const params = useParams();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { errorMsg, successMsg, isSuccess } = useSelector(
    (state) => state.auth.newPasswordData
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { userId, token } = params;

  const [open, setOpen] = useState(false);

  const passwordTooltip = {
    text: "You must provide the password in the below cases.",
    examples: [
      "At least one upper case [A-Z]",
      "At least one lower case [a-z]",
      "At least one special [!@#$%^&*_+?|/]",
      "At least one number [0-9]",
    ],
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validate = Yup.object({
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
      password: "",
      confirmPassword: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const newData = {
        password: values.password,
      };

      dispatch(dispatchNew(userId, token, newData));

      values.password = "";
      values.confirmPassword = "";

      setIsChecked(false);
      setShowPassword(false);
    },
  });

  useEffect(() => {
    document.title =
      window.location.pathname === `/reset/${userId}/${token}`
        ? "Jobspot | New Password"
        : "Jobspot";
    dispatch(dispatchClearNewPasswordData());
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
      <div className="new-container">
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
        <div className="new-container-card">
          <div className="new-card">
            <div className="new-content-card"></div>
            <div className="new-form-card">
              <div className="logo-title-card">
                <img
                  src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1709372709/logo_o3dvmq.png"
                  alt="logo"
                  className="logo"
                />
                <h1 className="new-title">New Password</h1>
              </div>
              <form
                className="new-form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <InputField
                  error={formik.errors.password}
                  touch={formik.touched.password}
                  change={formik.handleChange}
                  blur={formik.handleBlur}
                  value={formik.values.password}
                  id={"password"}
                  type={showPassword ? "text" : "password"}
                  label={"New Password*"}
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
                  label={"Confirm New Password*"}
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
                    id="showPassword"
                  />
                  <label className="label" htmlFor="showPassword">
                    Show Password
                  </label>
                </div>
                <button
                  style={{ backgroundColor: isLoading ? "#848484" : "#caa933" }}
                  type="submit"
                  className="new-button"
                >
                  New Password
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

export default NewPassword;
