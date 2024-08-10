"use client";
import CustomInput from "@/components/CustomInput";
import { Text } from "@mantine/core";
import { useState } from "react";
import NoteBoard from "./view/noteboard";

export default function NoteView() {
  const [notes, setNotes] = useState<string[]>(["something stupid"]);

  function handleAddNote(note: string) {
    setNotes([...notes, note]);
  }
  return (
    <>
      <Text size="xs">Start writing down your though</Text>
      <CustomInput onComplete={handleAddNote} />
      <NoteBoard notes={notes} />
    </>
  );
}
