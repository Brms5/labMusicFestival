import React from "react";
import { HeaderContainer, Main } from "pages/style";
import Header from "./header/header";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import { Content, MainContent, backgroundHome } from "./style";
import { useRouter } from "next/router";

interface ColorDay {
  [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Layout({ children }: any) {
  const router = useRouter();
  const day = router.query.weekday;

  const colorDay = (query: string) => {
    const dayColorMap: ColorDay = {
      Monday: "#009EC9",
      Tuesday: "#FBF504",
      Wednesday: "#E5291E",
      Thursday: "#0E8B3B",
      Friday: "#E75099",
      Saturday: "#F6A20F",
      Sunday: "#6C45A6",
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

  return (
    <Main>
      <GlobalStyle />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <Content style={background(day)}>
        <MainContent>{children}</MainContent>
      </Content>
    </Main>
  );
}
