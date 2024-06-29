"use client";

import { doctorsSettings, patientsSettings, Tab } from "@/lib/data/settings";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import General from "./content/general";
import Doctors from "./content/doctors";
import Notifications from "./content/notifications";
import Payments from "./content/payments";
import useUserInfo from "@/lib/hooks/useUserInfo";
import Reviews from "./content/reviews";
import Kyc from "./content/kyc";
import { useTheme } from "@/lib/store/global.store";

const Settings = () => {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<Tab>("general");

  const { user, loading } = useUserInfo();

  const { isDark: isDarkMode } = useTheme();

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
      case "reviews":
        return <Reviews key="reviews" />;
      case "kyc-verification":
        return <Kyc key="kyc" />;
      default:
        return null;
    }
  };

  return (
    <div className="sm:flex grid lg:gap-7 gap-5">
      <div className="bg-white dark:bg-white/10 border dark:border-white/10 rounded-lg divide-y dark:divide-white/10 lg:min-w-[20rem] min-w-[13rem] overflow-hidden self-start sm:sticky top-16">
        {loading ? (
          <div className="divide-y dark:divide-white/10">
            {Array.from({ length: 4 }).map((_, id) => (
              <div key={id} className={`p-4 ${!isDarkMode ? "animate-skeleton" : "animate-skeleton-dark"}`}></div>
            ))}
          </div>
        ) : (
          <>
            {user &&
              (user.role === "patient" ? patientsSettings : doctorsSettings).map(({ icon, name, tab: sTab }, id) => (
                <div
                  key={id}
                  className={`p-3 flex items-center gap-3 duration-300 cursor-pointer ${
                    tab === sTab ? "bg-primary text-white" : "hover:bg-gray-200 dark:hover:bg-[#3b3b3b]"
                  }`}
                  onClick={() => setTab(sTab)}
                >
                  {icon}
                  <p>{name}</p>
                </div>
              ))}
          </>
        )}
      </div>

      <div className="flex-grow bg-white dark:bg-white/10 border dark:border-white/10 rounded-lg overflow-hidden self-start">
        <AnimatePresence mode="wait" initial={false}>
          {renderSettings()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Settings;
