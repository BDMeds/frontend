import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { queryClient } from "@/lib/providers";
import { useModal } from "@/lib/providers/modal-provider";
import { addDoctorSocials } from "@/lib/services/doctor.service";
import { Socials } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";

const AddSocialModal = () => {
  const { hideModal } = useModal();

  const { register, handleSubmit } = useForm<Socials>();

  const { mutate, isPending: loading } = useMutation({ mutationFn: addDoctorSocials });

  const submit: SubmitHandler<Socials> = async (data) =>
    mutate(data, {
      onSuccess: () => (
        queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("doctor") }), hideModal()
      ),
    });

  return (
    <Modal onClose={hideModal} className="p-5 bg-white space-y-5 shadow-xl rounded-xl">
      <p className="font-bold text-xl">Socials</p>

      <form onSubmit={handleSubmit(submit)}>
        <div className="grid gap-4">
          <div className="space-y-1">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              className="w-full bg-transparent p-2 border rounded-lg bg-white"
              placeholder="https://www.facebook.com/..."
              {...register("facebook", { required: true })}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="linkedin">Linkedin</label>
            <input
              type="text"
              {...register("linkedin", { required: true })}
              className="w-full bg-transparent p-2 border rounded-lg bg-white"
              placeholder="linkedin.com/in/..."
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
              type="text"
              {...register("whatsapp", { required: true })}
              className="w-full bg-transparent p-2 border rounded-lg bg-white"
              placeholder="+234..., or +1... etc"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="twitter">X (fka Twitter)</label>
            <input
              type="text"
              {...register("twitter", { required: true })}
              className="w-full bg-transparent p-2 border rounded-lg bg-white"
              placeholder="https://x.com/..."
            />
          </div>

          <Button loading={loading} fullWidth variant="filled" text="Save" icon={<FaRegSave />} />
        </div>
      </form>
    </Modal>
  );
};

export default AddSocialModal;
