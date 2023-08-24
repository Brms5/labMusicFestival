import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1050px) {
    justify-content: space-around;
  }
`;
