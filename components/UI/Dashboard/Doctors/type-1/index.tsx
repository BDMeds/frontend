"use client";

import Button from "@/components/Common/Button";
import Loader from "@/components/Common/Loaders";
import { defaultImageUrl, departments } from "@/lib/data/dashboard";
import { departments as depWithImage } from "@/lib/data/home";
import useSlider from "@/lib/hooks/useSlider2";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { getPendingAppointments } from "@/lib/services/appointment.service";
import { getDoctors } from "@/lib/services/doctor.service";
import { Department, IDoctor } from "@/lib/types";
import { montserrat } from "@/lib/utils/fonts";
import { opacityVariant } from "@/lib/utils/variants";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgCalendar, CgStopwatch } from "react-icons/cg";
import { FaWalking } from "react-icons/fa";
import { IoHeartOutline, IoStarOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";

const Type1DoctorsPage = () => {
  const { user } = useUserInfo();

  const [depName, setDepName] = useState(depWithImage[0].name);
  const [allDepartments, setDepartments] = useState(depWithImage);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<Department>(
    depWithImage[0].fullDepartment
  );

  const { containerRef, scroll } = useSlider();

  const [doc, setDoc] = useState<IDoctor | undefined>();

  const {
    isPending: loading,
    isRefetching: refetching,
    data: doctors,
    refetch,
  } = useQuery({
    queryFn: () => getDoctors({ search, department }),
    queryKey: ["doctors"],
  });

  useEffect(() => {
    refetch();
  }, [department]);

  return (
    <div className="grid grid-cols-9 gap-4 -mt-6">
      <div className="space-y-5 col-span-6 flex-grow bg-white dark:bg-dark rounded-md border dark:border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold text-2xl ${montserrat.className}`}>
              Welcome {user?.firstName}!
            </p>
            <p className="text-gray-600 dark:text-gray-200">
              In this section, you can find doctors under any category.
            </p>
          </div>

          <p className="border rounded-full flex text-sm items-center gap-1 py-1 px-2 font-semibold border-gray-400/50 dark:border-white/10">
            <CgCalendar className="text-primary" />
            <span>{format(new Date(), "MMMM dd, yyyy")}</span>
          </p>
        </div>

        <div
          className="flex w-full gap-6 flex-wrap text-center"
          ref={containerRef}
        >
          {allDepartments.map((deps, index) => (
            <div
              className={`flex-shrink-0 border dark:border-white/10 duration-300 select-none cursor-pointer min-h-24 px-5 grid place-content-center rounded-md whitespace-nowrap ${
                deps.name === depName
                  ? "bg-primary/10 border-transparent"
                  : "bg-white dark:bg-dark"
              } `}
              onClick={() => {
                setDepName(deps.name);
                setDepartment(deps.fullDepartment);
              }}
              key={index}
            >
              <div className="space-y-1">
                <div className="grid place-content-center">
                  <Image
                    src={`/images/departments/${deps.image}`}
                    alt={deps.name}
                    width={60}
                    height={60}
                  />
                </div>
                <p>{deps.name}</p>
              </div>
            </div>
          ))}
        </div>

        {(loading || refetching) && <Loader />}

        <div className="space-y-3">
          <p className="font-bold">
            Recommended <span className="capitalize">{depName}</span>
          </p>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
            {doctors?.map((doctor, index) => (
              <div
                className={`duration-300 cursor-pointer ${
                  String(doctor._id) === String(doc?._id)
                    ? "border-primary"
                    : "dark:border-white/10 hover:border-primary"
                } min-h-[14rem] border rounded-md bg-white dark:bg-dark p-1`}
                key={doctor._id}
                onClick={() => setDoc(doctor)}
              >
                <div className="h-[60%] bg-gray-300 dark:bg-[#353535] flex items-end justify-center rounded-md">
                  <Image
                    src={doctor.user.profilePicture}
                    alt="doc"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="h-[40%] px-2 flex items-center justify-between">
                  <div className="space-y-2">
                    <div>
                      <p className="font-bold">
                        Dr. {doctor.user.firstName} {doctor.user.lastName}
                      </p>
                      <p className="text-sm">{doctor.department}</p>
                    </div>

                    <p className="font-bold text-primary">
                      NGN{doctor.chargePerSession}/session
                    </p>
                  </div>
                  <IoHeartOutline className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`duration-300 col-span-3`}>
        <RightSection doc={doc} />
      </div>
    </div>
  );
};

const RightSection = ({ doc }: { doc?: IDoctor }) => {
  const { data: appointments, isPending: appointmentsLoading } = useQuery({
    queryFn: getPendingAppointments,
    queryKey: ["pending-appointments"],
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark rounded-xl border dark:border-white/10 px-4 pt-4 pb-7 space-y-8">
        <p className="font-bold">Upcoming Appointments</p>

        {appointmentsLoading ? (
          <p>loading...</p>
        ) : (
          <>
            {appointments && appointments.length > 0 ? (
              <div className="min-h-[10rem] relative pb-1 space-y-5">
                <div>
                  {appointments
                    .sort((a, b) =>
                      a.appointmentDate > b.appointmentDate ? 1 : -1
                    )
                    .map(
                      (
                        {
                          doctor: {
                            user: { firstName, lastName, profilePicture },
                            speciality,
                          },
                          appointmentDate,
                          startTime,
                          endTime,
                        },
                        id
                      ) => (
                        <div
                          key={id}
                          className={`w-full h-full absolute top-0 left-0 flex items-center justify-center`}
                        >
                          <div
                            style={{
                              width: `${20 + id * 25}%`,
                              marginTop: `${id * -10}px`,
                            }}
                            className={`mx-auto p-4 ${
                              id === appointments.length - 1 ? "shadow-2xl" : ""
                            }  rounded-xl h-full border flex flex-col justify-between dark:bg-dark dark:border-white/10 bg-white`}
                          >
                            {id === appointments.length - 1 && (
                              <>
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex gap-4">
                                    <div className="relative size-14 border dark:border-white/10 overflow-hidden rounded-md">
                                      <Image
                                        src={profilePicture}
                                        alt="profile"
                                        width={100}
                                        height={100}
                                        className="object-cover absolute top-0 left-0"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-bold text-lg">{`${firstName} ${lastName}`}</p>
                                      <p className="capitalize dark:text-white/50">
                                        {speciality}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-primary/20 flex items-center justify-between p-2 rounded-lg">
                                  <div className="flex items-center gap-2 text-xs">
                                    <CgCalendar className="text-primary" />
                                    <p>
                                      {formatDistanceToNow(appointmentDate, {
                                        addSuffix: true,
                                      })}
                                    </p>
                                  </div>
                                  <div className="flex items-center flex-shrink-0 gap-2 text-xs">
                                    <CgStopwatch className="text-primary" />
                                    <p>
                                      {format(startTime, "p")} -{" "}
                                      {format(endTime, "p")}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    )}
                </div>
                {/* <div className="flex items-end justify-center w-full h-full">
                  <div className="flex items-center justify-center gap-2 text-primary text-sm">
                    <FiArrowRightCircle />
                    <span>See all</span>
                  </div>
                </div> */}
              </div>
            ) : (
              <p className="text-gray-500">No pending appointments</p>
            )}
          </>
        )}
      </div>

      <div className="bg-white dark:bg-dark rounded-xl border dark:border-white/10 p-4 space-y-8">
        <AnimatePresence mode="wait" initial={false}>
          {doc === undefined ? (
            <motion.div
              {...opacityVariant}
              className="w-full h-full grid place-content-center min-h-[10rem]"
            >
              <p className="opacity-80 text-sm px-4">
                Select doctor to display info
              </p>
            </motion.div>
          ) : (
            <motion.div {...opacityVariant} className="space-y-4">
              <DocInfo doc={doc} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DocInfo = ({ doc }: { doc?: IDoctor }) => {
  const tabs = ["about"];

  const [curTab, setTab] = useState("about");
  const router = useRouter();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative border dark:border-white/10 bg-gray-200 dark:bg-[#303030] overflow-hidden rounded-md flex items-end justify-center">
            <Image
              src={doc?.user?.profilePicture || defaultImageUrl}
              alt="doc"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-lg">
                Dr. {doc?.user?.firstName} {doc?.user?.lastName}
              </p>
              <p className="capitalize dark:text-white/50 text-sm">
                {doc?.department}
              </p>
            </div>

            <p className="font-bold text-lg text-primary">
              ${doc?.chargePerSession}/hr
            </p>
          </div>
        </div>
        <IoHeartOutline className="cursor-pointer" />
      </div>

      <div className="w-full border rounded-md grid-cols-3 grid dark:border-white/10">
        <div className="text-center p-4">
          <div className="flex items-center justify-center gap-1">
            <FaWalking className="text-purple-400" />
            <span className="font-bold">{doc?.yearsOfExperience} Years</span>
          </div>

          <p className="text-sm opacity-50">Experience</p>
        </div>
        <div className="text-center p-4">
          <div className="flex items-center justify-center gap-1">
            <TbUsersGroup className="text-green-400" />
            <span className="font-bold">
              {Math.round(Math.random() * 1000)}
            </span>
          </div>

          <p className="text-sm opacity-50">Total Patients</p>
        </div>
        <div className="text-center p-4">
          <div className="flex items-center justify-center gap-1">
            <IoStarOutline className="text-orange-400" />
            <span className="font-bold">{Math.round(Math.random() * 10)}</span>
          </div>

          <p className="text-sm opacity-50">Reviews</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 w-full">
          {tabs.map((tab, id) => (
            <div
              key={id}
              className={`capitalize border-b-4 py-4 ${
                curTab === tab
                  ? "border-primary"
                  : "dark:border-white/10 border-black/10"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="opacity-80">{doc?.bio}</p>

          <Button
            variant="filled"
            text="Book Appointment"
            fullWidth
            onClick={() => router.push("/appointments")}
          />
        </div>
      </div>
    </div>
  );
};

export default Type1DoctorsPage;
