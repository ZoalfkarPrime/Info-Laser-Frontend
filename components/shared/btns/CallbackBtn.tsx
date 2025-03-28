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

type CallbackBtnProps = {
  title: string;
} & ClassName;

export const CallbackBtn: React.FC<CallbackBtnProps> = ({title, className}) => {

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className={cn("", className)}>
          {title}
        </Button>
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
