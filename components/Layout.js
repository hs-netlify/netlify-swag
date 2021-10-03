import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/cart-context";
import CartSidebar from "./CartSidebar";
import { useState } from "react";

export default function Layout({ children, navLinks }) {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  function openCart() {
    setOpen(true);
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={navLinks} openCart={openCart} />
      <CartSidebar open={open} setOpen={setOpen} />
      {children}
      <Footer />
    </div>
  );
}
