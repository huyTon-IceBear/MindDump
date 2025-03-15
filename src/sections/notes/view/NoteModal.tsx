import Carousel from "@/components/Carousel";
import ImageDropzone from "@/components/ImageDropzone";
import { NotificationMessages } from "@/constant/notification";
import { useNotesDispatch } from "@/context/NotesProvider";
import { ActionTypes, FileWithUrl, Note } from "@/types/note";
import { handleRemoveImage } from "@/utils";
import { Button, Modal, Stack, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";
import { useEffect, useState } from "react";

interface NoteModalProps {
  opened: boolean;
  onClose: () => void;
  note: Note | null;
}

export default function NoteModal({ opened, onClose, note }: NoteModalProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState("");
  const dispatch = useNotesDispatch();
  const [files, setFiles] = useState<FileWithUrl[]>([]);

  useEffect(() => {
    if (note) {
      setEditedText(note.text);
      setFiles(note.mediaFiles);
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      const updatedNote = {
        ...note,
        text: editedText,
        mediaFiles: files,
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

  const removeImage = handleRemoveImage(setFiles);

  return (
    <Modal opened={opened} onClose={onClose} title="Note Detail" centered>
      <Stack>
        {editMode ? (
          <>
            <TextInput
              value={editedText}
              onChange={(event) => setEditedText(event.currentTarget.value)}
              placeholder="Edit your note"
              rightSection={
                <ImageDropzone
                  onDrop={(newFiles) =>
                    setFiles((prevFiles) => [...prevFiles, ...newFiles])
                  }
                />
              }
            />
            {files.length > 0 && (
              <Carousel sliderData={files} onDelete={removeImage} />
            )}
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <Text>{editedText}</Text>
            {files.length > 0 && (
              <Carousel
                sliderData={files}
                onDelete={removeImage}
                canEdit={editMode}
              />
            )}
            <Button onClick={() => setEditMode(true)}>Edit</Button>
          </>
        )}
      </Stack>
    </Modal>
  );
}
