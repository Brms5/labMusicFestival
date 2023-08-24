import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    /* box-sizing: border-box; */
  }
  body {
    font-family: Roboto;
    width: 100%;
  }
  /* NextJS */
  /* html {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  body {
    display: flex;
    flex: 1;
  }
  #__next {
    display: flex;
    flex: 1;
  } */
  /* Globals */
`;
