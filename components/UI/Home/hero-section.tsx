"use client";

import Button from "@/components/Common/Button";
import Loader from "@/components/Common/Loaders";
import { montserrat } from "@/lib/utils/fonts";
import dynamic from "next/dynamic";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const CapsuleModel = dynamic(() => import("./capsule-model"), {
  loading: () => (
    <div className="w-full h-full grid place-content-center">
      <Loader />
    </div>
  ),
});

const ModelSection = () => {
  return (
    <div className="sm:min-h-screen md:mt-4 mt-10 grid md:grid-cols-2 gap-8 md:gap-0 container">
      <div className="flex items-center h-screen sm:h-auto">
        <div className="space-y-7">
          <p className={`lg:text-7xl leading-[1.1] sm:leading-normal ${montserrat.className} text-6xl font-extrabold`}>
            Find The Best <span className="text-primary">Medical</span> Service for you
            <span className="text-primary">.</span>
          </p>

          <div className="w-fit">
            <Link href={"/account/register"}>
              <Button text="Get Started" icon={<LuChevronRight />} variant="filled" size="medium" />
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">{process.env.NODE_ENV === "production" && <CapsuleModel />}</div>
    </div>
  );
};

export default ModelSection;
