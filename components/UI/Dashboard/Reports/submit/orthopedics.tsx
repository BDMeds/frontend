import Button from "@/components/Common/Button";
import {
  submitCardiologyReprot,
  submitDentistryReport,
  submitHepatologyReport,
  submitOrthopedicReport,
} from "@/lib/services/report.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  consultationNote: string;
  treatmentPlan: string;
  symptoms: string;
  boneHealthStatus: string;
  rangeOfMotion: number;
  totalFractures: number;
};

type Props = {
  refetchReport(): void;
};

const Orthopedic: FC<Props> = ({ refetchReport }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { id: appointmentId } = useParams<{ id: string }>();

  const { mutateAsync: submitReport, isPending } = useMutation({
    mutationFn: submitOrthopedicReport,
    onSuccess: () => {
      refetchReport();
    },
  });

  const onSubmit = async (input: Inputs) => {
    await submitReport({ report: input, appointmentId });
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
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
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
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
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
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
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
            <label htmlFor="boneHealthStatus" className="text-[.9rem]">
              Bone Health Status <sup className="text-red-500">*</sup>
            </label>
            <textarea
              placeholder="Enter descriptive bone health status"
              {...register("boneHealthStatus", { required: true })}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.boneHealthStatus ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="rangeOfMotion" className="text-[.9rem]">
              Range Of Motion (°) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Range Of Motion"
              defaultValue={0}
              {...register("rangeOfMotion", {
                required: true,
                min: 0,
                max: 360,
              })}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.rangeOfMotion ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="totalFractures" className="text-[.9rem]">
              Total Fractures <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Total Fractures"
              defaultValue={0}
              {...register("totalFractures", { required: false })}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.totalFractures ? "border-red-500/50" : ""
              }`}
            />
          </div>
        </div>
      </section>

      <Button type="submit" text="Submit Report" variant="filled" className="ml-auto" loading={isPending} />
    </form>
  );
};

export default Orthopedic;
