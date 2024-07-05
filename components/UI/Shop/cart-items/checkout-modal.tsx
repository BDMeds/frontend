import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";
import { checkout } from "@/lib/services/medicine.service";
import useCart from "@/lib/store/cart.store";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoBagCheckOutline } from "react-icons/io5";

type Inputs = {
  state: string;
  city: string;
  country: string;
  streetAddress: string;
};

const CheckoutModal = () => {
  const { hideModal } = useModal();

  const { register, handleSubmit } = useForm<Inputs>();

  const { items } = useCart();

  const { mutate, isPending: loading } = useMutation({ mutationFn: checkout, mutationKey: ["order-checkout"] });

  const submit: SubmitHandler<Inputs> = (address) => {
    const payload = {
      orderNotes: "",
      cart: items.map(({ item, qty }) => ({ medicine: item._id, qty })),
      address,
    };

    mutate(payload);
  };

  return (
    <Modal onClose={hideModal} className="bg-white shadow-2xl dark:bg-dark max-w-[30rem] rounded-xl p-4 space-y-4">
      <p className="font-bold text-lg">Fill in Address</p>

      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        <div className="space-y-1">
          <input
            type="text"
            className="dark:bg-[#313131] bg-transparent w-full border dark:border-dark rounded-lg p-2"
            placeholder="State"
            {...register("state", { required: true })}
          />
          <input
            type="text"
            className="dark:bg-[#313131] bg-transparent w-full border dark:border-dark rounded-lg p-2"
            placeholder="City"
            {...register("city", { required: true })}
          />
          <input
            type="text"
            className="dark:bg-[#313131] bg-transparent w-full border dark:border-dark rounded-lg p-2"
            placeholder="Country"
            {...register("country", { required: true })}
          />
          <input
            type="text"
            className="dark:bg-[#313131] bg-transparent w-full border dark:border-dark rounded-lg p-2"
            placeholder="Street Address"
            {...register("streetAddress", { required: true })}
          />
        </div>
        <Button text="Checkout" variant="filled" icon={<IoBagCheckOutline />} fullWidth loading={loading} />
      </form>
    </Modal>
  );
};

export default CheckoutModal;
