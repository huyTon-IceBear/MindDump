import { List } from "@mantine/core";
import { useState } from "react";

type Props = {
  notes: string[];
};

export default function NoteBoard({ notes }: Props) {
  const notesList = notes.map((note) => (
    <List key={"note"}>
      <List.Item>{note}</List.Item>
    </List>
  ));
  return <>{notesList}</>;
}
