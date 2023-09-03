import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  height: 80vh;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100vh; */

  @media (max-width: 800px) {
    /* height: 100%; */
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  height: 20vh;
`;

export const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  height: 120px;
  margin-bottom: 40px;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 300px;
    align-items: center;
  }
`;

export const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  height: 80vh;

  @media (max-width: 800px) {
    height: 1120px;
  }
`;

export const BandShowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 400px;
  gap: 10px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
