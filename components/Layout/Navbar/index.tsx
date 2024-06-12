"use client";

import { navLinks } from "@/lib/data/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiMedicines } from "react-icons/gi";
import NavChild from "./nav-child";
import { useSession } from "next-auth/react";
import Button from "@/components/Common/Button";

const Navbar = () => {
  const ref = useRef<HTMLElement>(null);
  const [passed, setPassed] = useState(false);
  const pathname = usePathname();

  const { data: session } = useSession();

  useEffect(() => {
    let prev = window.scrollY;
    if (prev > 80) {
      setPassed(true);
    } else setPassed(false);

    const handleScroll = () => {
      let current = window.scrollY;
      if (current > 200) {
        setPassed(true);
      } else setPassed(false);

      if (!ref.current) return;

      if (current > prev) {
        ref.current.style.opacity = "0%";
      } else {
        ref.current.style.opacity = "100%";
      }

      prev = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full duration-300 z-[2000]" ref={ref}>
      <div
        className={`container flex items-center justify-between py-5 duration-300 ${
          pathname === "/" && !passed ? "text-white" : ""
        }`}
      >
        <div>
          <Link href={"/"} className="text-2xl font-bold">
            <div className="flex items-center gap-2">
              <GiMedicines />
              <span>BDMeds</span>
            </div>
          </Link>
        </div>

        <ul
          className={`flex items-center gap-6 border border-white/40 duration-300 rounded-full backdrop-blur-lg shadow px-8 ${
            pathname === "/" && !passed ? "text-white bg-transparent " : "bg-white "
          }`}
        >
          {navLinks.map((link, id) => (
            <NavChild {...link} key={id} />
          ))}
        </ul>

        <div>
          {session ? (
            <div>
              <Link href={"/dashboard"}>
                <Button text="Dashboard" variant="filled" />
              </Link>
            </div>
          ) : (
            <>
              {" "}
              <Link href="/account/login" className="mr-4">
                Sign In
              </Link>
              <Link href="/account/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
