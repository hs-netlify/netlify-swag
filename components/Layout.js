import { useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import CartSidebar from "./CartSidebar";
import CookiesContext from "../context/cookies-context";

export default function Layout({ children, navLinks }) {
  const { cookieConsentGiven, acceptCookies } = useContext(CookiesContext);

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
      {cookieConsentGiven ? null : (
        <CookieBanner handleAccept={acceptCookies} />
      )}
      <CartSidebar open={open} setOpen={setOpen} />
    </>
  );
}
