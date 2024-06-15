"use client";
import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const Hero = () => {
  return (
    <header className="relative">
      <div className="container min-h-[calc(100vh+140px)]">
        <div className="absolute top-0 left-0 pt-28 sm:pt-0 w-full h-full bg-gradient-to-tr from-primary via-[#9076e6] to-[#451dc6] overflow-hidden">
          <div className="container w-full h-full grid sm:grid-cols-2 gap-10 items-center z-10">
            <div className="text-white space-y-8 md:-mt-24">
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

            <div className="h-full flex items-end justify-center md:-mt-14">
              <Image src={"/images/doc_hero.png"} alt="hero" width={500} height={600} />
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319" className="absolute -bottom-6 left-0">
          <path
            fill="#f8f8f8"
            fill-opacity="1"
            d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,224C960,245,1056,267,1152,272C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        {/* 
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0" viewBox="0 0 1440 319">
          <path
            fill="#f8f8f8"
            fill-opacity="1"
            d="M0,128L0,224L288,224L288,160L576,160L576,224L864,224L864,288L1152,288L1152,256L1440,256L1440,320L1152,320L1152,320L864,320L864,320L576,320L576,320L288,320L288,320L0,320L0,320Z"
          ></path>
        </svg> */}
      </div>
    </header>
  );
};

export default Hero;
