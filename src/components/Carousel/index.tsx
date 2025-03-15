import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Image,
  ActionIcon,
  Modal,
  Box,
  Group,
  Text,
  NumberInput,
} from "@mantine/core";
import { CarouselProps, FileWithUrl } from "@/types/component";
import { IconTrash, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import classes from "./Carousel.module.css";
import { useClickOutside } from "@mantine/hooks";

export default function Carousel({ sliderData, onDelete }: CarouselProps) {
  const [hovered, setHovered] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string | number>("");

  const ref = useClickOutside(() => {
    setIsEditing(false);
    setValue(selectedIndex + 1);
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setSelectedIndex((prev) => Math.min(prev + 1, sliderData.length - 1));
    }
  }, [emblaApi, sliderData.length]);

  const totalSlides = sliderData.length;

  const handleIndicatorClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of adding a newline
      // Check if the input value is not empty
      if (typeof value === "number") {
        setSelectedIndex(value - 1);
        emblaApi && emblaApi.scrollTo(value - 1);
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="relative">
      {/* Carousel */}
      <div className={classes.embla}>
        <div className={classes.embla__viewport} ref={emblaRef}>
          <div className={classes.embla__container}>
            {sliderData.map((item: FileWithUrl) => (
              <div className={classes.embla__slide} key={item.id}>
                {/* Image */}
                <Box
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%", // Ensures it takes full width of parent
                    height: "200px", // Matches the image height
                    overflow: "hidden",
                    backgroundColor: "white",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <Image
                    src={item.url}
                    h={200}
                    alt="slide_image"
                    onClick={() => setFullscreenImage(item.url)}
                    loading="lazy"
                    w="auto"
                    fit="contain"
                  />
                  {/* Delete Button (Visible on Hover) */}
                  {hovered && (
                    <ActionIcon
                      variant="default"
                      size="sm"
                      style={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        opacity: 0.8,
                      }}
                      onClick={() => {
                        onDelete(item.id);
                      }}
                    >
                      <IconTrash
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  )}
                </Box>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation & Indicators */}
        <Group justify="space-between" mt="md">
          <ActionIcon
            variant="default"
            aria-label="prev__image"
            onClick={scrollPrev}
            style={{ borderRadius: "50%" }}
          >
            <IconArrowLeft
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>

          {/* Indicator with Click-to-Edit */}
          <Box
            className={classes.indicatorBox}
            onClick={handleIndicatorClick}
            style={{ height: "40px" }}
          >
            {isEditing ? (
              <NumberInput
                value={value}
                onChange={setValue} // Handle input changes
                onKeyDown={handleKeyDown} // Handle key presses
                suffix={" / " + totalSlides}
                min={1}
                max={totalSlides}
                clampBehavior="strict"
                hideControls
                ref={ref}
                styles={{
                  input: { textAlign: "center", width: "60px", padding: "4px" },
                }}
              />
            ) : (
              <Text size="sm">{selectedIndex + 1 + " / " + totalSlides}</Text>
            )}
          </Box>

          <ActionIcon
            variant="default"
            aria-label="next__image"
            onClick={scrollNext}
            style={{ borderRadius: "50%" }}
          >
            <IconArrowRight
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
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
