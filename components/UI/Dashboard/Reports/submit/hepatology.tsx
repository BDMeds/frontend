import Button from "@/components/Common/Button";
import {
  submitCardiologyReprot,
  submitDentistryReport,
  submitHepatologyReport,
} from "@/lib/services/report.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  consultationNote: string;
  treatmentPlan: string;
  symptoms: string;
  liverHealthStatus: string;
  altLevel: number;
  astLevel: number;
  bilirubin: number;
  fibrosisScore: number;
};

type Props = {
  refetchReport(): void;
};

const Hepatology: FC<Props> = ({ refetchReport }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { id: appointmentId } = useParams<{ id: string }>();

  const { mutateAsync: submitReport, isPending } = useMutation({
    mutationFn: submitHepatologyReport,
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
            <label htmlFor="liverHealthStatus" className="text-[.9rem]">
              Liver Health Status <sup className="text-red-500">*</sup>
            </label>
            <textarea
              placeholder="Enter descriptive liver health status"
              {...register("liverHealthStatus", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.liverHealthStatus ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="altLevel" className="text-[.9rem]">
              ALT Level (U/L) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter ALT Level"
              defaultValue={0}
              {...register("altLevel", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.altLevel ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="astLevel" className="text-[.9rem]">
              AST Level (U/L) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter AST Level"
              defaultValue={0}
              {...register("astLevel", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.astLevel ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="bilirubin" className="text-[.9rem]">
              Billirubin (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Bilirubin"
              {...register("bilirubin", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.bilirubin ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="fibrosisScore" className="text-[.9rem]">
              Fibrosis Score <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Fibrosis Score"
              {...register("fibrosisScore", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.fibrosisScore ? "border-red-500/50" : ""
              }`}
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

export default Hepatology;
