"use client";

import Button from "@/components/Common/Button";
import Loader from "@/components/Common/Loaders";
import Modal from "@/components/Common/Modal";
import { formatNaira } from "@/lib/helpers/numbers";
import { useModal } from "@/lib/providers/modal-provider";
import { checkout, getMedicines } from "@/lib/services/medicine.service";
import { toastError } from "@/lib/utils/toast";
import { opacityVariant } from "@/lib/utils/variants";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";

type Inputs = {
  state: string;
  city: string;
  country: string;
  streetAddress: string;
};

const PrescriptionModal = () => {
  const { hideModal } = useModal();
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const { data: medicines, isPending: medicinesLoading } = useQuery({ queryFn: getMedicines, queryKey: ["medicines"] });

  const calculateTotal = () => medicines?.reduce((total, { price }) => total + price, 0);

  const calcT = useCallback(calculateTotal, []);

  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    const val = calcT();
    if (medicines && !medicinesLoading && val) setTotal(val);
  }, [calcT, medicines, medicinesLoading]);

  const submit: SubmitHandler<Inputs> = async (address) => {
    if (!medicines) {
      toastError("No product found.");
      return;
    }

    const payload = {
      orderNotes: "",
      cart: medicines.map(({ price, _id }) => ({ medicine: _id, qty: "1" })),
      address,
    };

    setLoading(true);
    try {
      const checkoutUrl = await checkout(payload);

      if (!checkoutUrl) {
        toastError("An error occurred, please try again later.");
        throw new Error("An error occurred, please try again later.");
      }

      window.location.href = checkoutUrl;
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
      hideModal();
    }
  };

  return (
    <Modal
      onClose={hideModal}
      className="bg-white shadow-2xl dark:bg-dark max-w-[50rem] min-h-[30rem] rounded-xl p-4 space-y-4"
    >
      <div>
        {medicinesLoading ? (
          <div className="w-full h-full grid place-content-center">
            <Loader />
          </div>
        ) : (
          <>
            {medicines ? (
              <div className="space-y-4 p-4">
                <p className="font-bold text-xl">Prescriptions</p>
                <div className="grid grid-cols-2 divide-x dark:divide-white/10">
                  <div className="pr-4">
                    <p className="font-medium whitespace-pre-line">
                      {`This is a prescription for the following medicines
And make sure to keep away from children and store in a cool dry place.`}
                    </p>
                  </div>
                  <div className="pl-4">
                    <AnimatePresence mode="wait" initial={false}>
                      {!showAdd ? (
                        <motion.div {...opacityVariant} className="divide-y dark:divide-white/10">
                          {medicines.map((medicine) => (
                            <div key={medicine._id} className="py-2 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="size-10 rounded-full overflow-hidden relative">
                                  <Image
                                    src={medicine.image}
                                    alt={medicine.name}
                                    width={100}
                                    height={100}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                  />
                                </div>

                                <p className="text-sm">{medicine.name}</p>
                              </div>

                              <div className="font-medium">{formatNaira(medicine.price)}</div>
                            </div>
                          ))}

                          <Button
                            text={`Proceed`}
                            icon={<CiLocationArrow1 />}
                            variant="filled"
                            fullWidth
                            className="mt-4"
                            onClick={() => setShowAdd(true)}
                          />
                        </motion.div>
                      ) : (
                        <div {...opacityVariant} className="space-y-4 dark:divide-white/10">
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
                            <Button
                              text="Checkout"
                              variant="filled"
                              icon={<IoBagCheckOutline />}
                              fullWidth
                              loading={loading}
                            />
                          </form>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ) : (
              <>no product found.</>
            )}
          </>
        )}
      </div>
    </Modal>
  );
  {
    /* <Button text={`Pay ${formatNaira(total)}`} variant="filled" fullWidth className="mt-4" /> */
  }
};

export default PrescriptionModal;
