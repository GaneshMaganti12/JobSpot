import React, { useRef } from "react";
import "./Slider.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Slider({ children }) {
  const sliderContainer = useRef();

  const navigation = (direction) => {
    const container = sliderContainer.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="slider-card">
      <IoIosArrowBack
        className="arrow-button left"
        onClick={() => navigation("left")}
      />
      <IoIosArrowForward
        className="arrow-button right"
        onClick={() => navigation("right")}
      />
      <div className="slider-items" ref={sliderContainer}>
        {children}
      </div>
    </div>
  );
}

export default Slider;
