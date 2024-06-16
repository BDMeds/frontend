import Departments from "@/components/UI/Home/departments";
import Faq from "@/components/UI/Home/faq";
import Hero from "@/components/UI/Home/hero";
import Partners from "@/components/UI/Home/partners";
import Services from "@/components/UI/Home/why-us";

const Home = () => {
  return (
    <>
      <Hero />
      <main className="space-y-32">
        <Services />
        <Departments />
        <Partners />
        <Faq />
      </main>
    </>
  );
};

export default Home;
