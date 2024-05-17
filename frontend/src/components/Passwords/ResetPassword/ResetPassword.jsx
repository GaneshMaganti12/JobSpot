import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Snackbar } from "@mui/material";
import "./ResetPassword.css";
import {
  dispatchClearResetPasswordData,
  dispatchReset,
} from "../../Store/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import NotificationBar from "../../NotificationBar/NotificationBar";
import InputField from "../../InputField/InputField";

function ResetPassword() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { errorMsg, successMsg, isSuccess } = useSelector(
    (state) => state.auth.resetPasswordData
  );

  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };

  const validate = Yup.object({
    email: Yup.string().required("Required*").email("Email is Invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const newData = {
        email: values.email.toLowerCase(),
      };

      dispatch(dispatchReset(newData));

      values.email = "";
    },
  });

  useEffect(() => {
    document.title =
      window.location.pathname === "/reset-password"
        ? "Jobspot | Reset Password"
        : "Jobspot";
    dispatch(dispatchClearResetPasswordData());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    } else {
      setOpenErr(true);
    }
  }, [isSuccess, errorMsg]);

  return (
    <>
      <Header />
      <div className="reset-container">
        {errorMsg && (
          <NotificationBar
            severity="error"
            message={errorMsg}
            open={openErr}
            handleClose={handleClose}
          />
        )}
        <div className="reset-container-card">
          <div className="reset-card">
            <div className="reset-form-card">
              <div className="logo-title-card">
                <img
                  alt="logo"
                  className="logo"
                  src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1709372709/logo_o3dvmq.png"
                />
                <h1 className="reset-title">Reset Password</h1>
              </div>
              <form
                className="reset-form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
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
                <button
                  style={{ backgroundColor: isLoading ? "#848484" : "#caa933" }}
                  type="submit"
                  className="reset-button"
                >
                  Reset Password
                  {isLoading && <div className="loader"></div>}
                </button>
              </form>
            </div>
            <div className="reset-content-card"></div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        color="red"
        autoHideDuration={1000}
        onClose={handleClose}
        message={successMsg}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </>
  );
}

export default ResetPassword;
