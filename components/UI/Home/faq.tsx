"use client";

import { faqs } from "@/lib/data/home";
import { fadeToBottomVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Faq = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const chooseFaq = (id: number) => {
    if (selectedFaq === id) {
      setSelectedFaq(null);
    } else {
      setSelectedFaq(id);
    }
  };

  return (
    <div className="space-y-8 container">
      <div className="space-y-4 text-center md:text-start">
        <p className="font-semibold uppercase">What People</p>
        <h3 className="font-extrabold text-5xl text-primary text-center md:text-start">Usually Asked</h3>
      </div>

      <div className="space-y-4">
        {faqs.map(({ question, answer }, id) => (
          <div key={id} className="border rounded-xl overflow-hidden">
            <div
              className={`flex items-center justify-between hover:bg-gray-200 dark:hover:bg-white/10 p-5 select-none cursor-pointer duration-300 ${
                selectedFaq === id ? "" : ""
              }`}
              onClick={() => chooseFaq(id)}
            >
              <p className="font-extrabold md:text-2xl sm:text-xl">{question}</p>

              <FaChevronDown
                size={30}
                className={`text-primary duration-300 ${selectedFaq === id ? "rotate-180" : ""}`}
              />
            </div>

            <div className="overflow-hidden">
              {selectedFaq === id && (
                <motion.div {...fadeToBottomVariant} className="p-6 md:text-lg border-t overflow-hidden">
                  <p>{answer}</p>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
