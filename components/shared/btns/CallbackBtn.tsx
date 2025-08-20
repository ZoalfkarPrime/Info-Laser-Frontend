import React from "react";
import {Button, buttonVariants} from "@/components/ui/Button";
import {Dialog, DialogDescription, DialogTrigger} from "@/components/ui/Dialog"
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {DialogContentCallbackModal} from "@/components/shared/modals/DialogContentCallbackModal";
import {VariantProps} from "class-variance-authority";

type CallbackBtnProps = {
  title: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
} & ClassName;

export const CallbackBtn: React.FC<CallbackBtnProps> = ({title, className, variant}) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant || "violetOutline"}
          className={cn("", className)}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogDescription className="hidden"></DialogDescription>
      <DialogContentCallbackModal/>
    </Dialog>
  );
};
