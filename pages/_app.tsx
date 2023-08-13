import React from "react";
import Layout from "../components/layout";
import { GlobalProvider } from "../src/context/GlobalContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyApp({ Component, pageProps }: any) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
}
