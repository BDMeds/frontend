import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";
import { KycGet } from "@/lib/types";
import Image from "next/image";
import { FC } from "react";

type Props = KycGet;

const KycModal: FC<Props> = (data) => {
  const { hideModal } = useModal();
  const { idDoc, professionalCert } = data;

  return (
    <Modal onClose={hideModal} className="bg-white shadow-xl rounded-xl lg:min-w-[40rem] min-h-[20rem] p-4">
      <div className="grid place-content-center md:grid-cols-2 divide-x">
        <div className="space-y-4 p-4">
          <p className="font-semibold text-lg">ID Document</p>

          <div className="p-4">
            <Image src={idDoc} alt="image" width={400} height={400} />
          </div>
        </div>
        <div className="space-y-4 p-4">
          <p className="font-semibold text-lg">Professional Certificate</p>

          <div className="p-4">
            <Image src={professionalCert} alt="image" width={400} height={400} />
          </div>
        </div>
      </div>

      <div className="border-t pt-2 flex items-center justify-end gap-4">
        <Button text="Reject" variant="destructive" />
        <Button text="Approve" variant="filled" />
      </div>
    </Modal>
  );
};

export default KycModal;
