"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { doctorLinks, bottomSidebarLinks, patientLinks, adminLinks } from "@/lib/data/sidebar";
import SidebarSkeleton from "./skeleton";
import { GiMedicines } from "react-icons/gi";
import { useGlobalStore } from "@/lib/store/global.store";
import useUserInfo from "@/lib/hooks/useUserInfo";

const Sidebar = () => {
  const pathname = usePathname();
  const [links, setLinks] = useState(patientLinks);

  const { sidebarOpen } = useGlobalStore();

  const { user, loading } = useUserInfo();

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "patient":
        setLinks(patientLinks);
        return;
      case "doctor":
        setLinks(doctorLinks);
        return;
      case "admin":
        setLinks(adminLinks);
        return;
    }
  }, [user, loading]);

  return (
    <aside
      className={`fixed top-0 z-[100] min-h-screen overflow-x-hidden duration-300 w-0 dark:bg-[#131921] bg-white overflow-y-auto show-scroll flex flex-col gap-10 justify-between ${
        sidebarOpen ? "xl:w-[280px] md:w-[260px]" : "w-[60px]"
      }`}
    >
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <>
          <div>
            <div className={`pl-6 border-b ${sidebarOpen ? "py-3" : "py-4"}`}>
              <Link href={"/dashboard"} className="text-xl font-bold">
                <div className="flex items-center gap-2">
                  <GiMedicines className="text-primary" />
                  {sidebarOpen && <span className="font-bold">BDMeds</span>}
                </div>
              </Link>
            </div>

            <div className="mt-5 space-y-4 px-4">
              {links.map((section, index) => (
                <div key={index} className="space-y-1">
                  <ul className={`${sidebarOpen ? "space-y-2" : "space-y-3"}`}>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.path}
                          // onMouseOver={!sidebarOpen ? openSidebar : undefined}
                          // onMouseLeave={!sidebarOpen ? closeSidebar : undefined}
                          className={`flex items-center rounded-full transition-colors duration-300 gap-4 m-over ${
                            pathname === link.path
                              ? "bg-primary text-white"
                              : "dark:text-white hover:bg-zinc-300 hover:text-black "
                          } ${sidebarOpen ? "px-5 py-2" : "grid place-content-center size-8"}`}
                        >
                          <span>{pathname === link.path ? link.iconFilled : link.iconOutlined}</span>
                          {sidebarOpen && <span>{link.text}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div>
              {bottomSidebarLinks.map((section, index) => (
                <div key={index} className="space-y-1">
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.path}
                          className={`flex items-center rounded-full transition-colors duration-300 gap-4 m-over mx-auto ${
                            link.path.startsWith(pathname) ? "text-primary" : "dark:text-white hover:text-primary"
                          } ${sidebarOpen ? "px-7 py-3" : "grid place-content-center size-8"}`}
                        >
                          <span>{link.path.startsWith(pathname) ? link.iconFilled : link.iconOutlined}</span>

                          {sidebarOpen && <span>{link.text}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className={`hover:text-primary duration-300 grid md:flex items-center gap-4 cursor-pointer ${
                sidebarOpen ? "px-7 py-3" : "grid place-content-center mx-auto py-2"
              }`}
              onClick={() => signOut()}
            >
              <FiLogOut />
              {sidebarOpen && <span>Logout</span>}
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
