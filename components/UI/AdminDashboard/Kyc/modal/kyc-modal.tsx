import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { queryClient } from "@/lib/providers";
import { useModal } from "@/lib/providers/modal-provider";
import { approveKyc, rejectKyc } from "@/lib/services/doctor.service";
import { KycGet } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";

type Props = KycGet;

const KycModal: FC<Props> = (data) => {
  const { hideModal } = useModal();
  const { idDoc, professionalCert, doctor } = data;

  const { mutate: mutateReject, isPending: rejectPending } = useMutation({
    mutationFn: rejectKyc,
    onSuccess: () => (
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("kyc") }), hideModal()
    ),
  });
  const { mutate: mutateApprove, isPending: approvePending } = useMutation({
    mutationFn: approveKyc,
    onSuccess: () => (
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("kyc") }), hideModal()
    ),
  });

  return (
    <Modal
      onClose={hideModal}
      className="bg-white dark:bg-dark shadow-xl rounded-xl lg:min-w-[40rem] min-h-[20rem] max-h-[40rem] overflow-y-auto p-4"
    >
      <div className="grid place-content-center md:grid-cols-2 divide-x">
        <div className="space-y-4 p-4">
          <p className="font-semibold text-lg">ID Document</p>

          <div className="p-4">
            <Image src={idDoc} alt="image" width={300} height={300} />
          </div>
        </div>
        <div className="space-y-4 p-4">
          <p className="font-semibold text-lg">Professional Certificate</p>

          <div className="p-4">
            <Image src={professionalCert} alt="image" width={300} height={300} />
          </div>
        </div>
      </div>

      <div className="border-t pt-2 flex items-center justify-end gap-4">
        <Button
          text="Reject"
          variant="destructive"
          loading={rejectPending}
          disabled={rejectPending || approvePending}
          onClick={() => mutateReject(doctor._id)}
        />
        <Button
          text="Approve"
          variant="filled"
          loading={approvePending}
          disabled={rejectPending || approvePending}
          onClick={() => mutateApprove(doctor._id)}
        />
      </div>
    </Modal>
  );
};

export default KycModal;
