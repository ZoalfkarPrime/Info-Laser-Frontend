"use client";

import React from "react";
import {
  Dialog, DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {ClassName} from "@/types/types";
import {ShoppingCart} from "lucide-react";
import {DialogContentCallbackModal} from "@/components/shared/modals/DialogContentCallbackModal";
import {Button} from "@/components/ui/Button";

type CallbackBtnProps = {
  children: React.ReactNode;
} & ClassName;

export const PrePurchaseBtn: React.FC<CallbackBtnProps> = ({children}) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"violet"}>
          <ShoppingCart className="w-5 h-5 mr-3 text-white transition-colors"/>
          {children}
        </Button>
      </DialogTrigger>
      <DialogDescription className="hidden"></DialogDescription>
      <DialogContentCallbackModal/>
    </Dialog>

  );
};
