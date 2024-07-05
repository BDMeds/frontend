"use client";

import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";

const PrescriptionModal = () => {
  const { hideModal } = useModal();

  return (
    <Modal onClose={hideModal} className="bg-white shadow-2xl dark:bg-dark max-w-[30rem] rounded-xl p-4 space-y-4">
      patients prescriptions display
    </Modal>
  );
};

export default PrescriptionModal;
