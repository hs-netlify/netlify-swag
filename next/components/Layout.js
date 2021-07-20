import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, navLinks }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={navLinks} />
      {children}
      <Footer />
    </div>
  );
}
