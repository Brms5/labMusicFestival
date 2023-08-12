import React from "react";
import { HeaderContainer, Content, CardsContainer, Main } from "pages/style";
import Header from "./header/header";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import ShowCard from "./showCard/showCard";
import { MainContent } from "./style";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Layout({ children }: any) {
  const cardShows = shows.map((showInfo, index) => {
    return <ShowCard key={index} showInfo={showInfo} />;
  });

  return (
    <Main>
      <GlobalStyle />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Content>
        <CardsContainer>{cardShows}</CardsContainer>
        <MainContent>{children}</MainContent>
      </Content>
    </Main>
  );
}
