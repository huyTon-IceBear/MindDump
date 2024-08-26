import { useNotes } from "@/context/NotesProvider";
import { truncateText } from "@/utils";
import { Accordion, Box, List, ScrollArea } from "@mantine/core";

export default function NoteBoard() {
  const { notes } = useNotes();

  const notesList = notes.map((note) => (
    <Accordion.Item key={note.id} value={truncateText(note.text, 50)}>
      <Accordion.Control>{truncateText(note.text, 20)}</Accordion.Control>
      <Accordion.Panel>{note.text}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box>
      <ScrollArea type="never" offsetScrollbars={false}>
        <Accordion>{notesList}</Accordion>
      </ScrollArea>
    </Box>
  );
}
