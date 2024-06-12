import { opacityVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { FC } from "react";
import { Tag } from "..";

type Props = {
  updateTag: (tag: Tag | null) => void;
};

const DoctorRegister: FC<Props> = ({ updateTag }) => {
  return <motion.div {...opacityVariant}></motion.div>;
};

export default DoctorRegister;
