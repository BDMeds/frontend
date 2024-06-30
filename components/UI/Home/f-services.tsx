"use client";

import useDimension from "@/lib/hooks/useDimension";
import { MotionValue, useScroll, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const FServices = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: ref,
  });

  return (
    <div className="sm:h-[200vh] space-y-5 sm:space-y-0 h-screen container relative mt-20" ref={ref}>
      <Sec1 scrollYProgress={scrollYProgress} />
      <Sec2 scrollYProgress={scrollYProgress} />
    </div>
  );
};

const Sec1 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const { width } = useDimension();

  return (
    <motion.div
      style={width > 768 ? { rotate, scale } : {}}
      className="sm:h-screen h-[50vh] sticky text-center border dark:border-none sm:top-0 top-10 rounded-xl bg-white dark:bg-white/10 dark:bg-white dark:bg-white/10/10 grid place-content-center"
    >
      <div className="space-y-5">
        <div className="mx-auto md:size-28 size-24 rounded-full border relative overflow-hidden grid place-content-center">
          <Image
            src={"/images/doctors/doc4.jpg"}
            alt="doc"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-5 space-y-8">
          <FaQuoteLeft
            className="absolute sm:-top-5 sm:-left-5 top-0 left-0 dark:text-white/40 text-black/40"
            size={width > 768 ? 32 : 20}
          />

          <p className="dark:text-white/50 sm:leading-8 text-sm sm:text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure perspiciatis dicta, delectus veniam ea autem
            doloribus impedit, obcaecati voluptatum provident ex nihil dolor magni, molestiae at. Recusandae similique
            repellendus tempora deleniti totam assumenda sit rem dignissimos minima impedit commodi, architecto error
            maxime nemo eveniet
          </p>

          <div className="flex items-center gap-4 justify-end">
            <div className="border-y sm:w-[100px] w-[50px]"></div>
            <p>Dr. Justin Timerlake</p>
          </div>

          <FaQuoteRight
            className="absolute md:-right-5 md:bottom-10 right-4 bottom-10 dark:text-white/40 text-black/40"
            size={width > 768 ? 32 : 20}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Sec2 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const { width } = useDimension();

  return (
    <motion.div
      style={width > 768 ? { rotate, scale } : {}}
      className="sm:h-screen h-[50vh] sticky sm:top-0 top-10 rounded-xl bg-slate-900 grid place-content-center text-center"
    >
      <div className="space-y-5">
        <div className="mx-auto md:size-28 size-24 rounded-full border relative overflow-hidden grid place-content-center">
          <Image
            src={"/images/doctors/doc4.jpg"}
            alt="doc"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-5 space-y-8 text-slate-100 dark:text-slate-100/80">
          <FaQuoteLeft
            className="absolute sm:-top-5 sm:-left-5 top-0 left-0 text-white/50"
            size={width > 768 ? 32 : 20}
          />

          <p className="sm:leading-8 text-sm sm:text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure perspiciatis dicta, delectus veniam ea autem
            doloribus impedit, obcaecati voluptatum provide similique repellendus tempora deleniti totam assumenda sit
            rem dignissimos minima impedit commodi, architecto error maxime nemo eveniet
          </p>

          <div className="flex items-center gap-4 justify-end">
            <div className="border-y sm:w-[100px] w-[50px]"></div>
            <p>Dr. Justin Timerlake</p>
          </div>

          <FaQuoteRight
            className="absolute md:-right-5 md:bottom-10 right-4 bottom-10 text-white/50"
            size={width > 768 ? 32 : 20}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FServices;
