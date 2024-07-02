"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

const PublicWrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // SMOOTH SCROLL
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
};

export default PublicWrapper;
