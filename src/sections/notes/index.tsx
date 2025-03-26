'use client'
import { Box, Button, Container, Flex, Grid, Space, Stack, Text, Transition as MantineTransition } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
// Framer Motion imports
import { IconPencil } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'

import CustomInput from '@/components/CustomInput'
import NoteCard from '@/components/NoteCard'
import StarryBackground from '@/components/StarryBackground'
import TypeWriter from '@/components/TypeWriter'
import { AppIntro } from '@/constant/text'
import { useNotes, useNotesDispatch } from '@/context/NotesProvider'
import { ActionTypes, Note as NoteType } from '@/types/note'

import Note from './view/Note'
import NoteModal from './view/NoteModal'

export default function NoteView() {
  const [showTypeWriter, setShowTypeWriter] = useState(true)
  const [typewriterComplete, setTypewriterComplete] = useState(false)
  const [skipTypewriter, setSkipTypewriter] = useState(false)
  const { notes } = useNotes()

  const [opened, { open, close }] = useDisclosure(false)
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null) // Store selected note

  // Memoize filtered notes to avoid unnecessary re-calculations.
  const pinnedNotes = useMemo(() => notes.filter((note) => note.pinned), [notes])
  const unpinnedNotes = useMemo(() => notes.filter((note) => !note.pinned), [notes])

  const dispatch = useNotesDispatch()

  const handleRemoveAllPinned = () => {
    pinnedNotes.map((note) => {
      const updatedNote = {
        ...note,
        pinned: !note.pinned,
      }

      dispatch({
        type: ActionTypes.CHANGE_NOTE,
        note: updatedNote,
      })
    })
  }

  useEffect(() => {
    if (notes.length > 0) {
      setShowTypeWriter(false)
    }
  }, [notes])

  const handleSkip = useCallback(() => {
    setShowTypeWriter(false)
  }, [])

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterComplete(true)
  }, [])

  const handlePageClick = useCallback(() => {
    if (showTypeWriter && !typewriterComplete) {
      setSkipTypewriter(true)
      setTypewriterComplete(true)
    }
  }, [showTypeWriter, typewriterComplete])

  useEffect(() => {
    document.addEventListener('click', handlePageClick)
    return () => {
      document.removeEventListener('click', handlePageClick)
    }
  }, [handlePageClick])

  return (
    <Container fluid onClick={handlePageClick}>
      <Stack align="center" justify="center" gap="md">
        <StarryBackground />
        <Stack w={600}>
          {showTypeWriter ? (
            <Box>
              <MantineTransition mounted={showTypeWriter} transition="fade" duration={400} timingFunction="ease">
                {(styles) => (
                  <div style={styles}>
                    <TypeWriter
                      text={[AppIntro.line1, AppIntro.line2]}
                      speed={50}
                      onComplete={handleTypewriterComplete}
                      skip={skipTypewriter}
                    />
                    <MantineTransition mounted={typewriterComplete} transition="fade" duration={400} timingFunction="ease">
                      {(buttonStyles) => (
                        <div style={buttonStyles}>
                          <Button mt={20} onClick={handleSkip} leftSection={<IconPencil size={24} />}>
                            Start writing
                          </Button>
                        </div>
                      )}
                    </MantineTransition>
                  </div>
                )}
              </MantineTransition>
            </Box>
          ) : (
            <CustomInput />
          )}
        </Stack>
      </Stack>

      <Space h="xl" />

      <Stack>
        {/* Pinned Section */}
        <AnimatePresence>
          {pinnedNotes.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Flex gap="md" align="center">
                <Text size="xs" c="dimmed" fw={700}>
                  PINNED
                </Text>
                <Button
                  variant="transparent"
                  onClick={() => {
                    handleRemoveAllPinned()
                  }}
                >
                  <Text size="xs" c="dimmed" fw={700} td="underline">
                    Remove all pins
                  </Text>
                </Button>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
        {pinnedNotes.length > 0 && (
          <Grid gutter={{ base: 10, md: 'md', lg: 'lg' }}>
            {pinnedNotes.map((note) => (
              <Grid.Col
                key={note.id}
                span={{ base: 12, sm: 6, md: 3, lg: 2 }}
                // Wrap each note card in a motion.div with layout enabled
              >
                <motion.div layout>
                  <NoteCard
                    note={note}
                    handleClick={() => {
                      setSelectedNote(note)
                      open()
                    }}
                  />
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        )}

        <Space h="xl" />

        {/* Others Section */}
        <AnimatePresence>
          {unpinnedNotes.length > 0 && pinnedNotes.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Text size="xs" c="dimmed" fw={700}>
                OTHERS
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
        {unpinnedNotes.length > 0 && (
          <Grid gutter={{ base: 10, md: 'md', lg: 'lg' }}>
            {unpinnedNotes.map((note) => (
              <Grid.Col key={note.id} span={{ base: 12, sm: 6, md: 3, lg: 2 }}>
                <motion.div layout>
                  <NoteCard
                    note={note}
                    handleClick={() => {
                      setSelectedNote(note)
                      open()
                    }}
                  />
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Stack>

      {selectedNote && <NoteModal opened={opened} onClose={close} note={selectedNote} />}

      <Note />
    </Container>
  )
}
