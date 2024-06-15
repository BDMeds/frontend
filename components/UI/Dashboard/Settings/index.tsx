"use client";

import { settingSideData, Tab } from "@/lib/data/settings";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import General from "./content/general";
import Doctors from "./content/doctors";
import Notifications from "./content/notifications";
import Payments from "./content/payments";

const Settings = () => {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<Tab>("general");

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setTab("general");
      return;
    }

    setTab(searchParams.get("tab") as Tab);
  }, [searchParams]);

  const renderSettings = () => {
    switch (tab) {
      case "general":
        return <General key="general" />;
      case "doctors":
        return <Doctors key="doctors" />;
      case "notifications":
        return <Notifications key="notifications" />;
      case "payments":
        return <Payments key="payments" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-7">
      <div className="bg-white border rounded-lg divide-y min-w-[20rem] overflow-hidden self-start sticky top-0">
        {settingSideData.map(({ icon, name, tab: sTab }, id) => (
          <div
            key={id}
            className={`p-3 flex items-center gap-3 duration-300 cursor-pointer ${
              tab === sTab ? "bg-primary text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setTab(sTab)}
          >
            {icon}
            <p>{name}</p>
          </div>
        ))}
      </div>

      <div className="flex-grow bg-white border rounded-lg overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {renderSettings()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Settings;
