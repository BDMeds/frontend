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

const Sidebar = () => {
  const pathname = usePathname();
  const [links, setLinks] = useState(sidebarLinks);

  const { data } = useSession();

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
    <aside className="fixed top-0 z-[100] min-h-screen xl:w-[280px] md:w-[260px] overflow-x-hidden w-0 dark:bg-[#131921] bg-white overflow-y-auto hide-scroll flex flex-col gap-20 justify-between">
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <>
          <div>
            <div className="pl-6 py-4 border-b">
              <Link href={"/dashboard"} className="text-xl font-bold">
                <div className="flex items-center gap-2">
                  <GiMedicines className="text-primary" />
                  <span className="font-bold">BDMeds</span>
                </div>
              </Link>
            </div>

            <div className="mt-5 space-y-4 px-4">
              {links.map((section, index) => (
                <div key={index} className="space-y-1">
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.path}
                          className={`flex items-center px-5 py-3 rounded-full transition-colors gap-4 ${
                            pathname === link.path
                              ? "bg-primary text-white"
                              : "dark:text-white hover:bg-zinc-300 hover:text-black "
                          }`}
                        >
                          <span>{pathname === link.path ? link.iconFilled : link.iconOutlined}</span>
                          <span>{link.text}</span>
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
                          className={`flex items-center px-7 py-3 rounded-full transition-colors gap-4 ${
                            pathname === link.path ? "text-primary" : "dark:text-white hover:text-primary"
                          }`}
                        >
                          <span>{pathname === link.path ? link.iconFilled : link.iconOutlined}</span>
                          <span>{link.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className="hover:text-primary duration-300 flex items-center px-7 py-3 gap-4 cursor-pointer"
              onClick={() => signOut()}
            >
              <FiLogOut />
              <span>Logout</span>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
