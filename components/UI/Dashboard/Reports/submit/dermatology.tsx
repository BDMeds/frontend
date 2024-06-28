import Button from "@/components/Common/Button";
import { submitCardiologyReprot, submitDermatologyReport } from "@/lib/services/report.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  consultationNote: string;
  treatmentPlan: string;
  symptoms: string;
  skinHealthStatus: string;
  lesionSize: number;
  lesionCount: number;
  biopsyResults: string;
};

type Props = {
  refetchReport(): void;
};

const Dermatology: FC<Props> = ({ refetchReport }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { id: appointmentId } = useParams<{ id: string }>();

  const { mutateAsync: submitReport, isPending } = useMutation({
    mutationFn: submitDermatologyReport,
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
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
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
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
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
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
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
            <label htmlFor="skinHealthStatus" className="text-[.9rem]">
              Skin Health Status <sup className="text-red-500">*</sup>
            </label>
            <textarea
              placeholder="Enter descriptive teeth health status"
              {...register("skinHealthStatus", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.skinHealthStatus ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3 col-span-2 lg:col-span-3">
            <label htmlFor="biopsyResults" className="text-[.9rem]">
              Biopsy Results
            </label>
            <textarea
              placeholder="Enter descriptive procedures description"
              {...register("biopsyResults")}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.biopsyResults ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="lesionCount" className="text-[.9rem]">
              Lesion Count <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Lesion Count"
              defaultValue={0}
              {...register("lesionCount", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.lesionCount ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="lesionSize" className="text-[.9rem]">
              Lesion Size (mm) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Lesion Size"
              defaultValue={0}
              {...register("lesionSize", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.lesionSize ? "border-red-500/50" : ""
              }`}
            />
          </div>
        </div>
      </section>

      <Button type="submit" text="Submit Report" variant="filled" className="ml-auto" loading={isPending} />
    </form>
  );
};

export default Dermatology;
