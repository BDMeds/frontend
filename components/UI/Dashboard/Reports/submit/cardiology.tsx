import Button from "@/components/Common/Button";
import { submitCardiologyReprot } from "@/lib/services/report.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  consultationNote: string;
  treatmentPlan: string;
  symptoms: string;
  heartHealthStatus: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodOxygenLevel: number;
  cholestrolTotal: number;
  cholestrolLDL: number;
  cholestrolHDL: number;
  ejectionFraction: number;
  cardiacOutput: number;
  bloodGlucoseLevel: number;
};

type Props = {
  refetchReport(): void;
};

const Cardiology: FC<Props> = ({ refetchReport }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { id: appointmentId } = useParams<{ id: string }>();

  const { mutateAsync: submitReport, isPending } = useMutation({
    mutationFn: submitCardiologyReprot,
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
            <label htmlFor="heartHealthStatus" className="text-[.9rem]">
              Heart Health Status <sup className="text-red-500">*</sup>
            </label>
            <textarea
              placeholder="Enter descriptive heart health status"
              {...register("heartHealthStatus", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.heartHealthStatus ? "border-red-500/50" : ""
              } h-[125px] resize-none`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="heartRate" className="text-[.9rem]">
              Heart Rate (bpm) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter HeartRate"
              {...register("heartRate", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.heartRate ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="bloodPressureSystolic" className="text-[.9rem]">
              Blood Pressure Systolic (mmHg) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Blood Pressure Systolic"
              {...register("bloodPressureSystolic", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.bloodPressureSystolic ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="bloodPressureDiastolic" className="text-[.9rem]">
              Blood Pressure Diastolic (mmHg) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Blood Pressure Diastolic"
              {...register("bloodPressureDiastolic", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.bloodPressureDiastolic ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="bloodOxygenLevel" className="text-[.9rem]">
              Blood Oxygen Level (%) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Blood Oxygen Level"
              {...register("bloodOxygenLevel", {
                required: true,
                max: 100,
                min: 0,
              })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.bloodOxygenLevel ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="cholestrolTotal" className="text-[.9rem]">
              Cholestrol Total (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Cholestrol Total"
              {...register("cholestrolTotal", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.cholestrolTotal ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="cholestrolLDL" className="text-[.9rem]">
              Cholestrol LDL (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Cholestrol LDL"
              {...register("cholestrolLDL", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.cholestrolLDL ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="cholestrolHDL" className="text-[.9rem]">
              Cholestrol HDL (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Cholestrol HDL"
              {...register("cholestrolHDL", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.cholestrolHDL ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="ejectionFraction" className="text-[.9rem]">
              Ejection Fraction (%) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Ejection Fraction"
              {...register("ejectionFraction", {
                required: true,
                max: 100,
                min: 0,
              })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.ejectionFraction ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="cardiacOutput" className="text-[.9rem]">
              Cardiac Output (L/min) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Cardiac Output"
              {...register("cardiacOutput", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.cardiacOutput ? "border-red-500/50" : ""
              }`}
            />
          </div>

          <div className="space-y-1 mb-3">
            <label htmlFor="bloodGlucoseLevel" className="text-[.9rem]">
              Blood Glucose Level (mg/dL) <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              placeholder="Enter Blood Glucose Level"
              {...register("bloodGlucoseLevel", { required: true })}
              className={`w-full bg-transparent p-2 border text-[.9rem] rounded-lg bg-white dark:bg-white/10 ${
                errors.bloodGlucoseLevel ? "border-red-500/50" : ""
              }`}
            />
          </div>
        </div>
      </section>

      <Button type="submit" text="Submit Report" variant="filled" className="ml-auto" loading={isPending} />
    </form>
  );
};

export default Cardiology;
