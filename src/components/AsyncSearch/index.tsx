import { useNotes } from "@/context/NotesProvider";
import { Note } from "@/types/note";
import { truncateText } from "@/utils";
import {
  ActionIcon,
  List,
  Modal,
  rem,
  TextInput,
  Text,
  Highlight,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "./AsyncSearch.module.css";

export default function AsyncSearch() {
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

  function ListItem() {
    return (
      <>
        {filteredNotes.map((item) => (
          <Stack key={item.id} className={classes.item}>
            <Highlight className={classes.linkTitle} highlight={searchQuery}>
              {truncateText(item.text, 50)}
            </Highlight>
            <Highlight
              className={classes.linkDescription}
              highlight={searchQuery}
            >
              {truncateText(item.text, 200)}
            </Highlight>
          </Stack>
        ))}
      </>
    );
  }

  return (
    <>
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
