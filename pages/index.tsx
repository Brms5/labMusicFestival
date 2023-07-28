import React from "react";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import { Header, Main, Title } from "./style";

const bg = "/music-png.png";

function Page() {
  console.log("bg", bg);
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
      <Header>
        <Title>LIVE MUSIC</Title>
      </Header>
    </Main>
  );
}

export default Page;
