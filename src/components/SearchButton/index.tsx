import { useNotes } from "@/context/NotesProvider";
import { Note } from "@/types/note";
import { truncateText } from "@/utils";
import { ActionIcon, List, Modal, rem, TextInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function SearchButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const { notes } = useNotes();

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  return (
    <>
      <Modal opened={opened} onClose={close} size="lg" withCloseButton={false}>
        <TextInput
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            <ActionIcon variant="filled" color="transparent">
              <IconSearch size="1rem" />
            </ActionIcon>
          }
        />
        <List spacing="xs" mt="md">
          {filteredNotes.map((note) => (
            <List.Item key={note.id}>
              <Text fw={700}>{truncateText(note.text, 50)}</Text>
              <Text fz="sm" c="dimmed">
                {truncateText(note.text, 200)}
              </Text>
            </List.Item>
          ))}
        </List>
      </Modal>
      <ActionIcon
        variant="transparent"
        aria-label="Search Notes"
        onClick={open}
      >
        <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
