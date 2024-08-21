import { useNotes } from "@/context/NotesProvider";
import { NoteBoardProps } from "@/types/section";
import { List } from "@mantine/core";

export default function NoteBoard() {
  const { notes } = useNotes();

  const notesList = notes.map((note) => (
    <List key={"note"}>
      <List.Item>{note.text}</List.Item>
    </List>
  ));
  return <>{notesList}</>;
}
