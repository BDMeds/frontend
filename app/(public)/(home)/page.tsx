import Hero from "@/components/UI/Home/hero";
import Illustrations from "@/components/UI/Home/illustrations";
import Partners from "@/components/UI/Home/partners";
import Services from "@/components/UI/Home/why-us";

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <Services />
        <Partners />
        <Illustrations />
      </main>
    </>
  );
};

export default Home;
