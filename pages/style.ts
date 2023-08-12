import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  height: 20%;
  background-color: white;
`;

export const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 50%;
  margin-left: 5%;
`;

export const Title = styled.h1`
  font-family: Courier, monospace;
  font-size: 4rem;
  font-style: oblique;
  font-stretch: ultra-expanded;
  font-variant: small-caps;
  font-weight: 900;
  color: #8f80bc;
`;

export const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 80%;
  background-color: #24d866;
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  height: 120px;
`;
