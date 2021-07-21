import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout navLinks={pageProps.navLinks}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
