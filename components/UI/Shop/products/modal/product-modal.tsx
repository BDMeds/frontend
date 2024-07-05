import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";
import { Medicine } from "@/lib/types";
import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";
import useCart from "@/lib/store/cart.store";
import { formatNaira } from "@/lib/helpers/numbers";
import { ImImage } from "react-icons/im";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "@/components/Common/Button";

const ProductModal = (medicine: Medicine) => {
  const { image, name, price, description, stock: mStock } = medicine;
  const stock = Number(mStock);

  const { hideModal } = useModal();

  const { addItem, items } = useCart();

  const [qty, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(items.find((i) => i.item._id === medicine._id));

  const increment = () => setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : prev));

  const add = () => {
    addItem({
      item: medicine,
      qty,
    });
  };

  useEffect(() => {
    setInCart(items.find((i) => i.item._id === medicine._id));
  }, [items]);

  return (
    <Modal
      onClose={hideModal}
      className="shadow-2xl bg-white dark:bg-dark p-4 rounded-xl xl:min-w-[45rem] min-h-[30rem] max-h-[40rem] overflow-y-auto lg:min-w-[30rem] max-w-[50rem] space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="md:min-h-[14rem] min-h-[18rem] relative overflow-hidden">
            <Image
              src={image}
              alt={name}
              width={600}
              height={600}
              className="object-cover absolute top-0 left-0 w-full h-full"
            />
          </div>

          <div className="flex items-center gap-3 whitespace-nowrap overflow-x-auto hide-scroll">
            {Array.from({ length: 6 }).map((_, id) => (
              <div
                key={id}
                className="border flex-shrink-0 dark:border-white/10 rounded-md grid place-content-center size-12"
              >
                <ImImage className="opacity-50" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="uppercase text-sm">Share this product</p>
            <div className="flex items-center gap-2">
              <FaXTwitter size={20} />
              <FaFacebook size={20} className="text-blue-500" />
            </div>
          </div>
        </div>

        <div className="space-y-3 divide-y">
          <div className="flex gap-4 justify-between py-3 items-center">
            <p className="text-lg">{name}</p>
            <IoHeartOutline className="cursor-pointer" />
          </div>

          <div className="py-3 space-y-1">
            <p className="text-3xl font-bold">{formatNaira(price)}</p>
            <p className="whitespace-pre-line">{description}</p>
          </div>

          <div className="space-y-1 py-3">
            <div className="flex items-center select-none justify-between">
              <button
                className="size-10 grid place-content-center border cursor-pointer duration-300 disabled:opacity-50 rounded-xl dark:border-white/10 bg-primary text-white"
                onClick={decrement}
                disabled={qty === 0}
              >
                <FaMinus />
              </button>

              <p>{qty}</p>

              <button
                className="size-10 grid place-content-center border cursor-pointer duration-300 disabled:opacity-50 rounded-xl dark:border-white/10 bg-primary text-white"
                onClick={increment}
                disabled={qty === stock}
              >
                <FaPlus />
              </button>
            </div>

            <Button
              variant="filled"
              text={`${inCart ? "Added to cart" : "Add to cart"}`}
              fullWidth
              className="text-white"
              onClick={add}
              disabled={inCart || qty === 0 ? true : false}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
