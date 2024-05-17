import React from "react";
import "./NotificationBar.css";
import { Alert, Snackbar } from "@mui/material";

function NotificationBar(props) {
  const { message, open, handleClose, severity } = props;

  return (
    <div className="notification-bar">
      <Snackbar
        className="notify-bar"
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          className="notify-alert"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NotificationBar;
