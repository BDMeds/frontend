import Button from "@/components/Common/Button";
import { useModal } from "@/lib/providers/modal-provider";
import KycModal from "../modal/kyc-modal";
import { Kyc } from "@/lib/utils/types";
import { FC } from "react";

type Props = Kyc;

const ViewKycButton: FC<Props> = (kyc) => {
  const { showModal } = useModal();

  return (
    <Button
      text="View"
      variant="filled"
      onClick={() => showModal(<KycModal />)}
      className="group-hover:opacity-100 opacity-0"
    />
  );
};

export default ViewKycButton;
