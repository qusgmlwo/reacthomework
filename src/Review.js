import { useParams, Link } from "react-router-dom";
import React from "react";

const Review = () => {
  const points = 5;
  const [point, setPoint] = React.useState(0);
  const { dayName } = useParams();
  const handleEnter = (event) => {
    setPoint(event.currentTarget.dataset.num);
  };

  const renderPoints = () => {
    const result = [];
    for (let i = 0; i < points; i++) {
      if (point <= i) {
        result.push(
          <div
            className="points purple"
            data-num={i + 1}
            onMouseEnter={handleEnter}
          ></div>
        );
      } else {
        result.push(
          <div
            className="points dark-purple"
            data-num={i + 1}
            onMouseEnter={handleEnter}
          ></div>
        );
      }
    }
    return result;
  };
  return (
    <div className="Review">
      <h1 className="title">{dayName}요일 평점 남기기</h1>
      <div style={{ display: "flex" }} className="points__container">
        {renderPoints()}
      </div>
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="guide-container">
          <button className="average-point">평점 남기기</button>
        </div>
      </Link>
    </div>
  );
};

export default Review;
