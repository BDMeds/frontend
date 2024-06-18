import Button from "@/components/Common/Button";
import {
  submitCardiologyReprot,
  submitDentistryReport,
  submitHepatologyReport,
  submitNeurologyReport,
} from "@/lib/services/report.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  consultationNote: string;
  treatmentPlan: string;
  symptoms: string;
  brainHealthStatus: string;
  eegResults: number;
  lowerCognitiveFunctionTestScore: number;
  upperCognitiveFunctionTestScore: number;
};

type Props = {
  refetchReport(): void;
};

const Neurology: FC<Props> = ({ refetchReport }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { id: appointmentId } = useParams<{ id: string }>();

  const { mutateAsync: submitReport } = useMutation({
    mutationFn: submitNeurologyReport,
    onSuccess: () => {
      refetchReport();
    },
  });

  const onSubmit = async (input: Inputs) => {
    await submitReport({
      report: {
        ...input,
        congnitiveFunctionTestScore: {
          lower: input.lowerCognitiveFunctionTestScore,
          upper: input.upperCognitiveFunctionTestScore,
        },
      },
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
            <label htmlFor="brainHealthStatus" className="text-[.9rem]">
              Brain Health Status <sup className="text-red-500">*</sup>
            </label>
            <textarea
              placeholder="Enter descriptive brain health status"
              {...register("brainHealthStatus", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.brainHealthStatus ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="eegResults" className="text-[.9rem]">
              EEG Results (Hz) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter EEG Results"
              defaultValue={0}
              {...register("eegResults", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.eegResults ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="astLevel" className="text-[.9rem]">
              Lower Congnitive Function Score{" "}
              <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Lower Cognitive Function Test Score"
              defaultValue={0}
              {...register("lowerCognitiveFunctionTestScore", {
                required: true,
              })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.lowerCognitiveFunctionTestScore
                  ? "border-red-500/50"
                  : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="astLevel" className="text-[.9rem]">
              Upper Congnitive Function Score{" "}
              <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Upper Cognitive Function Test Score"
              defaultValue={0}
              {...register("upperCognitiveFunctionTestScore", {
                required: true,
              })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white ${
                errors.upperCognitiveFunctionTestScore
                  ? "border-red-500/50"
                  : ""
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
      />
    </form>
  );
};

export default Neurology;
