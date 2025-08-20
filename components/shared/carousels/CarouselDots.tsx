import * as React from "react";
import {useCarousel} from "@/components/ui/Carousel";
import {cn} from "@/lib/utils";

export const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => {
  const {api} = useCarousel();
  const [, setUpdateState] = React.useState(false);
  const toggleUpdateState = React.useCallback(
    () => setUpdateState((prevState) => !prevState),
    []
  );

  React.useEffect(() => {
    if (api) {
      api.on("select", toggleUpdateState);
      api.on("reInit", toggleUpdateState);

      return () => {
        api.off("select", toggleUpdateState);
        api.off("reInit", toggleUpdateState);
      };
    }
  }, [api, toggleUpdateState]);

  const numberOfSlides = api?.scrollSnapList().length || 0;
  const currentSlide = api?.selectedScrollSnap() || 0;

  if (numberOfSlides > 1) {
    return (
      <div
        ref={ref}
        className={cn("flex justify-center", className)}
        {...props}
      >
        <div className={" inline-flex items-center rounded-full p-1 bg-[var(--violet-dark)]"}>
          {Array.from({length: numberOfSlides}, (_, i) => (
            <button
              key={i}
              className={cn(
                "mx-1 h-2 w-2 rounded-full !p-0 transition-all duration-300",
                i === currentSlide
                  ? "w-6 transform bg-[var(--violet)]"
                  : "bg-white hover:bg-[var(--violet)]"
              )}
              aria-label={`Перейти к слайду ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
});
CarouselDots.displayName = "CarouselDots";
