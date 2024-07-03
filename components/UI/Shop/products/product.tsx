import { useModal } from "@/lib/providers/modal-provider";
import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";
import ProductModal from "./modal/product-modal";
import useCart from "@/lib/store/cart.store";

const Product = ({ id }: { id: number }) => {
  const { showModal } = useModal();

  const { changeCount } = useCart();

  return (
    <div className="p-10 border dark:border-transparent min-h-[18rem] rounded-lg dark:hover:rounded-b-none duration-300 relative m-over overflow-hidden">
      <Image
        src={`/images/medicines/prod${((id + 1) % 4) + 1}.jpg`}
        alt={"image"}
        width={400}
        height={400}
        className="absolute top-0 left-0 w-full h-full object-cover"
        draggable={false}
      />

      <div
        className="absolute top-0 left-0 w-full h-full hover:opacity-100 opacity-0 group duration-300 bg-gradient-to-t from-black/70 dark:from-black"
        onClick={() => showModal(<ProductModal />)}
      >
        <div className="w-full h-full flex items-end">
          <div className="flex items-center gap-2 w-full p-4 translate-y-full group-hover:translate-y-0 duration-300 text-white">
            <button
              className="font-bold flex-grow py-[6px] bg-primary shadow-xl rounded-2xl"
              onClick={(e) => (e.stopPropagation(), changeCount("i"), showModal(<ProductModal />))}
            >
              View
            </button>
            <div className="cursor-pointer">
              <IoHeartOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
