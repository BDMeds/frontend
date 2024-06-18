import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";
import { getSingleAppointment } from "@/lib/services/appointment.service";
import { EventType } from "@/lib/store/event.store";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

type Props = {
  event: EventType;
};

const AppointmentInfoModal: FC<Props> = ({ event }) => {
  const { hideModal } = useModal();

  const { data: appointment, isLoading: appointmentLoading } = useQuery({
    queryKey: ["getAppointment", event.id],
    queryFn: getSingleAppointment(event.id),
  });

  return (
    <Modal
      onClose={hideModal}
      className="bg-white shadow-2xl p-4 rounded-xl xl:min-w-[40rem] min-h-[25rem] max-h-[25rem] overflow-y-auto lg:min-w-[30rem] space-y-4 relative"
    ></Modal>
  );
};

export default AppointmentInfoModal;
