"use client";

import { settingSideData, Tab } from "@/lib/data/settings";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex gap-7">
      <div className="bg-white border rounded-lg divide-y min-w-[20rem] overflow-hidden">
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

      <div className="flex-grow bg-white border rounded-lg">{tab}</div>
    </div>
  );
};

export default Settings;
