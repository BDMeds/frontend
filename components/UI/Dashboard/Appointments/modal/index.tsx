import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatISO, parseISO } from "date-fns";
import { useAppointment } from "@/lib/store/event.store";
import { toastError } from "@/lib/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import Select from "@/components/Common/Inputs/select";
import { departments } from "@/lib/data/dashboard";
import { opacityVariant } from "@/lib/utils/variants";
import { motion, AnimatePresence } from "framer-motion";
import { Department } from "@/lib/types";
import Loader from "@/components/Common/Loaders";
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { queryClient } from "@/lib/providers";
import { FaRegPaperPlane } from "react-icons/fa";
import { bookAppointment } from "@/lib/services/appointment.service";
import { getDoctors } from "@/lib/services/user.service";

type Inputs = {
  appointmentDate: string;
  startTime: string;
  endTime: string;
};

function combineDateAndTime(dateString: string, timeString: string) {
  return new Date(`${dateString}T${timeString}:00`);
}

let searchTime = 0;

const AppointmentModal = () => {
  const { hideModal } = useModal();

  const [infoComplete, setInfoComplete] = useState(false);
  const [mode, setMode] = useState<"online" | "physical">("online");

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>();

  const { update: updateAppointment, appointment } = useAppointment();

  // specialization
  const [department, setDepartment] = useState<Department>("Cardiology (Heart)");

  const [search, setSearch] = useState("");

  const [doctorId, setDoctorId] = useState("");

  const {
    data: doctors,
    isPending: loading,
    isFetching,
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

  useEffect(() => {
    setTimeout(() => {
      searchTime += 1;
      if (searchTime === 1) {
        refetch();
      }
      searchTime = 0;
    }, 1000);
  }, [search]);

  const submit: SubmitHandler<Inputs> = (data) => {
    if (!data.appointmentDate || !data.endTime || !data.startTime) {
      toastError("Invalid data");
      return;
    }

    const appointmentDate = data.appointmentDate;
    const startTime = data.startTime;
    const endTime = data.endTime;

    const startDateTime = combineDateAndTime(appointmentDate, startTime);
    const endDateTime = combineDateAndTime(appointmentDate, endTime);

    const appointmentDateISO = formatISO(parseISO(appointmentDate));

    updateAppointment({
      appointmentDate: appointmentDateISO,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      mode,
    });
    setInfoComplete(true);
  };

  const { mutate, isPending: booking } = useMutation({
    mutationFn: bookAppointment,
  });

  const bookIt = () => {
    mutate(
      { payload: appointment, doctorId },
      {
        onSuccess: () => (
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes("appointments"),
          }),
          hideModal()
        ),
      }
    );
  };

  return (
    <Modal
      onClose={hideModal}
      isAutomatic={false}
      className="bg-white shadow-2xl p-4 rounded-xl xl:min-w-[40rem] min-h-[30rem] max-h-[40rem] overflow-y-auto lg:min-w-[30rem] space-y-4 relative"
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
            <motion.div {...opacityVariant} className="space-y-4">
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
                    data={
                      departments.find((dep) => dep.dept === department)
                        ? { value: department, label: department }
                        : undefined
                    }
                    label="Department"
                    onValueChange={updateDepartment}
                    options={
                      departments?.map((dep) => ({
                        value: dep.dept,
                        label: dep.dept,
                      })) ?? []
                    }
                    placeholder="Select department"
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <div className="min-h-[10rem] grid place-content-center">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {isFetching && <p className="absolute bottom-1 right-1 text-sm">fetching...</p>}

                    {doctors && doctors.length > 0 ? (
                      <div className="space-y-4">
                        <div className="divide-y">
                          {doctors.map((doc, id) => (
                            <div key={id} className="py-1 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="size-10 border rounded-full relative overflow-hidden">
                                  <Image
                                    src={doc.user.profilePicture}
                                    alt="profile image"
                                    width={100}
                                    height={100}
                                    className="absolute top-0 left-0 w-full h-full"
                                  />
                                </div>
                                <div className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <p>
                                      {doc.user.firstName} {doc.user.lastName}
                                    </p>
                                    {doc.kycDetails?.status === "successful" && (
                                      <RiVerifiedBadgeFill className="text-[#1c96e8]" />
                                    )}
                                  </div>
                                  <p className="truncate text-gray-500 max-w-[8rem]">{doc.bio}</p>
                                </div>
                              </div>

                              <Button
                                size="extra-small"
                                text={`${doc._id === doctorId ? "Selected" : "Select"} `}
                                onClick={() => setDoctorId(doc._id)}
                              />
                            </div>
                          ))}
                        </div>

                        <AnimatePresence mode="wait">
                          {doctorId && (
                            <Button
                              variant="filled"
                              text="Book"
                              icon={<FaRegPaperPlane />}
                              onClick={bookIt}
                              loading={booking}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="min-h-[10rem] grid place-content-center text-center">
                        <p>No doctor found in the department: {department}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </Modal>
  );
};

export default AppointmentModal;
