"use client";

import { navLinks } from "@/lib/data/navbar";
import Link from "next/link";
import { useRef } from "react";
import { GiMedicines } from "react-icons/gi";
import NavChild from "./nav-child";
import { useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import gsap from "gsap";
import { LuX } from "react-icons/lu";
import useUserInfo from "@/lib/hooks/useUserInfo";
import Image from "next/image";
import { useTheme } from "@/lib/store/global.store";
import { CgMoon, CgSun } from "react-icons/cg";

const Navbar = () => {
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
      <nav className="fixed top-0 left-0 w-full duration-300 z-[500]" ref={ref}>
        <div className={`container flex items-center justify-between py-5 duration-300`}>
          <div>
            <Link href={"/"} className="text-2xl font-bold">
              <div className="flex items-center gap-2">
                <GiMedicines />
                <span>BDMeds</span>
              </div>
            </Link>
          </div>

          <ul
            className={`md:flex items-center hidden gap-6 border border-white/40 duration-300 rounded-full backdrop-blur-lg shadow px-8 bg-white dark:bg-white/10 dark:bg-white dark:bg-white/10/10`}
          >
            {navLinks.map((link, id) => (
              <NavChild {...link} key={id} />
            ))}
          </ul>

          <div>
            {session ? (
              <div className="flex items-center gap-2">
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
                    <div className="relative size-10 rounded-full overflow-hidden ring duration-300 cursor-pointer ring-white/50">
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
              <div className="flex items-center gap-4">
                <Link className="sm:block hidden" href="/account/login">
                  Login
                </Link>
                <Link className="sm:block hidden" href="/account/register">
                  Register
                </Link>
                <Link className="sm:hidden" href="/account/login">
                  Account
                </Link>
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
                <RxHamburgerMenu className="cursor-pointer dark:text-white md:hidden" size={26} onClick={openMenu} />
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside
        className={`dark:bg-secondary-base/90 bg-white dark:bg-white/10/80 backdrop-blur-lg fixed top-0 left-0 w-full z-[1000] overflow-x-hidden overflow-y-auto h-0`}
        ref={asideRef}
      >
        <div className="w-full h-full relative flex items-center">
          <LuX className="absolute top-3 right-3 cursor-pointer" size={35} onClick={closeMenu} />

          <div className="flex items-center w-full" id="nav_link_right">
            <ul className="w-full">
              {navLinks.map((link, id) => (
                <>
                  <li key={id} className="w-full overflow-y-hidden">
                    <div className="w-full nav_link_child translate-y-full duration-300 group">
                      <Link href={link.path} onClick={closeMenu}>
                        <div className="text-4xl text-gray-800 py-5 w-full font-bold hover:text-primary dark:hover:text-primary-base hover:text-secondary-500 duration-300 flex items-center justify-center md:justify-start gap-6">
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

export default Navbar;
