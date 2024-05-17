import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { dispatchGetActivity } from "../Store/Action/JobsAction";
import "./Activity.css";
import ActivityItem from "./ActivityItem/ActivityItem";
import { dispatchLogout } from "../Store/Action/AuthAction";
import { useNavigate } from "react-router-dom";
import SomethingWentWrong from "../Jobs/SomethingWentWrong/SomethingWentWrong";
import { ThreeDots } from "react-loader-spinner";

function Activity() {
  const dispatch = useDispatch();

  const { isActivityLoading, activity, isSuccess } = useSelector(
    (state) => state.jobs
  );
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const navigate = useNavigate();
  const currentToken = Date.now() / 1000;

  const [activityArray, setActivityArray] = useState([]);

  const decodeToken = jwtDecode(token);

  useEffect(() => {
    setActivityArray(activity);
  }, [activity]);

  useEffect(() => {
    const expireToken = decodeToken.exp;

    if (currentToken > expireToken) {
      navigate("/sign-in");
      dispatch(dispatchLogout());
    }
  }, [decodeToken.exp, navigate]);

  useEffect(() => {
    document.title =
      window.location.pathname === "/activity"
        ? "Jobspot | Activity"
        : "Jobspot";
    getActivity();
  }, []);

  const getActivity = () => {
    dispatch(dispatchGetActivity(token));
  };

  const onClickHandle = () => {
    getActivity();
  };

  return (
    <>
      <Header />
      <div className="activity-items-container">
        {isActivityLoading && (
          <div className="activity-loader-container">
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#303030"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {!isActivityLoading && isSuccess && (
          <div className="activity-items-card">
            {activityArray.length !== 0 ? (
              <ul className="list-items-container">
                {activityArray.length !== 0 &&
                  activityArray.map((ele, index) => (
                    <li key={`$${ele.id}-${index}`} className="date-container">
                      <div className="date-line-container">
                        <hr className="line-break" />
                        <h1 className="date-title" key={ele.id}>
                          {ele.createdAt}
                        </h1>
                        <hr className="line-break" />
                      </div>
                      <ul className="activity-item-list-container">
                        {Array.isArray(ele.activity) &&
                          ele.activity.length &&
                          ele.activity.map((item) => (
                            <ActivityItem key={item.id} activityItem={item} />
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="activty-empty-container">
                <h1 className="activity-empty-title">
                  There is no activity here
                </h1>
              </div>
            )}
          </div>
        )}
        {!isActivityLoading && !isSuccess && (
          <SomethingWentWrong onClickHandle={onClickHandle} />
        )}
      </div>
    </>
  );
}

export default Activity;
