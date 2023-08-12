import React from "react";
import { HeaderContainer, CardsContainer, Main } from "pages/style";
import Header from "./header/header";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import ShowCard from "./showCard/showCard";
import { Content, MainContent, backgroundHome } from "./style";
import { useRouter } from "next/router";

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

interface ColorDay {
  [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Layout({ children }: any) {
  const router = useRouter();
  console.log(router.query.weekday);
  const day = router.query.weekday;

  const colorDay = (query: string) => {
    const dayColorMap: ColorDay = {
      Monday: colors[0],
      Tuesday: colors[1],
      Wednesday: colors[2],
      Thursday: colors[3],
      Friday: colors[4],
      Saturday: colors[5],
      Sunday: colors[6],
    };

    return dayColorMap[query] || "";
  };

  const background = (day: string | string[] | undefined) => {
    if (day !== undefined && typeof day === "string") {
      const backgroundDay = {
        backgroundColor: colorDay(day),
      };
      return backgroundDay;
    } else if (day === undefined) {
      return backgroundHome;
    }
  };

  const cardShows = shows.map((showInfo, index) => {
    return <ShowCard key={index} showInfo={showInfo} />;
  });

  return (
    <Main>
      <GlobalStyle />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Content style={background(day)}>
        <CardsContainer>{cardShows}</CardsContainer>
        <MainContent>{children}</MainContent>
      </Content>
    </Main>
  );
}
