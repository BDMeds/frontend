import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
