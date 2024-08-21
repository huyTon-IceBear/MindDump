"use client";
import CustomInput from "@/components/CustomInput";
import { Container, Stack } from "@mantine/core";
import NoteBoard from "./view/noteboard";
import StarryBackground from "@/components/StarryBackground";
import TypeWriter from "@/components/TypeWriter";

export default function NoteView() {
  return (
    <Container fluid>
      <Stack
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="md"
      >
        <StarryBackground />
        <Stack w={400}>
          <CustomInput />
        </Stack>
        <NoteBoard />
        {/* 
      <TypeWriter /> */}
      </Stack>
    </Container>
  );
}
