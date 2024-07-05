import { NavLink } from "@/lib/data/navbar";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { motion } from "framer-motion";
import { fadeToBottomVariant } from "@/lib/utils/variants";
import { usePathname } from "next/navigation";

type Props = NavLink;

const NavChild: FC<Props> = (link) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const mainRef = ref.current;

    const handleMouseEnter = () => {
      setHovered(true);
    };
    const handleMouseLeave = () => {
      setHovered(false);
    };

    if (link.children && mainRef) {
      mainRef.addEventListener("mouseenter", handleMouseEnter);
      mainRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (link.children && mainRef) {
        mainRef.removeEventListener("mouseenter", handleMouseEnter);
        mainRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const pathname = usePathname();

  return (
    <div className="relative flex items-center gap-1 cursor-pointer group" ref={ref}>
      <Link href={link.path}>
        <div className={`py-3 ${link.path === pathname ? "text-primary" : ""}`}>{link.label}</div>
      </Link>
      {link.children && <LuChevronDown className="group-hover:rotate-180 duration-300" />}

      {/* drop */}
      {link.children && hovered && (
        <motion.div
          {...fadeToBottomVariant}
          className="absolute top-full left-0 bg-white dark:bg-dark text-gray-900 dark:text-gray-300 shadow-lg rounded-md w-52 overflow-hidden divide-y dark:divide-white/10 divide-black/30"
        >
          {link.children.map((child) => (
            <Link key={child.label} href={child.path}>
              <div className="py-3 px-4 duration-300 hover:bg-gray-200 dark:hover:bg-[#3f3f3f]">{child.label}</div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default NavChild;
