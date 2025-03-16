import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { ImageDropzoneProps } from "@/types/component";
import { v4 as uuidv4 } from "uuid";

export default function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/svg+xml": [".svg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => {
      const filesWithUrl = acceptedFiles.map((file) => {
        const src = URL.createObjectURL(file);
        const id = uuidv4();

        // Create an image element to load and get the dimensions
        const img = new Image();
        img.src = src;

        return new Promise<any>((resolve) => {
          img.onload = () => {
            resolve({
              ...file,
              src,
              id,
              width: img.width,
              height: img.height,
            });
          };
        });
      });

      // Wait for all images to load and get their dimensions
      Promise.all(filesWithUrl).then((filesWithDimensions) => {
        onDrop(filesWithDimensions); // Pass the data with width and height
      });
    },
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <ActionIcon variant="default" aria-label="Upload">
          <IconUpload style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
    </section>
  );
}
