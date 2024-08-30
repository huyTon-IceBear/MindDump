"use client";
import CustomInput from "@/components/CustomInput";
import { Button, Container, Stack, Transition } from "@mantine/core";
import StarryBackground from "@/components/StarryBackground";
import TypeWriter from "@/components/TypeWriter";
import { useState, useEffect } from "react";
import { AppIntro } from "@/constant/text";
import Note from "./view/Note";

export default function NoteView() {
  const [showTypeWriter, setShowTypeWriter] = useState(true);
  const [typewriterComplete, setTypewriterComplete] = useState(false);

  const handleSkip = () => {
    setShowTypeWriter(false);
  };

  const handleTypewriterComplete = () => {
    setTypewriterComplete(true);
  };

  return (
    <Container fluid>
      <Stack align="center" justify="center" gap="md">
        <StarryBackground />
        <Stack w={600}>
          {showTypeWriter ? (
            <>
              <Transition
                mounted={showTypeWriter}
                transition="fade"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => (
                  <div style={styles}>
                    <TypeWriter
                      text={[AppIntro.line1, AppIntro.line2]}
                      speed={50}
                      onComplete={handleTypewriterComplete}
                    />
                    <Transition
                      mounted={typewriterComplete}
                      transition="fade"
                      duration={400}
                      timingFunction="ease"
                    >
                      {(buttonStyles) => (
                        <div style={buttonStyles}>
                          <Button mt={20} onClick={handleSkip}>
                            Start writing
                          </Button>
                        </div>
                      )}
                    </Transition>
                  </div>
                )}
              </Transition>
            </>
          ) : (
            <CustomInput />
          )}
        </Stack>
      </Stack>
      <Note />
    </Container>
  );
}
