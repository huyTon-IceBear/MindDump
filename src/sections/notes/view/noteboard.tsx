import { NoteBoardProps } from "@/types/section";
import { List } from "@mantine/core";

export default function NoteBoard({ notes }: NoteBoardProps) {
  const notesList = notes.map((note) => (
    <List key={"note"}>
      <List.Item>{note}</List.Item>
    </List>
  ));
  return <>{notesList}</>;
}
