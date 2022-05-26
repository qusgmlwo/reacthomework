import { round } from "lodash";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const MyWeek = (props) => {
  // 페이지를 이동하기 위해서 저는 history 객체를 사용할거예요.
  // 어떻게? react-router-dom이 제공해주는 useHistory 훅을 사용해서요!
  const history = useHistory();

  // 저는 아래의 순서대로 생각하며 이 페이지를 만들었어요!
  // 이번 과제에서 다음엔 뭘 해야하나 멈칫멈칫했다면 주석을 순서대로 읽어보세요.

  // 이 페이지 목표!
  // 저는 이 페이지에서 요일 별로 평점을 보여주고 싶어요.

  /**
   * 저는 이 페이지에서 요일 별로 평점을 보여주고 싶어요.
   *
   * Q1. 요일을 가져오려면 어떻게 해야할까?
   *  -> 자바스크립트에서 요일 가져오는 법을 검색해보자!
   *  -> 검색해보니 new Date("어떤 날짜").getDay()를 사용하면 어떤 날짜의 요일을 가져올 수 있대요.
   *  -> * [꼭 확인하자!] 값을 어떻게 가져오는 지도 확인해야해요! 0~6까지 숫자로 값을 가져온다고 하네요! 0은 일요일, 6은 토요일이래요.
   *
   * Q2. 엇, 그런데 난 요일을 숫자로 보여주고 싶지 않아! 한글로 보여주고 싶어요! 한글로 보여주려면 어떻게 해야할까?
   *  -> 숫자를 키로, 한글을 값으로 가지고 있는 딕셔너리를 만들어서 쓰자!
   *  -> 아래의 day_text_dict처럼 키값을 사용해서 한글로 된 요일을 가져올 수 있게 해줬어요.
   * (추가 과제인 오늘 날짜부터 보여주기를 하지 않는다면, 딕셔너리가 아니라 배열로 ["일", "월", ...] 이렇게 만들어줘도 좋아요!)
   *
   */

  // 요일을 딕셔너리로 만들어줘요.
  const day_text_dict = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };

  console.log(
    "요일이 한글로 바뀌었나 확인해봐야지! : ",
    Object.keys(day_text_dict).map((_d, idx) => day_text_dict[_d])
  );

  /**
   * Q3. 콘솔을 확인해보니 요일은 한글로 잘 나오는데 일요일부터 나오네요! 오늘을 제일 위로 보여주려면 어떻게 해야할까?
   *  -> 일단 오늘 날짜부터 구해야겠다! 자바스크립트로 오늘 날짜를 구하는 법을 검색해보자!
   *  -> 오늘 날짜를 구했다면 오늘이 제일 위로 오게 해야하는데... 어떻게 하면 좋을까?
   *
   * [생각해보기]
   * 요일은 0~6까지 숫자예요. 우리가 만든 딕셔너리는 0~6까지를 키로 가지고 있고요.
   * 오늘이 토요일이라면 오늘 기준 일주일은 [6, 0, 1, 2, 3, 4, 5]가 되어야 해요.
   * [0, 1, 2, 3, 4, 5, 6]을 [6, 0, 1, 2, 3, 4, 5]로 바꿔주면 되는거죠!
   * 이건 "10진법에서의 일의 자리만 구하기"의 7진법 버전으로 생각하면 쉽습니다!
   * 6보다 크면 앞자리가 바뀌는 거니까 -7을 해줘서 일의 자리 숫자를 가져오고, 6과 같거나 작으면 그대로 가져오면 됩니다.
   *
   */

  const week_days = Object.keys(day_text_dict).map((_d, idx) => {
    // 오늘 날짜를 구해요!
    let today = new Date().getDay();

    // _d는 day_text_dict의 key 값입니다. 0~6까지 숫자가 들어오고 있어요.
    // 오잉? 숫자를 가져오는데 parseInt(숫자형으로 형변환해주는 함수예요. 이 친구를 처음 본다면 꼭꼭 찾아보세요!)는 왜 해줄까요?
    //  -> 딕셔너리의 키값은 우리가 숫자를 넣었더래도 알아서 문자형으로 바꿔버리거든요. 그래서 숫자로 써먹고 싶으면 꼭 형변환을 해줘야해요.
    //  -> 숫자로 써먹고 싶을 때는 어떤 때일까? 숫자 크기 비교, 더하기 빼기 등 연산을 하고 싶을 때!
    let d =
      today + parseInt(_d) > 6
        ? today + parseInt(_d) - 7
        : today + parseInt(_d);

    // 헷갈려요? 그럴 땐 콘솔로 원하는 키값이 맞는 지 확인해보기! (주석풀고 확인해보세요!)
    // console.log(d);
    return day_text_dict[d];
  });

  console.log("오늘이 제일 위로 오는 지 확인해봐야지! : ", week_days);

  /**
   * Q4. 요일 배열은 다 만들었어요! 이제 요일 별로 평점을 매겨주고 싶어요.
   * 지금 배열은 요일만 가지고 있으니까 평점과 요일(한글로 된 요일 텍스트!)을 모두 가지고 있도록 바꿔주려면 어떻게 해야할까?
   *  -> 배열 요소 하나하나를 String이 아니라 딕셔너리가 되도록 해주면 되겠네요!
   *
   * Q5. 평점을 랜덤으로 보여주고 싶어요! 어떻게 해야할까?
   *  -> 랜덤하게 1~5 중 한 숫자를 가져오는 방법을 찾아야죠!
   *  -> 평점을 랜덤으로 생성해보자! 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   *
   * Q6. 전체 평균 평점을 구하려면 어떻게 해야할까?
   *  -> 랜덤으로 생성된 각 요일별 평점을 더해주고 일주일은 7일이니, 요일 정보를 담고 있는 배열의 길이로 나눠주면 되겠죠!
   */

  // 평점 합계를 담아둘 변수입니다!
  let rate_sum = 0;

  // 요일별 점수를 랜덤으로 추가하기 위한 과정입니다!
  const week_rates = week_days.map((w, idx) => {
    const random =
      Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1) + 1)) +
      Math.ceil(1);
    rate_sum += random;

    // day는 요일 텍스트가, rate는 랜덤 평점이 들어가요!
    return {
      day: w,
      rate: random,
    };
  });

  console.log(
    "평점이 랜덤하게 들어간 배열이 잘 나왔는 지 확인해봐야지! : ",
    week_rates,
    week_rates.length
  );

  const rate_avg = (rate_sum / week_rates.length).toFixed(1);
  const [avg, setAvg] = useState(rate_avg);

  // 이제 화면에 뿌려줘볼 차례예요!
  // 화면을 만들어봅시다.
  return (
    <>
      <div
        style={{
          maxWidth: "350px",
          width: "80vw",
          height: "90vh",
          margin: "5vh auto",
          padding: "5vh 0",
          border: "1px solid #ddd",
          boxSizing: "border-box",
          borderRadius: "5px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>내 일주일은?</h3>

        {week_rates.map((w, idx) => {
          return (
            <div
              key={`week_day_${idx}`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1rem 0",
                width: "100%",
              }}
            >
              <p style={{ margin: "0 0.5rem 0 0", fontWeight: "bold" }}>
                {w.day}
              </p>

              {Array.from({ length: 5 }, (item, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "30px",
                      margin: "5px",
                      backgroundColor: w.rate < idx ? "#ddd" : "#ffeb3b",
                    }}
                  ></div>
                );
              })}

              <div
                style={{
                  appearance: "none",
                  backgroundColor: "transparent",
                  borderColor: "purple",
                  width: "0",
                  height: "0",
                  borderTop: "1rem solid transparent",
                  borderBottom: "1rem solid transparent",
                  borderLeft: "1.6rem solid purple",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push(`/review/${w.day}`);
                }}
              ></div>
            </div>
          );
        })}
        <div
          style={{
            width: "8rem",
            margin: "1rem auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "blue",
            padding: "9px",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          평균 평점 {avg}
          <div
            style={{
              width: "inherit",
              height: "fit-content",
              backgroundColor: "dodgerblue",
              borderRadius: "6px",
              textAlign: "center",
              margin: "10px 0 0 0",
            }}
            onClick={() => {
              setAvg(parseInt(0).toFixed(1));
            }}
          >
            <p style={{ color: "white", fontSize: "18px" }}>Reset</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWeek;
