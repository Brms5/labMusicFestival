import React from "react";
import { GlobalStyle } from "@ui/style/GlobalStyle";
import { Header, Main } from "./style";

const bg = "/rockbands.png";

export default function Page() {
  console.log("bg", bg);
  return (
    <Main
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <GlobalStyle />
      <Header>
        <h1 style={{ color: "black" }}>Hello, Next.js!</h1>
      </Header>
    </Main>
  );
}
