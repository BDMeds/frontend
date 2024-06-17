import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { usePatientInfo } from "@/lib/hooks/useUserInfo";
import { queryClient } from "@/lib/providers";
import { useModal } from "@/lib/providers/modal-provider";
import { updatePatient } from "@/lib/services/patient.service";
import { IPatient, IUser } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const UserEditModal = () => {
  const { hideModal } = useModal();

  const { register, handleSubmit, reset } = useForm<IPatient>();

  const { mutate, isPending: updating } = useMutation({ mutationFn: updatePatient });

  const submit: SubmitHandler<IPatient> = async (data) => {
    const { user } = data;

    const { email, gender, _id } = user;

    mutate(
      { user },
      {
        onSuccess: () => (queryClient.invalidateQueries({ queryKey: ["user", "info"] }), hideModal()),
      }
    );
  };

  const { patient, loading } = usePatientInfo();

  useEffect(() => {
    if (patient) reset(patient);
  }, [loading]);

  return (
    <Modal onClose={hideModal} className="bg-white shadow-lg rounded-lg">
      <div className="p-4 space-y-5">
        <p className="text-xl font-semibold">Edit User</p>
        <form onSubmit={handleSubmit(submit)}>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="Jon"
                  {...register("user.firstName", { required: true })}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  {...register("user.lastName", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="Simon"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  {...register("user.email", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="jonsimon@domain.com"
                  disabled
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  {...register("user.phoneNumber", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="+234..."
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <p>Gender</p>

                <input
                  type="text"
                  {...register("user.gender", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg capitalize bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  disabled
                />
              </div>
            </div>
            <Button variant="filled" fullWidth text="Update" loading={updating} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserEditModal;
