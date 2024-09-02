import { useNotes, useNotesDispatch } from "@/context/NotesProvider";
import { truncateText } from "@/utils";
import {
  Accordion,
  Box,
  Text,
  rem,
  ScrollArea,
  Flex,
  ActionIcon,
  Center,
  AccordionControlProps,
  useCombobox,
  Combobox,
  Button,
} from "@mantine/core";
import { IconList, IconTrash, IconDots } from "@tabler/icons-react";
import classes from "./NoteList.module.css";
import { ActionTypes } from "@/types/note";

const noteOptions = ["Edit", "Remove", "View", "Copy"];

export default function NoteBoard() {
  const { notes } = useNotes();
  const dispatch = useNotesDispatch();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = noteOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const notesList = notes.map((note) => (
    <Accordion.Item key={note.id} value={note.id}>
      <AccordionControl>{truncateText(note.text, 20)}</AccordionControl>
      <Accordion.Panel>{note.text}</Accordion.Panel>
    </Accordion.Item>
  ));

  function AccordionControl(props: AccordionControlProps) {
    return (
      <Center>
        <Accordion.Control {...props} />
        <ActionIcon size="lg" variant="subtle" color="gray">
          <Combobox
            store={combobox}
            width={100}
            position="bottom-end"
            withArrow
            onOptionSubmit={(val) => {
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <IconDots size="1rem" onClick={() => combobox.toggleDropdown()} />
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </ActionIcon>
      </Center>
    );
  }

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
            <Accordion chevronPosition="left">{notesList}</Accordion>
          </div>
        </div>
      </ScrollArea>
    </Box>
  );
}
