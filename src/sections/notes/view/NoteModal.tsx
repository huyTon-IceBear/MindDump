import { Modal, Text, TextInput, Button, Stack } from "@mantine/core";
import { useState, useEffect } from "react";
import { Note } from "@/types/note";
import { useNotesDispatch } from "@/context/NotesProvider";
import { ActionTypes } from "@/types/note";
import { notifications } from "@mantine/notifications";
import { NotificationMessages } from "@/constant/notification";

interface NoteModalProps {
  opened: boolean;
  onClose: () => void;
  note: Note | null;
}

export default function NoteModal({ opened, onClose, note }: NoteModalProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState("");
  const dispatch = useNotesDispatch();

  useEffect(() => {
    if (note) {
      setEditedText(note.text);
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      const updatedNote = {
        ...note,
        text: editedText,
      };
      dispatch({
        type: ActionTypes.CHANGE_NOTE,
        note: updatedNote,
      });
      notifications.show({
        position: "top-right",
        title: NotificationMessages.CHANGE_NOTE.title,
        message: NotificationMessages.CHANGE_NOTE.message,
        autoClose: 1500,
      });
      // Update the local state with the new text
      setEditedText(updatedNote.text);
    }
    setEditMode(false);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Note Detail" centered>
      <Stack>
        {editMode ? (
          <>
            <TextInput
              value={editedText}
              onChange={(event) => setEditedText(event.currentTarget.value)}
              placeholder="Edit your note"
            />
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <Text>{editedText}</Text>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
          </>
        )}
      </Stack>
    </Modal>
  );
}
