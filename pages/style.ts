import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
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

export const Content = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 60%;
`;
