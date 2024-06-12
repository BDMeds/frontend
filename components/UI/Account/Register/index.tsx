"use client";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { opacityVariant } from "@/lib/utils/variants";
import PatientRegister from "./patient";
import DoctorRegister from "./doctor";

type Tag = "patient" | "doctor";

const choices: { name: string; tag: Tag; icon: JSX.Element }[] = [
  { name: "Patient", tag: "patient", icon: <FaUser /> },
  { name: "Doctor", tag: "doctor", icon: <FaUserDoctor /> },
];

const Register = () => {
  const [mainTag, setTag] = useState<Tag | null>(null);

  const renderContent = () => {
    switch (mainTag) {
      case "doctor":
        return <DoctorRegister key="doctor" />;
      case "patient":
        return <PatientRegister key={"patient"} />;
      default:
        return (
          <motion.div {...opacityVariant} key={"quest"} className="min-w-full min-h-screen grid place-content-center">
            <div className="space-y-5">
              <div className="text-center">
                <h1 className="font-bold text-3xl">Join BdMeds</h1>
                <p>Who are you? I&apos;m a ...</p>
              </div>

              <div className="flex items-center gap-2">
                {choices.map(({ icon, name, tag }, id) => (
                  <div
                    key={id}
                    className={`border flex items-center gap-2 rounded-xl border-gray-500/20 px-5 py-4 cursor-pointer duration-200 hover:bg-gray-100 ${
                      tag === mainTag ? "bg-primary text-white" : "bg-white"
                    }`}
                    onClick={() => setTag(tag)}
                  >
                    {icon}
                    <p>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>;
};

export default Register;
