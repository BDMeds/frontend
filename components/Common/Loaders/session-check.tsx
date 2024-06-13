import { motion } from "framer-motion";
import { GiMedicines } from "react-icons/gi";

const SessionCheckLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full text-white text-xl h-full flex items-center justify-center">
      <motion.div className="flex items-center gap-2">
        <div className="flex items-center animate-pulse gap-2 text-primary font-extrabold text-2xl">
          <GiMedicines size={45} />
        </div>
      </motion.div>
    </div>
  );
};

export default SessionCheckLoader;
