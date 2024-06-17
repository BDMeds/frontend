import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";

const AppointmentModal = () => {
  const { hideModal } = useModal();

  return <Modal onClose={hideModal} className="bg-white shadow-2xl p-20 rounded-xl min-w-[30rem]"></Modal>;
};

export default AppointmentModal;
