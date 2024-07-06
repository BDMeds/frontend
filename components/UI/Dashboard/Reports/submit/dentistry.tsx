import Button from "@/components/Common/Button";
import { submitCardiologyReprot, submitDentistryReport } from "@/lib/services/report.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  consultationNote: string;
  treatmentPlan: string;
  symptoms: string;
  dentalHealthStatus: string;
  cavitiesCount: number;
  gumRecession: number;
  plaqueIndex: number;
  recentProcedures: string;
  prescription: {
    prescriptionNote: string;
    medicines: string[];
  };
};

type Props = {
  refetchReport(): void;
};

const Dentistry: FC<Props> = ({ refetchReport }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { id: appointmentId } = useParams<{ id: string }>();

  const { mutateAsync: submitReport, isPending } = useMutation({
    mutationFn: submitDentistryReport,
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
        <hr className="border-y-[1.2px] dark:border-white/10" />

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
        <hr className="border-y-[1.2px] dark:border-white/10" />

        <div className="grid grid-cols-2 lg:grid-cols-3 mt-3 gap-x-3">
          <div className="space-y-1 mb-3 col-span-2 lg:col-span-3">
            <label htmlFor="dentalHealthStatus" className="text-[.9rem]">
              Teeth Health Status <sup className="text-red-500">*</sup>
            </label>
            <textarea
              placeholder="Enter descriptive teeth health status"
              {...register("dentalHealthStatus", { required: true })}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.dentalHealthStatus ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3 col-span-2 lg:col-span-3">
            <label htmlFor="recentProcedures" className="text-[.9rem]">
              Procedures Description
            </label>
            <textarea
              placeholder="Enter descriptive procedures description"
              {...register("recentProcedures")}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.recentProcedures ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="cavitiesCount" className="text-[.9rem]">
              Cavities Count <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Cavities Count"
              defaultValue={0}
              {...register("cavitiesCount", { required: true })}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.cavitiesCount ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="gumRecession" className="text-[.9rem]">
              Gum Recession (mm) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Gum Recession"
              {...register("gumRecession", { required: true })}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.gumRecession ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="plaqueIndex" className="text-[.9rem]">
              Plaque Index (mmHg) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Plaque Index"
              {...register("plaqueIndex", { required: true })}
              className={`w-full bg-transparent p-2 border dark:border-white/10 text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.plaqueIndex ? "border-red-500/50" : ""
              }`}
            />
          </div>
        </div>
      </section>

      <Button type="submit" text="Submit Report" variant="filled" className="ml-auto" loading={isPending} />
    </form>
  );
};

export default Dentistry;
