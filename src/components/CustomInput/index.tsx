import { Box, Button, Group, Modal, Switch } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect, useState } from 'react'

import { NotificationMessages } from '@/constant/notification'
import { useNotesDispatch } from '@/context/NotesProvider'
import { ActionTypes, Note, UploadedImage } from '@/types/note'
import { handleRemoveImage } from '@/utils'

import Carousel from '../Carousel'
import ImageDropzone from '../ImageDropzone'
import { RichTextEditor } from '../RichTextEditor'

interface CustomInputProps {
  opened: boolean
  onClose: () => void
  note?: Note | null
  isEdit?: boolean
}

export default function CustomInput({ opened, onClose, note, isEdit = false }: CustomInputProps) {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<UploadedImage[]>([])
  const [useLiteEditor, setUseLiteEditor] = useState(false)
  const dispatch = useNotesDispatch()

  useEffect(() => {
    if (note) {
      setValue(note.text)
      setFiles(note.mediaFiles)
    }
  }, [note])

  function handleOnClick() {
    if (isEdit) {
      handleEditNote()
    } else handleCreateNote()
  }
  function handleCreateNote() {
    if (value.trim() !== '') {
      dispatch({
        type: ActionTypes.ADD_NOTE,
        text: value,
        mediaFiles: files,
      })
      notifications.show({
        position: 'top-right',
        title: NotificationMessages.ADD_NOTE.title,
        message: NotificationMessages.ADD_NOTE.message,
        autoClose: 1500,
      })
      setValue('') // Clear the input after dispatching the action
      setFiles([])
    }
  }

  function handleEditNote() {
    if (note) {
      const updatedNote = {
        ...note,
        text: value,
        mediaFiles: files,
      }
      dispatch({
        type: ActionTypes.CHANGE_NOTE,
        note: updatedNote,
      })
      notifications.show({
        position: 'top-right',
        title: NotificationMessages.CHANGE_NOTE.title,
        message: NotificationMessages.CHANGE_NOTE.message,
        autoClose: 1500,
      })
      // Update the local state with the new text
      setValue(updatedNote.text)
    }
  }

  const removeImage = handleRemoveImage(setFiles)

  return (
    <Modal opened={opened} onClose={onClose} title="Note Detail" size="lg" centered>
      <Box
        bd={'1px solid rgb(95,99,104)'}
        bg="rgb(32,33,36)"
        style={{ borderRadius: '10px', boxShadow: '0 3px 5px rgba(0,0,0,.20)' }}
      >
        {files.length > 0 && <Carousel sliderData={files} onDelete={removeImage} />}
        <RichTextEditor
          useLiteVariant={useLiteEditor}
          value={value}
          onChange={(event: string) => {
            setValue(event)
          }}
        />
        <Group justify="space-between" w="100%" wrap="nowrap" p={'xs'}>
          <Group h="100%" gap="lg">
            <ImageDropzone onDrop={(newFiles) => setFiles((prevFiles) => [...prevFiles, ...newFiles])} />
            <Switch
              label="Use detailed text editor"
              checked={useLiteEditor}
              onChange={() => setUseLiteEditor(!useLiteEditor)}
            />
          </Group>
          <Button variant="filled" onClick={handleOnClick}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </Group>
      </Box>
    </Modal>
  )
}
