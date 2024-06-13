"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { adminSidebarLinks, bottomSidebarLinks, sidebarLinks } from "@/lib/data/sidebar";
import SidebarSkeleton from "./skeleton";
import { GiMedicines } from "react-icons/gi";
import { useGlobalStore } from "@/lib/store/global.store";

const Sidebar = () => {
  const pathname = usePathname();
  const [links, setLinks] = useState(sidebarLinks);

  const { data } = useSession();

  const { sidebarOpen } = useGlobalStore();

  const { data: user, isPending: loading } = useQuery({
    queryFn: () => ({ role: "user" }),
    queryKey: ["user"],
  });

  useEffect(() => {
    if (user && user.role !== "user") {
      setLinks(adminSidebarLinks);
    }
  }, [user, loading]);

  return (
    <aside
      className={`fixed top-0 z-[100] min-h-screen overflow-x-hidden duration-300 w-0 dark:bg-[#131921] bg-white overflow-y-auto show-scroll flex flex-col gap-20 justify-between ${
        sidebarOpen ? "xl:w-[280px] md:w-[260px]" : "w-[60px]"
      }`}
    >
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <>
          <div>
            <div className="pl-6 py-4 border-b">
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
                          className={`flex items-center rounded-full transition-colors duration-300 gap-4 ${
                            pathname === link.path
                              ? "bg-primary text-white"
                              : "dark:text-white hover:bg-zinc-300 hover:text-black "
                          } ${sidebarOpen ? "px-5 py-3" : "grid place-content-center size-8"}`}
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
                          className={`flex items-center rounded-full transition-colors duration-300 gap-4 mx-auto ${
                            pathname === link.path ? "text-primary" : "dark:text-white hover:text-primary"
                          } ${sidebarOpen ? "px-7 py-3" : "grid place-content-center size-8"}`}
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

            <div
              className={`hover:text-primary duration-300 grid md:flex place-content-center items-center gap-4s cursor-pointer ${
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