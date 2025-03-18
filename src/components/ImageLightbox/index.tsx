import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageLightboxProps } from "@/types/component";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function ImageLightbox({
  onClose,
  images,
  selectedIndex = 0,
}: ImageLightboxProps) {
  console.log("images", images);
  const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
  const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  function nextImageUrl(src: string, size: number) {
    // Remove "blob:" if the URL starts with it
    if (src.startsWith("blob:")) {
      src = src.substring(5);
    }

    return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
  }

  const slides = images.map(({ src, width, height }) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    srcSet: [...imageSizes, ...deviceSizes]
      .filter((size) => size <= width)
      .map((size) => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  return (
    <Lightbox
      open={true}
      index={selectedIndex}
      close={onClose}
      slides={images}
      plugins={[Zoom]}
    />
  );
}
