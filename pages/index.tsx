import { GlobalStyle } from "../style/GlobalStyle";
import { Header, Main } from "./style";

const bg = "/rockbands.png";

export default function Page() {
  return (
    <Main style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: "cover",
      }}>
      <GlobalStyle />
      <Header>
        <h1 style={{ color: "black" }}>Hello, Next.js!</h1>
      </Header>
    </Main>
  );
}
