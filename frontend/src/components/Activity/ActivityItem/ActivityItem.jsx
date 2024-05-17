import React from "react";
import "./ActivityItem.css";

function ActivityItem(props) {
  const { activityItem } = props;

  return (
    <li className="list-item-cards">
      <div className="list-item">
        <img
          className="item-logo"
          src={activityItem.companyLogoUrl}
          alt={activityItem.company}
        />
        <p className="item-para">{`You are applied to ${activityItem.role} in ${activityItem.company}`}</p>
      </div>
      <span className="list-item-time">{activityItem.time}</span>
    </li>
  );
}

export default ActivityItem;
