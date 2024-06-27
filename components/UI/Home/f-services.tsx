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
    <div className="h-[200vh] container relative" ref={ref}>
      <Sec1 scrollYProgress={scrollYProgress} />
      <Sec2 scrollYProgress={scrollYProgress} />
    </div>
  );
};

const Sec1 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.div
      style={{ rotate, scale }}
      className="h-screen sticky top-0 border rounded-md bg-[#f8f8f8] grid place-content-center"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure perspiciatis dicta, delectus veniam ea autem
        doloribus impedit, obcaecati voluptatum provident ex nihil dolor magni, molestiae at. Recusandae similique
        repellendus tempora deleniti totam assumenda sit rem dignissimos minima impedit commodi, architecto error maxime
        nemo eveniet nulla optio asperiores, itaque, consequuntur quaerat dolorem expedita. Non, molestiae, molestias
        adipisci fugiat error animi tenetur unde placeat corrupti ducimus officiis. Ut fuga velit debitis a repudiandae
        et eveniet officiis necessitatibus natus consequatur! Repellendus voluptatum aperiam, maxime, sequi libero,
        eligendi vel aliquam dolor corrupti recusandae cupiditate eum odio labore dolores est non necessitatibus
        incidunt hic dolorem.
      </p>
    </motion.div>
  );
};

const Sec2 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const value = useTransform(scrollYProgress, [0, 1], [-10, 0]);

  return <motion.div className="h-screen sticky top-0 border rounded-md bg-blue-500"></motion.div>;
};

export default FServices;
