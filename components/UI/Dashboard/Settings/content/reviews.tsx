import { opacityVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { FaStar } from "react-icons/fa6";

const Reviews = () => {
  return (
    <motion.div {...opacityVariant} className="p-5 space-y-5">
      <p className="text-xl">Reviews</p>

      <div className="divide-y">
        {Array.from({ length: 5 }).map((_, id) => (
          <div className="flex items-center justify-between py-2" key={id}>
            <div className="flex gap-2 items-center">
              <div className="size-10 rounded-full relative overflow-hidden">
                <Image
                  src={`/images/doctors/doc${id + 1}.jpg`}
                  alt="doc"
                  width={100}
                  height={100}
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold">{faker.person.fullName()}</p>
                <div className="flex items-center gap-1">
                  <span>{faker.number.float({ multipleOf: 0.5, min: 0, max: 5 })}</span>{" "}
                  <FaStar size={14} className="text-yellow-300" />
                </div>
              </div>
            </div>

            <p className="text-gray-400">{faker.number.int({ min: 5, max: 59 })}mins ago</p>
          </div>
        ))}

        {/* <div className=""></div> */}
      </div>
    </motion.div>
  );
};

export default Reviews;
