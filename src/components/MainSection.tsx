import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import queryString from "query-string";
import { todayToString } from "./util/data";

const MainSection = () => {
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [clickDateIdx, setClickDateIdx] = useState<number>(0);
  const parsed = queryString.parse(window.location.search);

  useEffect(() => {
    dayjs.locale("ko");
    let today = parseInt(dayjs().format("YYYYMMDD"));
    let newDateRange = Array.from({ length: 11 }, (v, i) =>
      todayToString(today + i - 5)
    );
    setDateRange(newDateRange);

    //쿼리스트링 데이트 받아와서 필터 적용
    let dateFromQuery =
      newDateRange.indexOf(todayToString(Number(parsed.date))) + 1;
    setClickDateIdx(dateFromQuery);
  }, []);
  return (
    <Container>
      <RightSection>
        <RightSectionFixed>
          <Title>편성표 날짜 선택</Title>
          <DatePick>
            {dateRange.map((item, index) => {
              //   if (parsed.date) {
              //     todayToString(Number(parsed.date)) === item &&
              //       console.log("item : ", item);
              //   }

              if (item === dayjs().format("YYYY-MM-DD")) {
                return (
                  <Date
                    clickDateIdx={clickDateIdx}
                    today
                    key={index}
                    onClick={() => setClickDateIdx(index + 1)}
                  >
                    {dayjs(item).format("M월D일 (오늘)")}
                  </Date>
                );
              }
              return (
                <Date
                  clickDateIdx={clickDateIdx}
                  today={false}
                  key={index}
                  onClick={() => setClickDateIdx(index + 1)}
                >
                  {dayjs(item).format("M월D일 (ddd)")}
                </Date>
              );
            })}
          </DatePick>
        </RightSectionFixed>
      </RightSection>
    </Container>
  );
};

const Container = styled.nav`
  min-width: 900px;
  max-width: 1200px;
  margin: 0 auto;
`;
const RightSection = styled.div`
  margin-left: auto;
  width: 311px;
  height: 100vh;
  border-left: 1px solid black;
  position: relative;
`;

const RightSectionFixed = styled.div`
  position: sticky;
  padding: 14px 16px;
  right: 0;
  top: 76px;
`;

const Title = styled.div``;

const DatePick = styled.div`
  width: 278px;
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 10px 0;
`;

type DateType = {
  today: boolean;
  clickDateIdx: number;
};
const Date = styled.div<DateType>`
  text-align: center;
  font-size: ${({ today }) => (today ? "13px" : "12px")};
  color: ${({ today }) => (today ? "#45ADA6" : "#000")};
  cursor: pointer;
  ${({ clickDateIdx }) =>
    clickDateIdx &&
    `&:nth-child(${clickDateIdx}) {
        background-color:#E2404F;
        color:#fff;
  }`};

  padding: 9px 0;
  border-bottom: 1px solid #eee;
  &:nth-child(3n + 1),
  &:nth-child(3n + 2) {
    border-right: 1px solid #eee;
  }
  width: 92px;
`;
export default MainSection;
