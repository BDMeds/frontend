import Appointment from "@/components/UI/Home/appointment";
import Departments from "@/components/UI/Home/departments";
import FServices from "@/components/UI/Home/f-services";
import Faq from "@/components/UI/Home/faq";
import Hero from "@/components/UI/Home/hero";
import Partners from "@/components/UI/Home/partners";
import WhyUs from "@/components/UI/Home/why-us";

const Home = () => {
  return (
    <>
      <Hero />
      <main className="space-y-32">
        <FServices />
        <WhyUs />
        <Departments />
        <Appointment />
        <Partners />
        <Faq />
      </main>
    </>
  );
};

export default Home;
