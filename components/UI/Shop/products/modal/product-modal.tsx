import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";

const ProductModal = () => {
  const { hideModal } = useModal();

  return (
    <Modal
      onClose={hideModal}
      className="shadow-2xl bg-white dark:bg-[#282828] p-4 rounded-xl xl:min-w-[40rem] min-h-[30rem] max-h-[40rem] overflow-y-auto lg:min-w-[30rem] grid place-content-center"
    >
      <p>nothing for now</p>
    </Modal>
  );
};

export default ProductModal;
