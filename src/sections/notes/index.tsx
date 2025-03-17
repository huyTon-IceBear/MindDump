"use client";
import CustomInput from "@/components/CustomInput";
import NoteCard from "@/components/NoteCard";
import StarryBackground from "@/components/StarryBackground";
import TypeWriter from "@/components/TypeWriter";
import { AppIntro } from "@/constant/text";
import { useNotes } from "@/context/NotesProvider";
import {
  Box,
  Button,
  Container,
  Grid,
  Space,
  Stack,
  Transition,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import Note from "./view/Note";
import { Note as NoteType } from "@/types/note";
import { useDisclosure } from "@mantine/hooks";
import NoteModal from "./view/NoteModal";

export default function NoteView() {
  const [showTypeWriter, setShowTypeWriter] = useState(true);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [skipTypewriter, setSkipTypewriter] = useState(false);
  const { notes } = useNotes();

  const [opened, { open, close }] = useDisclosure(false); // Move state management here
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null); // Store selected note

  useEffect(() => {
    if (notes.length > 0) {
      setShowTypeWriter(false);
    }
  }, [notes]);

  const handleSkip = useCallback(() => {
    setShowTypeWriter(false);
  }, []);

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterComplete(true);
  }, []);

  const handlePageClick = useCallback(() => {
    if (showTypeWriter && !typewriterComplete) {
      setSkipTypewriter(true);
      setTypewriterComplete(true);
    }
  }, [showTypeWriter, typewriterComplete]);

  useEffect(() => {
    document.addEventListener("click", handlePageClick);
    return () => {
      document.removeEventListener("click", handlePageClick);
    };
  }, [handlePageClick]);

  return (
    <Container fluid onClick={handlePageClick}>
      <Stack align="center" justify="center" gap="md">
        <StarryBackground />
        <Stack w={600}>
          {showTypeWriter ? (
            <Box>
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
                      skip={skipTypewriter}
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
            </Box>
          ) : (
            <CustomInput />
          )}
        </Stack>
      </Stack>
      <Space h="xl" />

      <Grid gutter={{ base: 10, md: "md", lg: "lg" }}>
        {notes.map((note) => (
          <Grid.Col key={note.id} span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
            <NoteCard
              note={note}
              handleClick={() => {
                setSelectedNote(note);
                open();
              }}
            />
          </Grid.Col>
        ))}
      </Grid>
      {selectedNote && (
        <NoteModal
          opened={opened}
          onClose={close}
          note={selectedNote} // Pass the selected note to the modal
        />
      )}
      <Note />
    </Container>
  );
}
