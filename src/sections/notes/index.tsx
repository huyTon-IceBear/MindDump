"use client";
import CustomInput from "@/components/CustomInput";
import { Container, Stack } from "@mantine/core";
import StarryBackground from "@/components/StarryBackground";
import TypeWriter from "@/components/TypeWriter";
import { useEffect } from "react";
import { AppIntro } from "@/constant/text";
import { useLocalStorage } from "@mantine/hooks";
import Note from "./view/Note";

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
        <Stack w={400}>
          {!hasRenderIntro && <TypeWriter text={AppIntro.line1} speed={50} />}
          <CustomInput />
        </Stack>
      </Stack>
      <Note />
    </Container>
  );
}
