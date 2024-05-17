import React from "react";
import "./SomethingWentWrong.css";

function SomethingWentWrong(props) {
  const { onClickHandle } = props;

  const handleClick = () => {
    onClickHandle();
  };

  return (
    <div className="something-went-wrong-container">
      <img
        className="something-went-wrong-image"
        alt="something went wrong"
        src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710573317/404_Error_Page_not_Found_with_people_connecting_a_plug-amico_1_ktsgoi.png"
      />
      <h1 className="something-went-wrong-title">Oops! Something Went Wrong</h1>
      <p className="something-went-wrong-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" onClick={handleClick}>
        Retry
      </button>
    </div>
  );
}

export default SomethingWentWrong;
