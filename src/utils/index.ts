import { UploadedImage } from "@/types/note";

export function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
}

export const handleRemoveImage = (
  setFiles: React.Dispatch<React.SetStateAction<UploadedImage[]>>,
) => {
  return (imageId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== imageId));
  };
};
