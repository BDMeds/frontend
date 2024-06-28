"use client";
import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".hero-up", { opacity: 0, y: "100%", stagger: 0.2 })
        .from(".hero-img", { opacity: 0, y: "10%" }, 0.4);
    },
    { scope: ref }
  );

  return (
    <header className="relative">
      <div className="container min-h-[calc(100vh+140px)]">
        <div className="absolute top-0 left-0 pt-28 lg:pt-0 w-full h-full bg-gradient-to-tr from-primary via-[#9076e6] to-[#451dc6] overflow-hidden">
          <div className="container w-full h-full grid lg:grid-cols-2 gap-10 items-center z-10" ref={ref}>
            <div className="text-white space-y-8 lg:-mt-24">
              <div className="space-y-3 max-w-2xl text-center lg:text-start">
                <div className="overflow-hidden">
                  <h1 className="font-extrabold md:text-8xl lg:text-7xl text-6xl hero-up">Meet The Best Doctors</h1>
                </div>
                <div className="overflow-hidden">
                  <p className="text-gray-200 hero-up">
                    We are committed to providing you with the best medical and healthcare services to help you live
                    healthier and happier.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="w-fit mx-auto lg:mx-0 hero-up">
                  <Link href={"/account/register"}>
                    <Button
                      text="Get Started"
                      icon={<LuChevronRight />}
                      className="text-white border-white hover:bg-white hover:text-primary"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="h-full flex items-end justify-center lg:-mt-14">
              <Image src={"/images/doc_hero.png"} alt="hero" width={500} height={600} className="hero-img" />
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319" className="absolute -bottom-6 left-0">
          <path
            fill="#f8f8f8"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,224C960,245,1056,267,1152,272C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Hero;
