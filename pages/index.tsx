import React from "react";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import { Content, HeaderContainer, Main } from "./style";
import ShowCard from "components/showCard/showCard";
import Header from "components/header/header";

export interface ShowInfo {
  day: WeekDay;
  color: string;
}

export interface WeekDay {
  weekDay: string;
  monthDay: number;
}

const bg = "/music-png.png";

const colors = ["#6C45A6", "#E75099", "#F6A20F", "#009EC9"];

const weekDays = ["THU", "FRI", "SAT", "SUN"];
const monthDays = [27, 28, 29, 30];
const days: WeekDay[] = [];
for (let i = 0; i < weekDays.length; i++) {
  const obj: WeekDay = {
    weekDay: weekDays[i],
    monthDay: monthDays[i],
  };
  days.push(obj);
}

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
    <Main
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <GlobalStyle />
      <HeaderContainer>
        <Header />
        {/* <Title>LIVE MUSIC</Title> */}
        {/* <TitleDiv>
        </TitleDiv>
        <ProfileDiv>
          <Profile />
        </ProfileDiv> */}
      </HeaderContainer>
      <Content>
        {shows.map((showInfo, index) => {
          return <ShowCard key={index} showInfo={showInfo} />;
        })}
      </Content>
    </Main>
  );
}

export default Page;
