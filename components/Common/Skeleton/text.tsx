import classNames from "classnames";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = {
  size?: "xs" | "small" | "medium" | "large";
  width?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const TextSkeleton: FC<Props> = ({ size = "small", width = "20px", className, ...rest }) => {
  let classes = `min-w-[${width}] bg-gray-600 flex-shrink-0 rounded-full animation-shine ${className ?? ""}`;

  switch (size) {
    case "xs":
      classes += " h-[5px] ";
      break;
    case "small":
      classes += " h-[10px] ";
      break;
    case "medium":
      classes += " h-[14px] ";
      break;
    case "large":
      classes += " h-[20px] ";
      break;
  }

  return <div className={classNames(classes)} {...rest}></div>;
};

export default TextSkeleton;
