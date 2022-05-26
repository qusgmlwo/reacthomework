import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const points = 5;
  const days = [
    { point: 0, dayName: "일" },
    { point: 0, dayName: "월" },
    { point: 0, dayName: "화" },
    { point: 0, dayName: "수" },
    { point: 0, dayName: "목" },
    { point: 0, dayName: "금" },
    { point: 0, dayName: "토" },
  ];

  const [score, setScore] = React.useState(days);

  const randomPoint = () => {
    const content = [];
    content.length = score.length;

    score.forEach((day, idx) => {
      content[idx] = {
        dayName: day.dayName,
        point: Math.floor(Math.random() * 7),
      };
    });

    setScore(content);
  };

  const renderPoints = (point) => {
    const result = [];
    for (let i = 1; i <= points; i++) {
      if (point > i) {
        result.push(<div className="points circle" key={i}></div>);
      } else {
        result.push(<div className="points circle2" key={i}></div>);
      }
    }
    return result;
  };

  // 리셋 버튼
  const reset = () => {
    setScore(days);
  };

  // 점수 값 랜덤 할당
  React.useEffect(() => {
    randomPoint();
  }, []);

  return (
    <div className="App">
      <h1 className="title">내 일주일은?</h1>
      <div>
        {score.map((day, idx) => (
          <div
            key={idx}
            style={{ display: "flex", alignItems: "center" }}
            className="a-container"
          >
            <div>
              <span className="dayName">{day.dayName}</span>
            </div>
            <div className="b-container"></div>
            {renderPoints(day.point)}
            <Link to={{ pathname: `/review/${day.dayName}` }}>
              <div className="points-arrow"></div>
            </Link>
          </div>
        ))}
      </div>
      <div className="c-container">
        <div className="average-point">
          <span>
            평균 평점{" "}
            {(
              score.reduce((acc, val) => acc + val.point, 0) / days.length
            ).toFixed(3)}
          </span>
        </div>
        <button className="reset-btn" onClick={reset}>
          리셋
        </button>
      </div>
    </div>
  );
}

export default App;
