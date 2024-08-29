import { Popover, Button, Text, ActionIcon } from "@mantine/core";
import { IconNotes } from "@tabler/icons-react";
import NoteBoard from "./NoteList";
import { useState } from "react";
import classes from "./Note.module.css";

export default function Note() {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      width={200}
      opened={opened}
      onClose={() => setOpened(false)}
      position="top-end"
      offset={{ mainAxis: 7, crossAxis: 0 }}
    >
      <Popover.Target>
        <ActionIcon
          variant="filled"
          aria-label="Notes"
          size="lg"
          radius="xl"
          onClick={() => setOpened((prev) => !prev)}
          className={classes.button}
        >
          <IconNotes style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown className={classes.dropdown}>
        <NoteBoard />
      </Popover.Dropdown>
    </Popover>
  );
}
