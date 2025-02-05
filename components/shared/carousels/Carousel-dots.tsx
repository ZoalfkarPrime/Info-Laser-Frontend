import * as React from "react";
import {Button} from "@/components/ui/Button";
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
        {Array.from({length: numberOfSlides}, (_, i) => (
          <Button
            key={i}
            className={cn(
              "mx-1 h-1.5 w-1.5 rounded-full p-0",
              i === currentSlide
                ? "scale-125 transform bg-[#007aff] hover:bg-[#007aff]"
                : "bg-gray-300 hover:bg-gray-300"
            )}
            aria-label={`Перейти к слайду ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
});
CarouselDots.displayName = "CarouselDots";
