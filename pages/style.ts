import styled from "styled-components";

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
