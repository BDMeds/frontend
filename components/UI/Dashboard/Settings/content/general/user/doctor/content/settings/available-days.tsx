import Button from "@/components/Common/Button";
import { toastError } from "@/lib/utils/toast";
import { FC, useEffect, useState } from "react";
import { CgCheck } from "react-icons/cg";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { updateDoctor } from "@/lib/services/doctor.service";
import { queryClient } from "@/lib/providers";
import { IDoctor } from "@/lib/types";

type DayType = {
  day: string;
  startTime: number;
  endTime: number;
};

type Days = DayType[];

type Props = { doctor?: IDoctor };

const AvailableDays: FC<Props> = ({ doctor }) => {
  const [days, setDays] = useState<Days>(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
      const start = doctor?.availableDays.find((d) => d.day === day)?.startTime;
      const end = doctor?.availableDays.find((d) => d.day === day)?.endTime;

      return {
        day,
        startTime: !isNaN(Number(start)) ? Number(start) : new Date().setTime(0),
        endTime: !isNaN(Number(end)) ? Number(end) : new Date().setTime(0),
      };
    })
  );

  const { mutate, isPending: loading } = useMutation({
    mutationFn: updateDoctor,
    mutationKey: ["doctor", "update", "available-days"],
  });

  const updateData = ({ day, ...rest }: DayType) => {
    let singleDay = days.find((d) => d.day === day);

    if (!singleDay) {
      toastError("Day not found");
      return;
    }

    let updatedDay = { day, ...rest };

    let tempDays = days;
    const dayIndex = days.findIndex((d) => d.day === day);
    tempDays[dayIndex] = updatedDay;

    setDays(tempDays);
  };

  const submit = () => {
    mutate(
      {
        availableDays: days.map(({ day, endTime, startTime }) => ({
          day,
          endTime: new Date(endTime).toISOString(),
          startTime: new Date(startTime).toISOString(),
        })),
      },
      {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctor", "info"] }),
      }
    );
  };
  return (
    <div className="border dark:border-white/10 rounded-xl p-4 space-y-4">
      <p className="font-semibold">Days Available</p>

      <div className="space-y-3">
        {days.map((day, id) => (
          <Day key={id} day={day} updateData={updateData} />
        ))}
      </div>

      <Button text="Save" variant="filled" fullWidth onClick={submit} />
    </div>
  );
};

const Day = ({
  day: { day, endTime: existEnd, startTime: existStart },
  updateData,
}: {
  day: DayType;
  updateData: (data: DayType) => void;
}) => {
  // if start and time exist, then it should be checked
  const [checked, setChecked] = useState(existEnd && existStart ? true : false);

  const toggleCheck = () => setChecked((prev) => !prev);

  const [range, setRange] = useState({ startTime: 0, endTime: 0 });

  useEffect(() => {
    if (range.startTime && range.endTime && range.endTime < range.startTime) {
      toastError("Invalid time range");

      setRange({ ...range, endTime: 0 });
      return;
    }

    if (range.startTime && range.endTime) updateData({ day, ...range });
  }, [range, day, updateData]);

  return (
    <div className="space-y-1">
      <p className="font-semibold">{day}</p>

      <div className="flex items-center gap-2">
        <div className="grid grid-cols-2 gap-2 flex-grow">
          <div>
            <p className="font-medium text-xs dark:text-white/60 text-black/60">Start Time</p>
            <input
              type="time"
              className={`border p-1 bg-transparent rounded-md w-full dark:border-white/10 duration-300 ${
                !checked ? "disabled:cursor-not-allowed disabled:opacity-40" : ""
              } `}
              disabled={!checked}
              value={format(range.startTime, "HH:mm")}
              onChange={(e) => setRange({ ...range, startTime: e.target.valueAsNumber })}
            />
          </div>
          <div>
            <p className="font-medium text-xs dark:text-white/60 text-black/60">End Time</p>
            <input
              type="time"
              className={`border p-1 bg-transparent rounded-md w-full dark:border-white/10 duration-300 ${
                !checked ? "disabled:cursor-not-allowed disabled:opacity-40" : ""
              } `}
              value={format(range.endTime, "HH:mm")}
              disabled={!checked}
              onChange={(e) => setRange({ ...range, endTime: e.target.valueAsNumber })}
            />
          </div>
        </div>

        <div
          className={`size-4 border dark:border-white/10 text-white cursor-pointer rounded-md duration-300 grid place-content-center ${
            checked ? "bg-blue-500" : ""
          }`}
          onClick={toggleCheck}
        >
          {<CgCheck className={`duration-300 ${!checked ? "opacity-0" : ""}`} />}
        </div>
      </div>
    </div>
  );
};

export default AvailableDays;
