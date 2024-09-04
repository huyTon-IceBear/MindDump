import { useNotes, useNotesDispatch } from "@/context/NotesProvider";
import {
  ActionOptions,
  ActionTypes,
  Note,
  NoteActionOptions,
} from "@/types/note";
import { truncateText } from "@/utils";
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Center,
  Combobox,
  useCombobox,
} from "@mantine/core";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { IconDots } from "@tabler/icons-react";

function AccordionControl(props: { note: Note } & AccordionControlProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useNotesDispatch();
  const clipboard = useClipboard({ timeout: 500 });

  const itemCombobox = useCombobox({
    onDropdownClose: () => itemCombobox.resetSelectedOption(),
  });

  function handleSelectOption(option: string, note: Note) {
    console.log("Option selected:", option); // Debug log
    switch (option) {
      case ActionOptions.View:
        console.log("Viewing note:", note.id);
        // setSelect(note);
        open();
        break;
      case ActionOptions.Copy:
        console.log("Copying note:", note.id);
        clipboard.copy(note.text);
        break;
      case ActionOptions.Edit:
        console.log("Editing note:", note.id);
        // setSelect(note);
        open();
        break;
      case ActionOptions.Remove:
        console.log("Removing note:", note.id);
        dispatch({ type: ActionTypes.DELETE_NOTE, id: note.id });
        break;
    }
    itemCombobox.closeDropdown(); // Explicitly close the dropdown
  }

  const options = NoteActionOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Center>
      <Accordion.Control {...props} />
      <ActionIcon size="lg" variant="subtle" color="gray">
        <Combobox
          store={itemCombobox}
          width={100}
          position="bottom-end"
          withArrow
          onOptionSubmit={(val) => {
            console.log("Option submitted:", val); // Debug log
            handleSelectOption(val, props.note);
          }}
        >
          <Combobox.Target>
            <IconDots
              size="1rem"
              onClick={() => itemCombobox.toggleDropdown()}
            />
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </ActionIcon>
    </Center>
  );
}

export default function NoteAccordion() {
  const { notes } = useNotes();

  return (
    <Accordion chevronPosition="left">
      {notes.map((note) => (
        <Accordion.Item key={note.id} value={note.id}>
          <AccordionControl note={note}>
            {truncateText(note.text, 20)}
          </AccordionControl>
          <Accordion.Panel>{note.text}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
