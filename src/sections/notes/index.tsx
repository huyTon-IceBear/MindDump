"use client";
import CustomInput from "@/components/CustomInput";
import { Container, Stack } from "@mantine/core";
import { useState } from "react";
import NoteBoard from "./view/noteboard";
import StarryBackground from "@/components/StarryBackground";
import TypeWriter from "@/components/TypeWriter";

export default function NoteView() {
  const [notes, setNotes] = useState<string[]>(["something stupid"]);
  function handleAddNote(note: string) {
    setNotes([...notes, note]);
  }
  return (
    <Container fluid>
      <Stack
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="md"
      >
        <StarryBackground />
        {/* <Stack w={400}>
        <CustomInput onComplete={handleAddNote} />
      </Stack>
      <NoteBoard notes={notes} />
      <TypeWriter /> */}
      </Stack>
    </Container>
  );
}
