import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import AuthReducer from "./Reducer/AuthReducer";
import JobsReducer from "./Reducer/JobsReducer";

export const Store = configureStore(
  {
    reducer: {
      auth: AuthReducer,
      jobs: JobsReducer,
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
);
