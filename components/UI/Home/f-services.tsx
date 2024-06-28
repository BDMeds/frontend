"use client";

import { MotionValue, useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

const FServices = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: ref,
  });

  return (
    <div className="h-[200vh] container relative mt-20" ref={ref}>
      <Sec1 scrollYProgress={scrollYProgress} />
      <Sec2 scrollYProgress={scrollYProgress} />
    </div>
  );
};

const Sec1 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.div
      style={{ rotate, scale }}
      className="h-screen sticky text-center top-0 rounded-xl bg-white dark:bg-white/10 grid place-content-center"
    >
      <p className="p-20">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure perspiciatis dicta, delectus veniam ea autem
        doloribus impedit, obcaecati voluptatum provident ex nihil dolor magni, molestiae at. Recusandae similique
        repellendus tempora deleniti totam assumenda sit rem dignissimos minima impedit commodi, architecto error maxime
        nemo eveniet nulla optio asperiores, itaque, consequuntur quaerat dolorem expedita. Non, molestiae, molestias
        adipisci fug
      </p>
    </motion.div>
  );
};

const Sec2 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return <motion.div style={{ rotate, scale }} className="h-screen sticky top-0 rounded-xl bg-blue-500"></motion.div>;
};

export default FServices;
