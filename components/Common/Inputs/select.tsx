import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeToBottomVariant, fadeToTopVariant } from "@/lib/utils/variants";
import { FaChevronUp } from "react-icons/fa6";

export type Option = { value: string; label: string };

type Props = {
  label: string;
  options: Option[];
  id?: string;
  loading?: boolean;
  placeholder?: string;
  onValueChange: (value: any) => void;
  data?: Option | null;
  dropUp?: boolean;
};

const Select: FC<Props> = ({
  options,
  label,
  placeholder,
  onValueChange,
  loading = false,
  data = null,
  dropUp,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDrop = () => setIsOpened((prev) => !prev);

  const [pickedData, setPickedData] = useState<Option | null>(data);

  const updateData = (option: Option) => {
    setPickedData(option);
    onValueChange(option.value);
    setIsOpened(false);
  };

  return (
    <div className="space-y-1 relative">
      <p className="font-bold">{label}</p>
      <div
        className={`dark:bg-transparent bg-white duration-200 hover:bg-gray-100 dark:hover:bg-transparent w-full p-2 border rounded-lg select-none flex items-center justify-between ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={loading ? () => {} : toggleDrop}
      >
        {!pickedData ? (
          <p className="opacity-50">
            {loading ? "Loading..." : placeholder ?? "Select an option"}
          </p>
        ) : (
          <p>{pickedData.label}</p>
        )}
        <FaChevronUp
          size={18}
          className={`duration-200 ${isOpened && "rotate-180"}`}
        />
      </div>

      <AnimatePresence mode="wait">
        {isOpened && (
          <OptionComp
            options={options}
            updateData={updateData}
            dropUp={dropUp}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

type OptionProps = {
  options: Option[];
  updateData: (option: Option) => void;
  dropUp?: boolean;
};

export const OptionComp: FC<OptionProps> = ({
  options,
  updateData,
  dropUp,
}) => {
  const [stateOptions, setStateOptions] = useState(options);

  return (
    <motion.div
      {...(dropUp ? fadeToTopVariant : fadeToBottomVariant)}
      key={crypto.randomUUID()}
      className={`absolute ${
        dropUp ? "bottom-[100%]" : "top-[100%]"
      } border dark:border-white/20 border-black/10  z-[400] divide-white/20 dark:text-zinc-400 dark:bg-secondary-900 bg-white shadow-2xl left-0 w-full min-w-fit rounded divide-y max-h-[15rem] overflow-y-auto show-scroll`}
    >
      <>
        {stateOptions.map((opt, id) => (
          <div
            key={id}
            className="p-2 duration-200 cursor-pointer dark:bg-secondary-900 dark:hover:bg-white/10 bg-white text-sm hover:bg-gray-100"
            onClick={() => updateData(opt)}
          >
            {opt.label}
          </div>
        ))}
      </>
    </motion.div>
  );
};

export default Select;
