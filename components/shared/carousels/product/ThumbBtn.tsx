import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";

interface ThumbProps {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: { url: string; alt: string; type?: string; thumbnail?: string };
}

export const ThumbBtn: React.FC<ThumbProps> = ({selected, onClick, image}) => {
  return (
    <div
      className={cn(
        "w-20 h-20 border rounded-2xl overflow-hidden transition",
        selected ? "!border-[var(--violet)]" : ""
      )}>

      <button onClick={onClick} className="w-full h-full flex items-center justify-center">
        <Image src={image.url} alt={image.alt} width={80} height={80}/>
      </button>
    </div>
  );
};
