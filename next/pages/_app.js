import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { CartProvider } from "../context/cart-context";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout navLinks={pageProps.navLinks}>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
