import React from "react";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import { Header, Main, Title } from "./style";

const bg = "/rockbands.png";

function Page() {
  console.log("bg", bg);
  return (
    <Main>
      <GlobalStyle />
      <Header>
        <Title>LIVE MUSIC</Title>
      </Header>
    </Main>
  );
}

export default Page;
