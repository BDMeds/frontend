import { GiMedicines } from "react-icons/gi";

const Loader = () => {
  return (
    <div className="size-12 grid place-content-center rounded-full bg-secondary-800 shadow-md">
      <GiMedicines size={35} className="text-primary-base animate-spin" />
    </div>
  );
};

export default Loader;
