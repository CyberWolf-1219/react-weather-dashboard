import React, { ReactNode } from "react";

const widthOptions = {
  full: "w-full",
  fit: "w-fit",
  auto: "w-auto",
};
const heightOptions = {
  full: "h-full",
  fit: "h-fit",
  auto: "h-auto",
};

interface ICard {
  width: "full" | "fit" | "auto";
  height: "full" | "fit" | "auto";
  children?: ReactNode | ReactNode[];
  classes?: string;
}

function Card(props: ICard) {
  return (
    <div
      className={`${widthOptions[props.width]} ${
        heightOptions[props.height]
      } p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-[0px_0px_8px_-1px] shadow-white/70  border-[1px] border-t-white/50 border-l-30 border-b-20 border-r-10  ${
        props.classes
      }`}
    >
      {props.children}
    </div>
  );
}

export default Card;
