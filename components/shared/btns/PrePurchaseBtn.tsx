import React from "react";
import {Button} from "@/components/ui/Button";
import {
  Dialog,
  DialogContent, DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {cn} from "@/lib/utils";
import {ClassName} from "@/types/types";
import {ShoppingCart} from "lucide-react";

type CallbackBtnProps = {
  title: string;
} & ClassName;

export const PrePurchaseBtn: React.FC<CallbackBtnProps> = ({title, className}) => {

  return (
    <Dialog>

      <DialogTrigger asChild>
        <button className={cn(
          "relative flex items-center justify-center rounded-3xl text-white bg-[var(--violet)] transition-colors py-3 px-4",
          "hover:cursor-pointer hover:bg-[var(--violet)]/30 hover:text-[var(--violet)] hover:[&>svg]:text-[var(--violet)]",
          className
        )}>
          <ShoppingCart className="w-5 h-5 mr-3 text-white transition-colors"/>
          {title}
        </button>
      </DialogTrigger>

      <DialogDescription className="hidden"></DialogDescription>

      <DialogContent>
        <DialogTitle>Заказать обратный звонок</DialogTitle>

        <form>
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="tel"
            placeholder="Ваш телефон"
            className="w-full border p-2 rounded mb-3"
          />
          <Button type="submit" className="w-full">
            Отправить
          </Button>
        </form>
      </DialogContent>

    </Dialog>
  );
};
