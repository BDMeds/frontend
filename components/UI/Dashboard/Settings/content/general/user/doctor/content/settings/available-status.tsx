import Switch from "@/components/Common/Inputs/switch";
import { queryClient } from "@/lib/providers";
import { updateDoctor } from "@/lib/services/doctor.service";
import { IDoctor } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

const AvailableStatus = ({ doctor }: { doctor?: IDoctor }) => {
  const { mutate, isPending: updating } = useMutation({
    mutationFn: updateDoctor,
    mutationKey: ["doctor", "update", "isAvailable"],
  });

  const update = () =>
    mutate(
      { isAvailable: !doctor?.isAvailable },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctor", "info"] }) }
    );

  return (
    <div className="border dark:border-white/10 rounded-xl p-4 flex items-center justify-between">
      <p>Available Status</p>

      {doctor && <Switch checked={doctor.isAvailable} onClick={update} loading={updating} />}
    </div>
  );
};

export default AvailableStatus;
