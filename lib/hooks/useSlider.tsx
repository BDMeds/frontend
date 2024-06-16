import { useRef } from "react";

const useSlider = (slideAmount?: number) => {
  const ref = useRef<HTMLDivElement>(null);

  const slideLeft = () => ref.current && (ref.current.scrollLeft -= slideAmount ? slideAmount : 500);
  const slideRight = () => ref.current && (ref.current.scrollLeft += slideAmount ? slideAmount : 500);

  return { slider: ref, slideLeft, slideRight };
};

export default useSlider;
