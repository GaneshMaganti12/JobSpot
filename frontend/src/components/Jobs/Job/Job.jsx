import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./Job.css";
import { useNavigate, useParams } from "react-router-dom";
import Skills from "../Skills/Skills";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchGetActivity,
  dispatchJob,
  dispatchPostActivity,
} from "../../Store/Action/JobsAction";
import { jwtDecode } from "jwt-decode";
import SimilarJobs from "../SimilarJobs/SimilarJobs";
import { dispatchLogout } from "../../Store/Action/AuthAction";
import { LiaStarSolid } from "react-icons/lia";
import SomethingWentWrong from "../SomethingWentWrong/SomethingWentWrong";
import { compareJobWithActivityList } from "../../Utils/Utils";

function Job() {
  const dispatch = useDispatch();
  const params = useParams();

  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const { isLoading, jobDetailsObject, isSuccess, activity } = useSelector(
    (state) => state.jobs
  );

  const navigate = useNavigate();
  const currentToken = Date.now() / 1000;

  const [applied, setApplied] = useState(false);
  const [activityArray, setActivityArray] = useState([]);

  useEffect(() => {
    document.title =
      window.location.pathname === `/job/${params.id}`
        ? "Jobspot | Job"
        : "Jobspot";

    getActivityList();
    getJobDetails();
  }, [params.id]);

  useEffect(() => {
    setApplied(compareJobWithActivityList(activityArray, jobDetailsObject));
  }, [activityArray, jobDetailsObject, activity]);

  useEffect(() => {
    setActivityArray(activity);
  }, [jobDetailsObject]);

  const getActivityList = () => {
    dispatch(dispatchGetActivity(token));
  };

  const getJobDetails = async () => {
    dispatch(dispatchJob(params.id, token));
  };

  const handleJobApply = () => {
    const data = {
      user_id: decodeToken.id,
      job_id: jobDetailsObject.id,
      role: jobDetailsObject.title,
      company: jobDetailsObject.company,
      company_logo_url: jobDetailsObject.companyLogoUrl,
      date: new Date().toDateString(),
      applied_at: new Date().toTimeString(),
    };

    if (!applied) {
      dispatch(dispatchPostActivity(data, token));
      setApplied(true);
    }
  };

  const onClickHandle = () => {
    getJobDetails();
  };

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
      <div className="job-detail-containers">
        {isLoading && (
          <div className="job-detail-loader">
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#343434"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {isSuccess &&
          !isLoading &&
          Object.keys(jobDetailsObject).length !== 0 && (
            <div className="job-detail-container-card">
              <div className="job-detail-cards">
                <div className="job-title-salary">
                  <div className="job-logo-title">
                    <img
                      src={jobDetailsObject.companyLogoUrl}
                      className="job-company-logo"
                      alt={jobDetailsObject.title}
                    />
                    <div className="job-title-rating">
                      <h1 className="job-title">{jobDetailsObject.title}</h1>
                      <div className="job-rating-star">
                        <LiaStarSolid className="rating-icon" />
                        <p className="job-rating">{jobDetailsObject.rating}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleJobApply}
                    className={
                      applied ? "job-applied-button" : "job-apply-button"
                    }
                  >
                    {applied ? "Applied" : "Apply"}
                  </button>
                </div>
                <div className="job-location-package">
                  <div className="job-location-employment">
                    <div className="job-location-icon">
                      <LocationOnIcon
                        style={{
                          color: "#343434",
                          fontSize: 14,
                          marginBottom: 16,
                          marginRight: 5,
                        }}
                      />
                      <p className="job-location">
                        {jobDetailsObject.location}
                      </p>
                    </div>
                    <div className="job-employment-icon">
                      <WorkIcon
                        style={{
                          color: "#343434",
                          fontSize: 14,
                          marginBottom: 16,
                          marginRight: 5,
                        }}
                      />
                      <p className="job-employment">
                        {jobDetailsObject.employmentType}
                      </p>
                    </div>
                  </div>
                  <p className="job-package">
                    {jobDetailsObject.packagePerAnnum}
                  </p>
                </div>
                <hr className="job-line" />
                <div className="job-description-url-container">
                  <div className="job-des-url-container">
                    <h1 className="job-description-title">Description</h1>
                    <div className="job-url-card">
                      <a
                        className="job-url"
                        href={jobDetailsObject.companyWebsiteUlr}
                        target="_"
                      >
                        Visit
                      </a>
                      <OpenInNewIcon
                        style={{ color: "#2a5fa3", fontSize: 17 }}
                      />
                    </div>
                  </div>
                  <p className="job-description">
                    {jobDetailsObject.jobDescription}
                  </p>
                </div>
                <div className="job-skills-container">
                  <h1 className="job-skill-title">Skills</h1>
                  <ul className="job-skills-list-container">
                    {Array.isArray(jobDetailsObject.skills) &&
                      jobDetailsObject.skills.length &&
                      jobDetailsObject.skills.map((item) => (
                        <Skills key={item.name} skillsDetails={item} />
                      ))}
                  </ul>
                </div>
                <div className="job-life-at-company-title-container">
                  <h1 className="job-life-at-company-title">Life at Company</h1>
                  {jobDetailsObject.lifeAtCompany &&
                    Object.keys(jobDetailsObject.lifeAtCompany).length && (
                      <div className="job-life-at-company-descrition-image">
                        <p className="job-life-at-company-description">
                          {jobDetailsObject.lifeAtCompany.description}
                        </p>
                        <img
                          className="job-life-at-company-image"
                          src={jobDetailsObject.lifeAtCompany.imageUrl}
                          alt="life at company"
                        />
                      </div>
                    )}
                </div>
              </div>
              <div className="similar-jobs-container">
                <h1 className="similar-title">Similar Jobs</h1>
                {jobDetailsObject.similarJobs.length !== 0 && (
                  <SimilarJobs
                    similarJobsDetail={jobDetailsObject.similarJobs}
                  />
                )}
              </div>
            </div>
          )}
        {!isLoading && !isSuccess && (
          <SomethingWentWrong onClickHandle={onClickHandle} />
        )}
      </div>
    </>
  );
}

export default Job;
