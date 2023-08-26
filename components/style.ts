import styled from "styled-components";

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  min-height: 80vh;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

export const backgroundHome = {
  backgroundImage: `url(/background-paper.jpeg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export const backgroundLogin = {
  backgroundImage: `url(/music-png.png)`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  maxWidth: "1200px",
};
