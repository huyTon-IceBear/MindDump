import { useNotes, useNotesDispatch } from "@/context/NotesProvider";
import { Box, Text, rem, ScrollArea, Flex, ActionIcon } from "@mantine/core";
import { IconList, IconTrash } from "@tabler/icons-react";
import classes from "./NoteList.module.css";
import { ActionTypes } from "@/types/note";
import NoteAccordion from "./NoteAccordion";
import { notifications } from "@mantine/notifications";
import { NotificationMessages } from "@/constant/notification";
import EmptyNote from "./EmptyNote";

export default function NoteBoard() {
  const dispatch = useNotesDispatch();
  const { notes } = useNotes();

  return (
    <Box className={classes.notes}>
      <ScrollArea type="never" h={350} offsetScrollbars={false}>
        <div className={classes.inner}>
          <div className={classes.header}>
            <Flex align={"center"}>
              <IconList
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
              <Text className={classes.title}>List of Notes</Text>
            </Flex>
            <ActionIcon
              variant="transparent"
              aria-label="Delete Notes"
              onClick={() => {
                dispatch({ type: ActionTypes.REMOVE_NOTES });
                notifications.show({
                  position: "top-right",
                  title: NotificationMessages.REMOVE_NOTES.title,
                  message: NotificationMessages.REMOVE_NOTES.message,
                  autoClose: 1500,
                });
              }}
            >
              <IconTrash
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </ActionIcon>
          </div>
          {notes.length === 0 ? <EmptyNote /> : <NoteAccordion />}
        </div>
      </ScrollArea>
    </Box>
  );
}
