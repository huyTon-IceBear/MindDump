"use client";
import CustomInput from "@/components/CustomInput";
import { Button, Container, Stack, Transition } from "@mantine/core";
import NoteBoard from "./view/noteboard";
import StarryBackground from "@/components/StarryBackground";
import TypeWriter from "@/components/TypeWriter";
import { useEffect, useState } from "react";
import { AppIntro } from "@/constant/text";
import { useLocalStorage } from "@mantine/hooks";

export default function NoteView() {
  const [hasRenderIntro, setHasRenderIntro] = useLocalStorage({
    key: "render-intro",
    defaultValue: false,
  });

  useEffect(() => {
    if (!hasRenderIntro) {
      setHasRenderIntro(true);
    }
  }, [hasRenderIntro, setHasRenderIntro]);

  return (
    <Container fluid>
      <Stack
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="md"
      >
        <StarryBackground />

        {!hasRenderIntro && <TypeWriter text={AppIntro.line1} speed={50} />}

        <Stack w={400}>
          <CustomInput />
        </Stack>
        <NoteBoard />
      </Stack>
    </Container>
  );
}
