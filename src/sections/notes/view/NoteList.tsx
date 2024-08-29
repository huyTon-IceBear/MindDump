import { useNotes } from "@/context/NotesProvider";
import { truncateText } from "@/utils";
import { Accordion, Box, Text, rem, ScrollArea } from "@mantine/core";
import { IconList } from "@tabler/icons-react";
import classes from "./NoteList.module.css";

export default function NoteBoard() {
  const { notes } = useNotes();

  const notesList = notes.map((note) => (
    <Accordion.Item key={note.id} value={truncateText(note.text, 50)}>
      <Accordion.Control>{truncateText(note.text, 20)}</Accordion.Control>
      <Accordion.Panel>{note.text}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box className={classes.notes}>
      <ScrollArea type="never" h={350} offsetScrollbars={false}>
        <div className={classes.inner}>
          <div className={classes.header}>
            <IconList
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
            <Text className={classes.title}>List of Notes</Text>
          </div>
          <div className={classes.body}>
            <Accordion>{notesList}</Accordion>
          </div>
        </div>
      </ScrollArea>
    </Box>
  );
}
