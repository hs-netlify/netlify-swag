import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import CartSidebar from "./CartSidebar";
import { useState } from "react";

export default function Layout({ children, navLinks, cookieConsentGiven }) {
  const [cookieConsent, setCookieConsent] = useState(cookieConsentGiven);
  function handleAcceptCookies() {
    document.cookie = "cookieConsentGiven=true; path=/";
    setCookieConsent(true);
  }

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
      {cookieConsent ? null : (
        <CookieBanner handleAccept={handleAcceptCookies} />
      )}
      <CartSidebar open={open} setOpen={setOpen} />
    </>
  );
}
