import React, { ReactNode } from "react";

interface IChip {
  children: ReactNode | ReactNode[];
}

function Chip(props: IChip) {
  return (
    <div className="w-fit h-fit px-2 py-0 flex flex-row items-center justify-center gap-0 bg-white/30 backdrop-blur-sm rounded-full shadow-[0px_0px_10px_-1px] shadow-white/50 border-[1px] border-white/10 text-sm">
      {props.children}
    </div>
  );
}

export default Chip;
