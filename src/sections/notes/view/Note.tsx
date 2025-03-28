import { ActionIcon, Indicator, Popover } from '@mantine/core'
import { IconNotes } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { useNotes } from '@/context/NotesProvider'

import EmptyNote from './EmptyNote'
import classes from './Note.module.css'
import NoteBoard from './NoteList'

export default function Note() {
  const [opened, setOpened] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const { notes } = useNotes()

  useEffect(() => {
    if (notes.length > 0) {
      setShowIndicator(true)
    }
  }, [notes])

  return (
    <Popover
      width={200}
      opened={opened}
      onClose={() => setOpened(false)}
      position="top-end"
      offset={{ mainAxis: 7, crossAxis: 0 }}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <div className={classes.buttonWrapper}>
          <Indicator inline color="red" withBorder processing disabled={!showIndicator} position="top-end" offset={4}>
            <ActionIcon
              variant="filled"
              aria-label="Notes"
              size="lg"
              radius="xl"
              onClick={() => {
                setOpened((prev) => !prev)
                setShowIndicator(false)
              }}
              className={classes.button}
            >
              <IconNotes style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Indicator>
        </div>
      </Popover.Target>
      <Popover.Dropdown className={classes.dropdown}>{notes.length === 0 ? <EmptyNote /> : <NoteBoard />}</Popover.Dropdown>
    </Popover>
  )
}
