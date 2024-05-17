import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import "./SimilarJobs.css";
import { Link } from "react-router-dom";
import Slider from "../Slider/Slider";
import { LiaStarSolid } from "react-icons/lia";

function SimilarJobs(props) {
  const { similarJobsDetail } = props;

  return (
    <Slider>
      {similarJobsDetail.map((item) => (
        <Link
          key={item.id}
          to={`/job/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="similar-job-card">
            <div className="similar-job-logo-title">
              <img
                className="similar-job-logo"
                src={item.companyLogoUrl}
                alt={item.title}
              />
              <div className="similar-job-title-rating">
                <h1 className="similar-job-title">{item.title}</h1>
                <div className="similar-job-rating-card">
                  <LiaStarSolid className="similar-rating-icon" />
                  <span className="similar-job-rating">{item.rating}</span>
                </div>
              </div>
            </div>
            <hr className="similar-job-line" />
            <div className="similar-job-description-card">
              <h1 className="similar-job-description-title">Description</h1>
              <p className="similar-job-description">{item.jobDescription}</p>
            </div>
            <div className="similar-job-location-employment-card">
              <div className="similar-job-location-card">
                <LocationOnIcon
                  style={{
                    color: "#343434",
                    fontSize: 18,
                    marginRight: 5,
                    marginBottom: 15,
                  }}
                />
                <span className="similar-job-location">{item.location}</span>
              </div>
              <div className="similar-job-employment-card">
                <WorkIcon
                  style={{
                    color: "#343434",
                    fontSize: 18,
                    marginRight: 5,
                    marginBottom: 15,
                  }}
                />
                <span className="similar-job-employment">
                  {item.employmentType}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Slider>
  );
}

export default SimilarJobs;
