import { NotificationMessages } from "@/constant/notification";
import { useNotesDispatch } from "@/context/NotesProvider";
import { ActionTypes } from "@/types/note";

import { Box, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import ImageDropzone from "../ImageDropzone";
import Carousel from "../Carousel";
import { UploadedImage } from "@/types/note";
import { handleRemoveImage } from "@/utils";

export default function CustomInput() {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<UploadedImage[]>([]);

  const dispatch = useNotesDispatch();

  // Function to handle key press (specifically the "Enter" key)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of adding a newline
      // Check if the input value is not empty
      if (value.trim() !== "") {
        dispatch({
          type: ActionTypes.ADD_NOTE,
          text: value,
          mediaFiles: files,
        });
        notifications.show({
          position: "top-right",
          title: NotificationMessages.ADD_NOTE.title,
          message: NotificationMessages.ADD_NOTE.message,
          autoClose: 1500,
        });
        setValue(""); // Clear the input after dispatching the action
        setFiles([]);
      }
    }
  };

  // Function to handle text area value change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  const removeImage = handleRemoveImage(setFiles);

  return (
    <Box
      bd={"1px solid rgb(95,99,104)"}
      bg="rgb(32,33,36)"
      style={{ borderRadius: "10px", boxShadow: "0 3px 5px rgba(0,0,0,.20)" }}
    >
      <Textarea
        variant="unstyled"
        value={value}
        label="What's on your mind?"
        placeholder="Start typing your thoughts..."
        onChange={handleChange} // Handle input changes
        onKeyDown={handleKeyDown} // Handle key presses
        autosize
        minRows={2}
        maxRows={4}
        radius={0}
        px={"xs"}
        pt={"sm"}
        rightSection={
          <ImageDropzone
            onDrop={(newFiles) =>
              setFiles((prevFiles) => [...prevFiles, ...newFiles])
            }
          />
        }
      />
      {files.length > 0 && (
        <Carousel sliderData={files} onDelete={removeImage} />
      )}
    </Box>
  );
}
