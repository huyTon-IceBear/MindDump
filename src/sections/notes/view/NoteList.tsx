import { ActionIcon, Box, Flex, rem, ScrollArea, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconList, IconTrash } from '@tabler/icons-react'

import AsyncSearch from '@/components/AsyncSearch'
import { NotificationMessages } from '@/constant/notification'
import { useNotesDispatch } from '@/context/NotesProvider'
import { ActionTypes } from '@/types/note'

import NoteAccordion from './NoteAccordion'
import classes from './NoteList.module.css'

export default function NoteBoard() {
  const dispatch = useNotesDispatch()

  return (
    <Box className={classes.notes}>
      <ScrollArea type="never" h={350} offsetScrollbars={false}>
        <div className={classes.inner}>
          <div className={classes.header}>
            <Flex align={'center'}>
              <IconList style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              <Text className={classes.title}>List of Notes</Text>
            </Flex>
            <Flex align={'center'}>
              <ActionIcon
                variant="transparent"
                aria-label="Delete Notes"
                onClick={() => {
                  dispatch({ type: ActionTypes.REMOVE_NOTES })
                  notifications.show({
                    position: 'top-right',
                    title: NotificationMessages.REMOVE_NOTES.title,
                    message: NotificationMessages.REMOVE_NOTES.message,
                    autoClose: 1500,
                  })
                }}
              >
                <IconTrash style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </ActionIcon>
              <AsyncSearch />
            </Flex>
          </div>
          <NoteAccordion />
        </div>
      </ScrollArea>
    </Box>
  )
}
