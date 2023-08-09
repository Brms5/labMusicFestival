import React from "react";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import { CardsContainer, Content, HeaderContainer, Main } from "./style";
import ShowCard from "components/showCard/showCard";
import Header from "components/header/header";
import InfoCard from "components/infoCard/infoCard";

export interface ShowInfo {
  day: WeekDay;
  color: string;
}

export interface WeekDay {
  weekDay: string;
  monthDay: number;
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthDays = [24, 25, 26, 27, 28, 29, 30];
const days: WeekDay[] = [];
for (let i = 0; i < weekDays.length; i++) {
  const obj: WeekDay = {
    weekDay: weekDays[i],
    monthDay: monthDays[i],
  };
  days.push(obj);
}

const colors = [
  "#009EC9",
  "#FBF504",
  "#E5291E",
  "#0E8B3B",
  "#E75099",
  "#F6A20F",
  "#6C45A6",
];
const shows: ShowInfo[] = [];
for (let i = 0; i < colors.length; i++) {
  const obj: ShowInfo = {
    day: days[i],
    color: colors[i],
  };
  shows.push(obj);
}

function Page() {
  return (
    <Main>
      <GlobalStyle />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Content>
        <CardsContainer>
          {shows.map((showInfo, index) => {
            return <ShowCard key={index} showInfo={showInfo} />;
          })}
        </CardsContainer>
        <InfoCard />
      </Content>
    </Main>
  );
}

export default Page;
