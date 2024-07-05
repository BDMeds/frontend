"use client";

import { getSingleMedicine } from "@/lib/services/medicine.service";
import useCart from "@/lib/store/cart.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CartItemSkeleton from "./skeleton";
import { formatNaira } from "@/lib/helpers/numbers";
import { FaMinus, FaPlus } from "react-icons/fa";
import { PiTrashThin } from "react-icons/pi";
import Button from "@/components/Common/Button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { useModal } from "@/lib/providers/modal-provider";
import CheckoutModal from "./checkout-modal";
import ProductModal from "../products/modal/product-modal";
import useUserInfo from "@/lib/hooks/useUserInfo";

const Cart = () => {
  const { items } = useCart();
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const calculateTotal = () => items.reduce((total, { item, qty }) => total + item.price * qty, 0);

  const calcT = useCallback(calculateTotal, [items]);

  useEffect(() => {
    setTotal(calcT());
  }, [calcT]);

  const { showModal } = useModal();

  const checkout = () => showModal(<CheckoutModal />);

  return (
    <div className="container mt-4 space-y-5">
      <h1 className="font-bold uppercase text-xl">
        Cart <span className="text-primary">({items.length})</span>
      </h1>

      {items && items.length > 0 ? (
        <>
          <div className="sm:grid grid-cols-7 gap-4 space-y-4 sm:space-y-0">
            <div className="space-y-2 bg-white dark:bg-dark col-span-5 divide-y dark:divide-white/10 p-4 border dark:border-white/10 rounded-lg">
              {items.map(({ item, qty }, id) => (
                <Item id={item._id} qty={qty} key={id} />
              ))}
            </div>

            <div className="col-span-2 self-start p-4 border dark:border-white/10 rounded-lg bg-white dark:bg-dark ">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p>Total:</p>
                  <p className="font-bold text-xl">{formatNaira(total)}</p>
                </div>

                <Button
                  text="Checkout"
                  variant="filled"
                  icon={<IoBagCheckOutline />}
                  fullWidth
                  onClick={checkout}
                  disabled={!total}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <p>No products added to cart</p>
          <Button onClick={() => router.push("/shop")} text="Continue Shopping" variant="filled" />
        </div>
      )}
    </div>
  );
};

const Item = ({ id, qty }: { id: string; qty: number }) => {
  const { data, isPending: loading } = useQuery({ queryFn: () => getSingleMedicine(id), queryKey: ["medicines", id] });

  const { removeItem } = useCart();

  const { showModal } = useModal();

  useEffect(() => {
    if (!loading && !data) {
      removeItem(id);
    }
  }, [loading, data]);

  return (
    <div className="p-3 flex justify-between">
      {loading ? (
        <CartItemSkeleton />
      ) : (
        <>
          {data ? (
            <>
              <div className="flex gap-3">
                <div className="space-y-1">
                  <div
                    className="size-20 relative overflow-hidden border dark:border-white/10 rounded-lg cursor-pointer"
                    onClick={() => showModal(<ProductModal {...data} />)}
                  >
                    <Image
                      src={data.image}
                      alt={"image"}
                      width={400}
                      height={400}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <button onClick={() => removeItem(id)} className="text-red-500 text-sm flex items-center gap-2">
                    <span>Remove</span>
                    <PiTrashThin />
                  </button>
                </div>
                <p>{data.name}</p>
              </div>

              <div className="space-y-1 flex flex-col items-end">
                <p className="font-bold text-lg">{formatNaira(data.price)}</p>

                <div className="flex items-center select-none gap-3">
                  <button
                    className="size-8 grid place-content-center border cursor-pointer duration-300 disabled:opacity-50 rounded dark:border-white/10 bg-primary text-white"
                    // onClick={decrement}
                    disabled={qty === 0}
                  >
                    <FaMinus />
                  </button>

                  <p>{qty}</p>

                  <button
                    className="size-8 grid place-content-center border cursor-pointer duration-300 disabled:opacity-50 rounded dark:border-white/10 bg-primary text-white"
                    // onClick={increment}
                    disabled={qty === data.stock}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="opacity-70">Product not found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
