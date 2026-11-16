"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface DraggableTabsListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const DraggableTabsList = React.forwardRef<HTMLUListElement, DraggableTabsListProps>(
  ({ children, className, onClick, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, ...props }, ref) => {
    const dragState = useRef({
      pointerId: -1,
      startX: 0,
      startScrollLeft: 0,
      isDragging: false,
      suppressClick: false,
    });

    const handlePointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
      onPointerDown?.(event);

      if (event.button !== 0) return;

      dragState.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScrollLeft: event.currentTarget.scrollLeft,
        isDragging: false,
        suppressClick: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
      onPointerMove?.(event);

      const state = dragState.current;
      if (state.pointerId !== event.pointerId) return;

      const distance = event.clientX - state.startX;
      if (!state.isDragging && Math.abs(distance) < 4) return;

      state.isDragging = true;
      state.suppressClick = true;
      event.preventDefault();
      event.currentTarget.scrollLeft = state.startScrollLeft - distance;
    };

    const finishPointer = (event: React.PointerEvent<HTMLUListElement>) => {
      onPointerUp?.(event);
      onPointerCancel?.(event);

      const state = dragState.current;
      if (state.pointerId === event.pointerId && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      state.pointerId = -1;
    };

    const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
      onClick?.(event);

      if (dragState.current.suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        dragState.current.suppressClick = false;
      }
    };

    return (
      <ul
        {...props}
        ref={ref}
        className={cn("scrollbar-none cursor-grab select-none touch-pan-y active:cursor-grabbing", className)}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
      >
        {children}
      </ul>
    );
  }
);

DraggableTabsList.displayName = "DraggableTabsList";
