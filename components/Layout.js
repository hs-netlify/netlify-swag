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
    <>
      <div className="min-h-screen grid grid-cols-1 grid-rows-[auto,1fr,auto]">
        <Navbar navLinks={navLinks} openCart={openCart} />
        <main>{children}</main>
        <Footer />
      </div>
      <CartSidebar open={open} setOpen={setOpen} />
    </>
  );
}
