import Cursor from "@/components/Common/Cursor";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import ShopNavbar from "@/components/Layout/Navbar/shop-navbar";

const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <>
      <Cursor />
      <ShopNavbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
