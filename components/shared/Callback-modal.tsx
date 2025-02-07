'use client';

import Link from "next/link";
import {Button} from "@/components/ui/Button";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/Container";
import {Overlay} from "@/components/shared/Overlay";

export const CallbackModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <Overlay className="z-[90]" isOpen={isModalOpen}/>

      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Заказать обратный звонок
      </Button>

      <div className={cn(
        'absolute top-[64px] left-0 right-0 bg-white border-t border-t-gray-300  transition-all duration-300 ease-in-out z-[90]',
        isModalOpen ? 'visible opacity-100' : 'invisible opacity-0',
      )}>
        TEST
      </div>
    </>
  );
};






