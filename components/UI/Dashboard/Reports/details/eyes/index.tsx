import Loader from "@/components/Common/Loaders";
import { parentVariant } from "@/lib/utils/variants";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { EyesMetrics } from "@/lib/types/reports";
import { FC } from "react";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiHeartAddLine, RiHeartLine, RiHeartPulseLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

type Props = {
  report?: EyesMetrics;
};

const EyesModel = dynamic(() => import("@/components/Common/3D/eye"), {
  ssr: false,
  loading: () => (
    <div className="grid place-content-center min-h-[10rem] text-center">
      <div className="space-y-2">
        <div className="grid place-content-center">
          <Loader />
        </div>

        <p className="text-sm">Eye loading...</p>
      </div>
    </div>
  ),
});

const EyeReportDetail: FC<Props> = ({ report }) => {
  return (
    <div className="grid md:grid-cols-2 gap-7 pb-8">
      <div className="border rounded-xl bg-white relative self-start">
        <div className="absolute top-2 p-5 left-0 space-y-1">
          <p>Evaluation:</p>
          <p className="text-4xl font-bold">Overall State of Health</p>
        </div>

        <EyesModel />
      </div>

      <motion.div
        {...parentVariant}
        animate="animate"
        className="grid gap-3 grid-cols-2 self-start"
      >
        <div className="rounded-md bg-white border py-4 space-y-4 px-5 self-start">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <FaEye />
            </span>
            Ocular Pressue
          </p>
          <h1 className="text-[1.8rem] font-bold">30mmHg</h1>
        </div>

        <div className="rounded-md bg-white border py-4 space-y-4 px-5 self-start">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <FaEye />
            </span>
            Contact Lens Base Curve
          </p>
          <h1 className="text-[1.8rem] font-bold">30mm</h1>
        </div>

        <div className="rounded-md bg-white border py-4 space-y-4 px-5 self-start col-span-2">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <FaEye />
            </span>
            Contact Lens Diameter
          </p>
          <h1 className="text-[1.8rem] font-bold">50mm</h1>
        </div>

        <div className="rounded-md bg-white border py-4 space-y-4 px-5 self-start col-span-2">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <RiHeartLine />
            </span>
            Vision Test Result
          </p>
          <p className="text-[.8rem]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            earum inventore nemo et architecto, doloremque quis rerum, itaque,
            quas obcaecati error modi eveniet tempore recusandae aut quaerat
            accusantium. Laborum, numquam similique eos minima soluta quas nisi
            cupiditate nobis unde odit.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EyeReportDetail;
