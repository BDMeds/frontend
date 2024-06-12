import Hero from "@/components/UI/Home/hero";
import Illustrations from "@/components/UI/Home/illustrations";
import WhyUs from "@/components/UI/Home/why-us";

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <WhyUs />
        <Illustrations />
      </main>
    </>
  );
};

export default Home;
