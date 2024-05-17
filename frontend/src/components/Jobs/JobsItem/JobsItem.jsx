import React from "react";
import "./JobsItem.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";

function JobsItem(props) {
  const { jobsItem } = props;

  return (
    <Link to={`/job/${jobsItem.id}`} className="job-item-links">
      <li className="job-list-item">
        <div className="job-item-detail-logo">
          <img
            src={jobsItem.companyLogoUrl}
            className="job-item-logo"
            alt={jobsItem.title}
          />
          <div className="job-item-title-rating">
            <h1 className="job-item-title">{jobsItem.title}</h1>
            <div className="job-item-rating-star">
              <LiaStarSolid className="star-icon" />
              <p className="job-item-rating">{jobsItem.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-location-package">
          <div className="job-item-location-employment">
            <div className="job-item-location-icon">
              <LocationOnIcon
                style={{
                  color: "#303030",
                  fontSize: 14,
                  marginBottom: 16,
                  marginRight: 2,
                }}
              />
              <p className="job-item-location">{jobsItem.location}</p>
            </div>
            <div className="job-item-employment-icon">
              <WorkIcon
                style={{
                  color: "#303030",
                  fontSize: 14,
                  marginBottom: 16,
                  marginRight: 2,
                }}
              />
              <p className="job-item-employment">{jobsItem.employmentType}</p>
            </div>
          </div>
          <p className="job-item-package">{jobsItem.packagePerAnnum}</p>
        </div>
        <hr className="jobs-line" />
        <div>
          <h1 className="job-item-description-title">Description</h1>
          <p className="job-item-description">{jobsItem.jobDescription}</p>
        </div>
      </li>
    </Link>
  );
}

export default JobsItem;
