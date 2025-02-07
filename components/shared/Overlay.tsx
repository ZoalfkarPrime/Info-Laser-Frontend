import React from "react";
import {createPortal} from "react-dom";
import {cn} from "@/lib/utils";

interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

export const Overlay: React.FC<OverlayProps> = ({isOpen, onClose, className}) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={cn('fixed inset-0 bg-black/50 z-30', className)}
      onClick={onClose}
    />,
    document.body
  );
};
