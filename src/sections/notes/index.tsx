"use client";
import CustomInput from "@/components/CustomInput";
import { Stack, Text } from "@mantine/core";
import { useState } from "react";
import NoteBoard from "./view/noteboard";
import Logo from "@/components/Logo";

export default function NoteView() {
  const [notes, setNotes] = useState<string[]>(["something stupid"]);

  function handleAddNote(note: string) {
    setNotes([...notes, note]);
  }
  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="md"
      mt={100}
    >
      <Stack w={400}>
        <CustomInput onComplete={handleAddNote} />
      </Stack>
      <NoteBoard notes={notes} />
    </Stack>
  );
}
