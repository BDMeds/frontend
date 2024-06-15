"use client";
import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const Hero = () => {
  return (
    <header className="relative">
      <div className="container min-h-[calc(100vh+100px)]">
        <div className="absolute top-0 left-0 sm:pt-10 pt-28 w-full h-full bg-gradient-to-tr from-primary via-[#9076e6] to-[#451dc6] overflow-hidden">
          <div className="container w-full h-full grid sm:grid-cols-2 gap-10 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-3 max-w-2xl text-center sm:text-start">
                <h1 className="font-extrabold md:text-8xl sm:text-7xl text-6xl">Meet The Best Doctors</h1>
                <p className="text-gray-200">
                  We are committed to providing you with the best medical and healthcare services to help you live
                  healthier and happier.
                </p>
              </div>
              <div className="w-fit mx-auto sm:mx-0">
                <Link href={"/account/register"}>
                  <Button
                    text="Get Started"
                    icon={<LuChevronRight />}
                    className="text-white border-white hover:bg-white hover:text-primary"
                  />
                </Link>
              </div>
            </div>

            <div className="h-full flex items-end justify-center">
              <Image src={"/images/doc_hero.png"} alt="hero" width={500} height={600} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
