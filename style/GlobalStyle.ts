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
    max-width: 1200px;
    width: 100%;
  }
  /* NextJS */
  html {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    background-color: black;
  }
  body {
    display: flex;
    flex: 1;
    background-color: white;
  }
  #__next {
    display: flex;
    flex: 1;
    justify-content: center;
    /* align-items: center; */
  }
  /* Globals */
  button,
  a {
    text-decoration: none;
    opacity: 1;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
  }
`;