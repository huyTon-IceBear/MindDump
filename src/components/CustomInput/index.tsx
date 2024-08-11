import React, { useState } from "react";
import { TextInput } from "@mantine/core";

type Props = {
  onComplete: (note: string) => void;
};
export default function CustomInput({ onComplete }: Props) {
  const [value, setValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onComplete(value);
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
