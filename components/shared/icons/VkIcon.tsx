import React from "react";
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";

export const VkIcon: React.FC<ClassName> = ({className}) => {
  return (
    <svg
      className={cn("", className)}
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.5C0.162429 8.62067 4.05986 13.5 10.8931 13.5H11.2806V8.85466C13.7914 9.11466 15.6901 11.0271 16.4521 13.5H20C19.0256 9.80367 16.4646 7.76121 14.8656 6.97977C16.4646 6.01777 18.7131 3.67489 19.2503 0.5H16.0273C15.3277 3.07689 13.2543 5.41832 11.2806 5.64076V0.5H8.05743V9.50468C6.05871 8.98468 3.53529 6.45978 3.42286 0.5H0Z"
      />
    </svg>
  );
};
