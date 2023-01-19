import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { CartProvider } from "../context/cart-context";
import { CookieContextProvider } from "../context/cookies-context";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <CookieContextProvider
        cookieConsentFromEdge={pageProps.cookieConsentGiven}
      >
        <Layout navLinks={pageProps.navLinks}>
          <Component {...pageProps} />
        </Layout>
      </CookieContextProvider>
    </CartProvider>
  );
}

export default MyApp;
