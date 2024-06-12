import { dataMutate } from "@/lib/services/dummy";
import { IPatientRegister } from "@/lib/utils/types";
import { opacityVariant } from "@/lib/utils/variants";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";

const PatientRegister = () => {
  const { register, handleSubmit, reset } = useForm<IPatientRegister>();

  const { mutate, isPending: loading } = useMutation({ mutationFn: dataMutate });

  const submit: SubmitHandler<IPatientRegister> = async (data) => mutate(data);

  return (
    <motion.div {...opacityVariant} className="min-h-screen w-full flex items-center">
      <div className="grid grid-cols-2 items-center gap-8 container">
        <div className="min-h-[40rem] rounded-xl overflow-hidden relative border"></div>

        <div className="px-10 space-y-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold">Create a patient account</h2>
            <p className="text-gray-500">
              As you click <span className="font-semibold">Continue</span>, you agree to our{" "}
              <span className="text-primary border-b">Terms</span> and <span className="text-primary">Conditions</span>
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full bg-transparent p-2 border rounded-lg bg-white"
                      placeholder="Jon"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full bg-transparent p-2 border rounded-lg bg-white"
                      placeholder="Simon"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientRegister;
