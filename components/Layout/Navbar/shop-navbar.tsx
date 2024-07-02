"use client";

import { shopNavLink } from "@/lib/data/navbar";
import Link from "next/link";
import { useRef } from "react";
import NavChild from "./nav-child";
import { useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import gsap from "gsap";
import { LuX } from "react-icons/lu";
import useUserInfo from "@/lib/hooks/useUserInfo";
import Image from "next/image";
import { useTheme } from "@/lib/store/global.store";
import { CgMoon, CgSun, CgUser } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa6";

const ShopNavbar = () => {
  const ref = useRef<HTMLElement>(null);

  const asideRef = useRef<HTMLElement>(null);

  const { data: session } = useSession();

  const { user } = useUserInfo();

  const { isDark: isDarkMode, updateDarkMode } = useTheme();

  const openMenu = () => {
    gsap.context(() => {
      gsap.timeline().to(asideRef.current, { height: "100%" }).to(".nav_link_child", { y: "0%", stagger: 0.2 });
    }, asideRef.current as Element);
  };

  const closeMenu = () => {
    gsap.context(() => {
      gsap.timeline().to(".nav_link_child", { y: "100%", stagger: 0.2 }).to(asideRef.current, { height: "0%" });
    }, asideRef.current as Element);
  };
  return (
    <>
      <nav className="sticky top-0 left-0 w-full duration-300 z-[500] bg-[#f8f8f8] dark:bg-transparent" ref={ref}>
        <div className={`flex items-center justify-between px-5 py-3 duration-300`}>
          <div className="flex items-center justify-end gap-5">
            <div>
              <Link href={"/shop"} className="text-2xl font-bold">
                <div className="flex items-center gap-2">
                  <FaCartPlus />
                  <span>
                    BD<span className="text-primary">Shop</span>
                  </span>
                </div>
              </Link>
            </div>

            <ul className={`md:flex items-end justify-end hidden gap-6`}>
              {shopNavLink.map((link, id) => (
                <NavChild {...link} key={id} />
              ))}
            </ul>
          </div>

          <div>
            {session ? (
              <div className="flex items-center gap-3">
                <div className="size-8 border border-gray-500/40 rounded-full grid place-content-center">
                  {isDarkMode ? (
                    <CgSun
                      className="cursor-pointer dark:text-white text-black duration-300 hover:text-primary"
                      onClick={() => updateDarkMode(false)}
                    />
                  ) : (
                    <CgMoon
                      className="cursor-pointer dark:text-white text-black duration-300 hover:text-primary"
                      onClick={() => updateDarkMode(true)}
                    />
                  )}
                </div>
                <div>
                  <Link href={"/dashboard"}>
                    <div className="relative size-8 rounded-full overflow-hidden ring duration-300 cursor-pointer dark:ring-white/50 ring-black/10">
                      {user && (
                        <Image
                          src={`${user.profilePicture}`}
                          width={100}
                          height={100}
                          alt="profile"
                          className="w-full h-full object-cover absolute top-0 left-0"
                        />
                      )}
                    </div>
                  </Link>
                </div>
                <RxHamburgerMenu className="cursor-pointer text-white md:hidden" size={26} onClick={openMenu} />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="size-8 border border-gray-500/40 rounded-full grid place-content-center">
                  {isDarkMode ? (
                    <CgSun
                      className="cursor-pointer dark:text-white text-black duration-300 hover:text-primary"
                      onClick={() => updateDarkMode(false)}
                    />
                  ) : (
                    <CgMoon
                      className="cursor-pointer dark:text-white text-black duration-300 hover:text-primary"
                      onClick={() => updateDarkMode(true)}
                    />
                  )}
                </div>

                <div className="size-8 rounded-full cursor-pointer border border-gray-500/40 dark:text-white text-black duration-300 hover:text-primary grid place-content-center relative">
                  <FaOpencart />

                  <div className="size-5 rounded-full bg-primary text-white absolute -top-2 -right-2 shadow grid place-content-center font-semibold text-sm">
                    <p>0</p>
                  </div>
                </div>

                <Link className="sm:block hidden" href="/account/login">
                  <div className="size-8 rounded-full ring-[2px] ring-primary/40 dark:ring-white/10 duration-300 hover:bg-primary hover:text-white grid place-content-center">
                    <CgUser />
                  </div>
                </Link>

                <RxHamburgerMenu className="cursor-pointer dark:text-white md:hidden" size={26} onClick={openMenu} />
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside
        className={`dark:bg-secondary-base/90 bg-white dark:bg-[#282828]/90 backdrop-blur-lg fixed top-0 left-0 w-full z-[1000] overflow-x-hidden overflow-y-auto h-0`}
        ref={asideRef}
      >
        <div className="w-full h-full relative flex items-center">
          <LuX className="absolute top-3 right-3 cursor-pointer" size={35} onClick={closeMenu} />

          <div className="flex items-center w-full" id="nav_link_right">
            <ul className="w-full">
              {shopNavLink.map((link, id) => (
                <>
                  <li key={id} className="w-full overflow-y-hidden">
                    <div className="w-full nav_link_child translate-y-full duration-300 group">
                      <Link href={link.path} onClick={closeMenu}>
                        <div className="text-4xl text-gray-800 dark:text-gray-200 py-5 w-full font-bold hover:text-primary dark:hover:text-primary duration-300 flex items-center justify-center md:justify-start gap-6">
                          {link.label}
                        </div>
                      </Link>
                    </div>
                  </li>
                </>
              ))}
              {session?.user ? (
                <>
                  <li className="w-full overflow-y-hidden">
                    <div className="w-full nav_link_child translate-y-full duration-300 py-5 group flex items-center gap-4 justify-center">
                      <div>
                        <Link href={"/dashboard"}>
                          <div className="text-4xl text-primary py-5 w-full font-bold hover:text-primary dark:hover:text-primary-base hover:text-secondary-500 duration-300 flex items-center justify-center md:justify-start gap-6">
                            Dashboard
                          </div>
                        </Link>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="w-full overflow-y-hidden">
                    <div className="w-full nav_link_child translate-y-full duration-300 group">
                      <Link href={"/account/login"} onClick={closeMenu}>
                        <div className="text-5xl py-5 w-full font-bold dark:hover:text-primary-base hover:text-secondary-500 hover:text-primary duration-300 flex items-center justify-center md:justify-start gap-6">
                          Get Started
                        </div>
                      </Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ShopNavbar;
