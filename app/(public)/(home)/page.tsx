import Departments from "@/components/UI/Home/departments";
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
      </main>
    </>
  );
};

export default Home;
