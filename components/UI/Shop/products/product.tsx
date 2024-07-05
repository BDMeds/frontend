import { useModal } from "@/lib/providers/modal-provider";
import Image from "next/image";
import ProductModal from "./modal/product-modal";
import { Medicine } from "@/lib/types";
import { formatNaira } from "@/lib/helpers/numbers";

const Product = (data: Medicine) => {
  const { showModal } = useModal();

  return (
    <div
      className="p-2 border dark:border-transparent cursor-pointer hover:shadow-2xl rounded-lg dark:hover:rounded-b-none duration-300 relative m-over overflow-hidden"
      onClick={() => showModal(<ProductModal {...data} />)}
    >
      <div className="relative min-h-[14rem]">
        <Image
          src={data.image}
          alt={"image"}
          width={400}
          height={400}
          className="absolute top-0 left-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div className="text-sm">
        <p>{data.name}</p>
        <p className="font-semibold">{formatNaira(data.price)}</p>
      </div>
    </div>
  );
};

export default Product;
