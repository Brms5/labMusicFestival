import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Roboto;
    /* max-width: 1000px; */
    width: 100%;
    /* background-color: #24D866; */
  }
  /* NextJS */
  html {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* min-height: 100%; */
  }
  body {
    display: flex;
    flex: 1;
  }
  #__next {
    display: flex;
    flex: 1;
    /* justify-content: center; */
  }
  /* Globals */
`;
