import React, { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Image, ActionIcon, Modal, Box } from "@mantine/core";
import { CarouselProps, FileWithUrl } from "@/types/component";
import { IconTrash, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import classes from "./Carousel.module.css";

export default function Carousel({ sliderData, onDelete }: CarouselProps) {
  const [hovered, setHovered] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div className={classes.embla}>
        {/* Navigation Buttons */}
        <ActionIcon className="embla__prev" onClick={scrollPrev}>
          <IconArrowLeft />
        </ActionIcon>
        <ActionIcon className="embla__next" onClick={scrollNext}>
          <IconArrowRight />
        </ActionIcon>
        <div className={classes.embla__viewport} ref={emblaRef}>
          <div className={classes.embla__container}>
            {sliderData.map((item: FileWithUrl) => (
              <div className={classes.embla__slide} key={item.id}>
                {/* Image */}
                <Box
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <Image
                    src={item.url}
                    alt=""
                    onClick={() => setFullscreenImage(item.url)}
                    className=""
                    loading="lazy"
                  />
                  {/* Delete Button (Visible on Hover) */}
                  {hovered && (
                    <ActionIcon
                      variant="filled"
                      color="red"
                      size="sm"
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                      }}
                      onClick={() => {
                        onDelete(item.id);
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  )}
                </Box>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Modal
        opened={!!fullscreenImage}
        onClose={() => setFullscreenImage(null)}
        size="auto"
      >
        <Image src={fullscreenImage || ""} alt="Fullscreen Preview" />
      </Modal>
    </div>
  );
}
