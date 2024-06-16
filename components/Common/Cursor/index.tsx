"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      gsap
        .timeline()
        .to(ref.current, {
          top: mouseY - ref.current.clientHeight / 2 + "px",
          left: mouseX - ref.current.clientWidth / 2 + "px",
          duration: 0.3,
        })
        .to(ref.current, { visibility: "visible", opacity: 1 });
    };

    const links = document.querySelectorAll("a, button, .m-over");

    for (let i = 0; i < links.length; i++) {
      const selfLink = links[i];

      selfLink.addEventListener("mouseover", function () {
        ref.current?.classList.add("custom-cursor--link");
      });

      selfLink.addEventListener("mouseout", function () {
        ref.current?.classList.remove("custom-cursor--link");
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="size-6 z-[4000] custom-cursor rounded-full duration-100 fixed top-0 left-0 sm:flex items-center justify-center invisible opacity-0 pointer-events-none hidden"
      ref={ref}
    >
      <div className="size-1 bg-black rounded-full pointer-events-none"></div>
    </div>
  );
};

export default Cursor;
