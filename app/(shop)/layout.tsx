import Cursor from "@/components/Common/Cursor";
import Footer from "@/components/Layout/Footer";
import ShopNavbar from "@/components/Layout/Navbar/shop-navbar";
import MedicineCategories from "@/components/UI/Shop/categories-slide";

const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <>
      <Cursor />
      <ShopNavbar />
      <MedicineCategories />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
