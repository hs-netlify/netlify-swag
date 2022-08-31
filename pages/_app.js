import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { CartProvider } from "../context/cart-context";

function MyApp({ Component, pageProps }) {
  const [cookieConsentGiven, setCookieConsentGiven] = useState(
    pageProps.cookieConsentGiven
  );
  return (
    <CartProvider>
      <Layout
        navLinks={pageProps.navLinks}
        cookieConsentGiven={cookieConsentGiven}
        setCookieConsentGiven={setCookieConsentGiven}
      >
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
