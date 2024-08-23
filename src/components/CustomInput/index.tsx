import React, { useState } from "react";
import { TextInput } from "@mantine/core";
import { useNotesDispatch } from "@/context/NotesProvider";
import { ActionTypes } from "@/types/note";

export default function CustomInput() {
  const [value, setValue] = useState("");

  const dispatch = useNotesDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch({ type: ActionTypes.ADD_NOTE, text: value });
      setValue("");
    }
  };

  return (
    <TextInput
      value={value}
      label="What's on your mind?"
      placeholder="Start typing your thoughts..."
      onChange={(e) => setValue(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
