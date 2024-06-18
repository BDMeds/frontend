import Button from "@/components/Common/Button";
import Select from "@/components/Common/Inputs/select";
import {
  submitCardiologyReprot,
  submitNephrologyReport,
} from "@/lib/services/report.service";
import { Frequency } from "@/lib/types/reports";
import { toastError } from "@/lib/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  consultationNote: string;
  treatmentPlan: string;
  symptoms: string;
  kidneyHealthStatus: string;
  creatnine: number;
  BUN: number;
  urineProtein: number;
  dialysisHours: number;
  dialysisFrequency: string;
};

type Props = {
  refetchReport(): void;
};

const Nephrology: FC<Props> = ({ refetchReport }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { id: appointmentId } = useParams<{ id: string }>();
  const [dialysisFrequency, setDialysisFrequency] = useState<Frequency>();

  const { mutateAsync: submitReport, isPending } = useMutation({
    mutationFn: submitNephrologyReport,
    onSuccess: () => {
      refetchReport();
    },
  });

  const onSubmit = async (input: Inputs) => {
    if (!dialysisFrequency) {
      return toastError("Select dialysis frequency");
    }
    await submitReport({
      report: { ...input, dialysisFrequency },
      appointmentId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-6">
      <section>
        <h1 className="font-bold">General Report</h1>
        <hr className="border-y-[1.2px]" />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 mt-3">
          <div className="space-y-1 mb-3">
            <label htmlFor="consultationNote" className="text-[.9rem]">
              Consultation Note <sup className="text-red-500">*</sup>
            </label>
            <input
              type="text"
              placeholder="Enter Consultation Note"
              {...register("consultationNote", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.consultationNote ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="symptoms" className="text-[.9rem]">
              Symptoms Noticed
            </label>
            <input
              type="text"
              placeholder="symptoms"
              {...register("symptoms", {})}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.symptoms ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="treatmentPlan" className="text-[.9rem]">
              Treatment Plan
            </label>
            <input
              type="text"
              placeholder="Treatment Plan"
              {...register("treatmentPlan", {})}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.treatmentPlan ? "border-red-500/50" : ""
              }`}
            />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h1 className="font-bold">Organ Report</h1>
        <hr className="border-y-[1.2px]" />

        <div className="grid grid-cols-2 lg:grid-cols-3 mt-3 gap-x-3">
          <div className="space-y-1 mb-3 col-span-2 lg:col-span-3">
            <label htmlFor="kidneyHealthStatus" className="text-[.9rem]">
              Kidney Health Status <sup className="text-red-500">*</sup>
            </label>
            <textarea
              placeholder="Enter descriptive kidney health status"
              {...register("kidneyHealthStatus", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.kidneyHealthStatus ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="creatnine" className="text-[.9rem]">
              Creatnine Level (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter creatnine level"
              {...register("creatnine", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.creatnine ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="BUN" className="text-[.9rem]">
              Blood Urea Nitrogen (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter BUN"
              {...register("BUN", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.BUN ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="urineProtein" className="text-[.9rem]">
              Urine Protein (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Urine Protein"
              {...register("urineProtein", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.urineProtein ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="dialysisHours" className="text-[.9rem]">
              Dialysis Hours (hours) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Dialysis Hours"
              {...register("dialysisHours", {
                required: true,
                max: 100,
                min: 0,
              })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.dialysisHours ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="dialysisHours" className="text-[.9rem]">
              Dialysis Frequency <sup className="text-red-500">*</sup>
            </label>

            <Select
              onValueChange={(value: Frequency) => setDialysisFrequency(value)}
              label=""
              dropUp={true}
              options={Object.values(Frequency).map((freq) => ({
                value: freq,
                label: freq,
              }))}
            />
          </div>
        </div>
      </section>

      <Button
        type="submit"
        text="Submit Report"
        variant="filled"
        className="ml-auto"
        loading={isPending}
      />
    </form>
  );
};

export default Nephrology;
