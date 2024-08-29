import React, { useState } from "react";
import { Textarea } from "@mantine/core";
import { useNotesDispatch } from "@/context/NotesProvider";
import { ActionTypes } from "@/types/note";

export default function CustomInput() {
  const [value, setValue] = useState("");

  const dispatch = useNotesDispatch();

  // Function to handle key press (specifically the "Enter" key)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of adding a newline
      // Check if the input value is not empty
      if (value.trim() !== "") {
        dispatch({ type: ActionTypes.ADD_NOTE, text: value });
        setValue(""); // Clear the input after dispatching the action
      }
    }
  };

  // Function to handle text area value change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <Textarea
      value={value}
      label="What's on your mind?"
      placeholder="Start typing your thoughts..."
      onChange={handleChange} // Handle input changes
      onKeyDown={handleKeyDown} // Handle key presses
      autosize
      minRows={2}
      maxRows={4}
    />
  );
}
