import { useNotes, useNotesDispatch } from "@/context/NotesProvider";
import { ActionOptions, ActionTypes, Note } from "@/types/note";
import { truncateText } from "@/utils";
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Center,
  Menu,
} from "@mantine/core";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { IconDots, IconEye, IconTrash, IconCopy } from "@tabler/icons-react";
import NoteModal from "./NoteModal";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { NotificationMessages } from "@/constant/notification";

function AccordionControl({
  note,
  onView,
  ...props
}: {
  note: Note;
  onView: () => void;
} & AccordionControlProps) {
  const dispatch = useNotesDispatch();
  const clipboard = useClipboard({ timeout: 500 });

  const handleSelectOption = (option: ActionOptions) => {
    switch (option) {
      case ActionOptions.View:
        onView(); // Use the open function here
        break;
      case ActionOptions.Copy:
        clipboard.copy(note.text);
        notifications.show({
          position: "top-right",
          title: NotificationMessages.COPY_NOTE.title,
          message: NotificationMessages.COPY_NOTE.message,
        });
        break;
      case ActionOptions.Remove:
        dispatch({ type: ActionTypes.DELETE_NOTE, id: note.id });
        break;
    }
  };

  return (
    <>
      <Center>
        <Accordion.Control {...props} onClick={(e) => e.stopPropagation()} />
        <Menu shadow="md" width={100} position="bottom-end">
          <Menu.Target>
            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEye size={14} />}
              onClick={(e) => {
                handleSelectOption(ActionOptions.View);
              }}
            >
              View
            </Menu.Item>
            <Menu.Item
              leftSection={<IconCopy size={14} />}
              onClick={() => handleSelectOption(ActionOptions.Copy)}
            >
              Copy
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              onClick={() => handleSelectOption(ActionOptions.Remove)}
              color="red"
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Center>
    </>
  );
}

export default function NoteAccordion() {
  const { notes } = useNotes();
  const [opened, { open, close }] = useDisclosure(false); // Move state management here
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // Store selected note
  const handleView = (note: Note) => {
    setSelectedNote(note); // Set the selected note
    open(); // Open the modal
  };

  return (
    <>
      <Accordion chevronPosition="left">
        {notes.map((note) => (
          <Accordion.Item key={note.id} value={note.id}>
            <AccordionControl note={note} onView={() => handleView(note)}>
              {truncateText(note.text, 20)}
            </AccordionControl>
            <Accordion.Panel>{note.text}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {selectedNote && (
        <NoteModal
          opened={opened}
          onClose={close}
          note={selectedNote} // Pass the selected note to the modal
        />
      )}
    </>
  );
}
