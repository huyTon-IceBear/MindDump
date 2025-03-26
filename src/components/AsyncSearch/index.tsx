import { ActionIcon, Highlight, Modal, rem, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { useNotes } from '@/context/NotesProvider'
import { Note } from '@/types/note'
import { truncateText } from '@/utils'

import classes from './AsyncSearch.module.css'

export default function AsyncSearch() {
  const [opened, { open, close }] = useDisclosure(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const { notes } = useNotes()
  const [selectedNote, setSelectedNote] = useState<Note | null>(null) // Store selected note

  useEffect(() => {
    const filtered = notes.filter((note) => note.text.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredNotes(filtered)
  }, [searchQuery, notes])

  const handleClick = (note: Note) => {
    close()
    setSelectedNote(note)
  }

  function ListItem() {
    return (
      <>
        {filteredNotes.map((item) => (
          <Stack
            key={item.id}
            className={classes.item}
            onClick={() => {
              handleClick(item)
            }}
          >
            <Highlight className={classes.linkTitle} highlight={searchQuery}>
              {truncateText(item.text, 50)}
            </Highlight>
            <Highlight className={classes.linkDescription} highlight={searchQuery}>
              {truncateText(item.text, 200)}
            </Highlight>
          </Stack>
        ))}
      </>
    )
  }

  return (
    <>
      {/* {selectedNote && (
        <NoteModal
          opened={false}
          onClose={close}
          note={selectedNote} // Pass the selected note to the modal
        />
      )} */}
      <Modal opened={opened} onClose={close} size="lg" withCloseButton={false}>
        <TextInput
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          leftSection={
            <ActionIcon variant="filled" color="transparent">
              <IconSearch size="1rem" />
            </ActionIcon>
          }
        />
        <ListItem />
      </Modal>
      <ActionIcon variant="transparent" aria-label="Search Notes" onClick={open}>
        <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </ActionIcon>
    </>
  )
}
