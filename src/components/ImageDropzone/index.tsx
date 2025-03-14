import React, { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import Carousel from "../Carousel";
import { FileWithUrl } from "@/types/component";

export default function ImageDropzone() {
  const [files, setFiles] = useState<FileWithUrl[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/svg+xml": [".svg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          })
        )
      );
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
