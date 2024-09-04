import { useNotesDispatch } from "@/context/NotesProvider";
import { Box, Text, rem, ScrollArea, Flex, ActionIcon } from "@mantine/core";
import { IconList, IconTrash } from "@tabler/icons-react";
import classes from "./NoteList.module.css";
import { ActionTypes } from "@/types/note";
import NoteAccordion from "./NoteAccordion";

export default function NoteBoard() {
  const dispatch = useNotesDispatch();

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
              }}
            >
              <IconTrash
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </ActionIcon>
          </div>
          <div className={classes.body}>
            <NoteAccordion />
          </div>
        </div>
      </ScrollArea>
    </Box>
  );
}
