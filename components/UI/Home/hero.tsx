"use client";
import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const Hero = () => {
  return (
    <header className="relative">
      <div className="container h-screen">
        <Image
          src={"/images/doc-bg2.jpg"}
          alt="background"
          width={1000}
          height={800}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="absolute top-0 left-0 pt-10 w-full h-full bg-black/80 flex items-center">
          <div className="container">
            <div className="text-white space-y-8">
              <div className="space-y-3 max-w-xl">
                <h1 className="font-extrabold text-7xl">Meet The Best Doctors</h1>
                <p className="text-gray-200">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, tempora isicing elit. Placeat,
                  tempora.
                </p>
              </div>
              <div>
                <Link href={"/account/register"}>
                  {" "}
                  <Button text="Get Started" icon={<LuChevronRight />} variant="filled" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
