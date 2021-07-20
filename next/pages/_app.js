import "tailwindcss/tailwind.css";
import Head from "next/head";
import Layout from "../components/Layout";
const config = require("../next.config");

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <base href={config.basePath + "/"} />
      </Head>
      <Layout navLinks={pageProps.navLinks}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
