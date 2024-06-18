"use client";

import { services } from "@/lib/data/home";
import { fadeToTopVariant, parentVariantSlow } from "@/lib/utils/variants";
import { motion } from "framer-motion";

const WhyUs = () => {
  return (
    <section>
      <div className="container my-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 sm:grid-cols-2 lg:gap-10 gap-6 justify-center flex-wrap"
        >
          <motion.div
            variants={fadeToTopVariant}
            initial="initial"
            animate="animate"
            key="434"
            className="space-y-3 p-5"
          >
            <p className="text-lg">Services</p>
            <p className="font-extrabold text-4xl text-primary">Provides Our Best Services</p>
          </motion.div>
          {services.map(({ description, icon, title }, id) => (
            <motion.div
              key={id}
              variants={fadeToTopVariant}
              initial="initial"
              animate="animate"
              className="px-5 py-7 space-y-4 bg-white shadow-lg shadow-gray-100 rounded-xl duration-300 hover:shadow-2xl"
            >
              <div className="size-12 border rounded-full bg-primary text-white grid place-content-center">{icon}</div>

              <p className={`font-extrabold text-2xl`}>{title}</p>

              <p className="text-gray-500">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
