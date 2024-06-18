import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { format, parse } from "date-fns";
import { useAppointment } from "@/lib/store/event.store";
import { toastError } from "@/lib/utils/toast";
import { useQuery } from "@tanstack/react-query";
import Select from "@/components/Common/Inputs/select";
import { departments } from "@/lib/data/dashboard";
import { opacityVariant } from "@/lib/utils/variants";
import { motion, AnimatePresence } from "framer-motion";
import { getDoctors } from "@/lib/services/user.service";
import { Department } from "@/lib/types";

type Inputs = {
  appointmentDate: string;
  startTime: string;
  endTime: string;
};

function toISOString(date: string, time: string) {
  const dateTimeString = `${date}T${time}:00`;
  const parsedDate = parse(dateTimeString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
}

const AppointmentModal = () => {
  const { hideModal } = useModal();

  const [infoComplete, setInfoComplete] = useState(false);
  const [mode, setMode] = useState<"online" | "physical">("online");

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>();

  const { update: updateAppointment } = useAppointment();

  // specialization
  const [department, setDepartment] = useState<Department>("Cardiology (Heart)");

  const [search, setSearch] = useState("");

  const {
    data: doctor,
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["doctors", department],
    queryFn: () => getDoctors({ department, search }),
    enabled: Boolean(department),
  });

  useEffect(() => {
    refetch();
  }, [department]);

  const updateDepartment = (value: Department) => setDepartment(value);

  const submit: SubmitHandler<Inputs> = (data) => {
    if (!data.appointmentDate || !data.endTime || !data.startTime) {
      toastError("Invalid data");
      return;
    }

    const appointmentDate = new Date(data.appointmentDate).toISOString();
    const startTime = toISOString(data.appointmentDate, data.startTime);
    const endTime = toISOString(data.appointmentDate, data.endTime);

    updateAppointment({
      appointmentDate,
      startTime,
      endTime,
      mode,
    });
    setInfoComplete(true);
  };

  return (
    <Modal
      onClose={hideModal}
      isAutomatic={false}
      className="bg-white shadow-2xl p-4 rounded-xl xl:min-w-[40rem] min-h-[30rem] max-h-[40rem] overflow-y-auto lg:min-w-[30rem] space-y-4"
    >
      <>
        <div className="flex items-center justify-between">
          <p className="font-bold">{infoComplete ? "Select Doctor" : "New Appointment"}</p>

          <div className="flex items-center gap-2">
            {infoComplete && (
              <button className="text-primary" onClick={() => setInfoComplete(false)}>
                Back
              </button>
            )}
            <button className="text-red-500" onClick={hideModal}>
              Cancel
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {!infoComplete ? (
            <>
              <motion.form {...opacityVariant} onSubmit={handleSubmit(submit)} className="grid gap-4">
                <div className="space-y-1">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    {...register("appointmentDate", { required: true })}
                    className="w-full border rounded-xl p-2"
                  />
                </div>
                <div className="space-y-1">
                  <label>Start Time</label>
                  <input
                    type="time"
                    {...register("startTime", { required: true })}
                    className="w-full border rounded-xl p-2"
                  />
                </div>
                <div className="space-y-1">
                  <label>End Time</label>
                  <input
                    type="time"
                    {...register("endTime", { required: true })}
                    className="w-full border rounded-xl p-2"
                  />
                </div>

                <div className="space-y-1">
                  <p>Type</p>
                  <div className="grid grid-cols-2 gap-3">
                    {["online", "physical"].map((m, id) => (
                      <div
                        key={id}
                        onClick={() => setMode(m as "physical" | "online")}
                        className={`p-2 text-center capitalize rounded-lg flex items-center gap-2 duration-300 cursor-pointer ${
                          m === mode ? "bg-primary text-white" : "bg-white border border-gray-200"
                        }`}
                      >
                        <p>{m}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button text="Continue" fullWidth disabled={!isValid} />
              </motion.form>
            </>
          ) : (
            <motion.div {...opacityVariant} className="space-y-1">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-semibold">Search</p>
                  <input
                    type="text"
                    className="w-full border-b p-2"
                    placeholder="search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Select
                    label="Department"
                    onValueChange={updateDepartment}
                    options={departments?.map((dep) => ({ value: dep.dept, label: dep.dept })) ?? []}
                    placeholder="Select specialization"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </Modal>
  );
};

export default AppointmentModal;
