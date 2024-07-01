import Button from "@/components/Common/Button";
import { useState } from "react";
import { CgCheck } from "react-icons/cg";

type DayType = {
  day: string;
  startTime: number;
  endTime: number;
};

type Days = DayType[];

const AvailableDays = () => {
  const [days, setDays] = useState<Days>(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => ({
      day,
      startTime: new Date().setTime(0),
      endTime: new Date().setTime(0),
    }))
  );

  const updateInput = ({ id, startTime, endTime }: { id: number; startTime: number; endTime: number }) => {
    let currentDay = days[id];
    let newDayVal = { ...currentDay, startTime, endTime };

    days[id] = newDayVal;

    setDays(days);
  };

  const submit = () => console.log({ days });

  return (
    <div className="border dark:border-white/10 rounded-xl p-4 space-y-4">
      <p className="font-semibold">Days Available</p>

      <div className="space-y-3">
        {days.map((day, id) => (
          <Day key={id} {...day} />
        ))}
      </div>

      <Button text="Save" variant="filled" fullWidth />
    </div>
  );
};

const Day = ({ day, endTime, startTime }: DayType) => {
  const [checked, setChecked] = useState(true);

  const toggleCheck = () => setChecked((prev) => !prev);

  return (
    <div className="space-y-1">
      <p className="font-semibold">{day}</p>

      <div className="flex items-center gap-2">
        <div className="grid grid-cols-2 gap-2 flex-grow">
          <div>
            <p className="font-medium text-xs dark:text-white/60 text-black/60">Start Time</p>
            <input
              type="text"
              className={`border p-1 bg-transparent rounded-md w-full dark:border-white/10 duration-300 ${
                !checked ? "disabled:cursor-not-allowed disabled:opacity-40" : ""
              } `}
              disabled={!checked}
            />
          </div>
          <div>
            <p className="font-medium text-xs dark:text-white/60 text-black/60">End Time</p>
            <input
              type="text"
              className={`border p-1 bg-transparent rounded-md w-full dark:border-white/10 duration-300 ${
                !checked ? "disabled:cursor-not-allowed disabled:opacity-40" : ""
              } `}
              disabled={!checked}
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
