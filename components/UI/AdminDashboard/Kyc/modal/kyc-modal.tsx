import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";

const KycModal = () => {
  const { hideModal } = useModal();

  return (
    <Modal onClose={hideModal} className="bg-white shadow-xl rounded-xl min-h-[20rem] grid place-content-center">
      <p>kyc details</p>
    </Modal>
  );
};

export default KycModal;
