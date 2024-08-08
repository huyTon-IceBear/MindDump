import { useState } from "react";
import { TextInput } from "@mantine/core";

export default function CustomInput() {
  const [value, setValue] = useState("");

  return (
    <TextInput
      value={value}
      label="What's on your mind?"
      placeholder="Start typing your thoughts..."
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
}
