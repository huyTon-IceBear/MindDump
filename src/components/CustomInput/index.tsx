import { Box, Button, Group, Switch } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import React, { useState } from 'react'

import { NotificationMessages } from '@/constant/notification'
import { useNotesDispatch } from '@/context/NotesProvider'
import { ActionTypes, UploadedImage } from '@/types/note'
import { handleRemoveImage } from '@/utils'

import Carousel from '../Carousel'
import ImageDropzone from '../ImageDropzone'
import { RichTextEditor } from '../RichTextEditor'

export default function CustomInput() {
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<UploadedImage[]>([])
  const [useLiteEditor, setUseLiteEditor] = useState(false)
  const dispatch = useNotesDispatch()

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

  const removeImage = handleRemoveImage(setFiles)

  return (
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
        <Button variant="filled" onClick={handleCreateNote}>
          Create
        </Button>
      </Group>
    </Box>
  )
}
