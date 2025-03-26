import { ActionIcon, AspectRatio, Card, Center, Image, Overlay, Text, Title } from '@mantine/core'
import { IconPin, IconPinFilled } from '@tabler/icons-react'
import { useState } from 'react'

import { useNotesDispatch } from '@/context/NotesProvider'
import { NoteCardProps } from '@/types/component'
import { ActionTypes } from '@/types/note'

export default function NoteCard({ note, handleClick }: NoteCardProps) {
  const [hovered, setHovered] = useState(false)
  const totalMediaFiles = note.mediaFiles.length
  const dispatch = useNotesDispatch()

  const handlePinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const updatedNote = {
      ...note,
      pinned: !note.pinned,
    }
    dispatch({
      type: ActionTypes.CHANGE_NOTE,
      note: updatedNote,
    })
  }

  return (
    <Card
      padding="lg"
      radius="md"
      withBorder
      shadow={hovered ? '0 3px 5px rgba(0,0,0,.20)' : ''}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {totalMediaFiles > 0 && (
        <Card.Section>
          <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
            <Image
              src={note.mediaFiles[0].src}
              alt="Media file"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {totalMediaFiles > 1 && (
              <Overlay color="rgba(0,0,0,.4)" backgroundOpacity={0.65}>
                <Center style={{ height: '100%' }}>
                  <Title>{'+' + `${totalMediaFiles - 1}`}</Title>
                </Center>
              </Overlay>
            )}
          </AspectRatio>
        </Card.Section>
      )}

      <ActionIcon
        variant="subtle"
        color="white"
        aria-label="Pin"
        pos="absolute"
        right={8}
        top={8}
        onClick={handlePinClick}
        style={{
          borderRadius: '50%',
          zIndex: 2,
        }}
      >
        {note.pinned ? (
          <IconPinFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
        ) : (
          <IconPin style={{ width: '70%', height: '70%' }} stroke={1.5} />
        )}
      </ActionIcon>

      <Text size="sm" c="dimmed" mt="md" mb="xs">
        {note.text}
      </Text>
    </Card>
  )
}
