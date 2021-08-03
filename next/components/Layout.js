import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/cart-context";
import Cart from "./Cart";

export default function Layout({ children, navLinks }) {
  const { cart } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={navLinks} />
      <pre className="whitespace-pre-wrap">{JSON.stringify(cart, null, 2)}</pre>
      <Cart />
      {children}
      <Footer />
    </div>
  );
}
