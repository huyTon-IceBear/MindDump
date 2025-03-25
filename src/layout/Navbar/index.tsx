import { Box, Button, Stack } from '@mantine/core'
import { IconArchive, IconNotes, IconPencil, IconTrash } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { NavbarProps } from '@/types/layout'

import NavItem from './NavbarItem'

export default function Navbar({ navbarOpened }: NavbarProps) {
  const pathname = usePathname()

  return (
    <Box>
      <motion.div
        animate={{ width: navbarOpened ? 200 : 60 }} // Adjust width on toggle
        transition={{ duration: 0.1, ease: 'easeInOut' }}
        style={{
          whiteSpace: 'nowrap',
          height: '100vh',
        }}
      >
        <Stack>
          {/* Compose Button */}
          <Button
            mt="md"
            ml="sm"
            size="sm"
            w={navbarOpened ? 150 : 60}
            mih={60}
            onClick={() => {}}
            leftSection={navbarOpened && <IconPencil size={24} />}
            radius={15}
          >
            {navbarOpened ? 'Compose' : <IconPencil size={24} />}
          </Button>
          {/* Nav Links */}
          <Stack>
            <NavItem
              icon={<IconNotes size={24} stroke={1.5} />}
              label="Notes"
              href="/notes"
              active={pathname === '/notes'}
              navbarOpened={navbarOpened}
            />
            <NavItem
              icon={<IconArchive size={24} stroke={1.5} />}
              label="Archive"
              href="#required-for-focus"
              active={pathname === '/archive'}
              navbarOpened={navbarOpened}
            />
            <NavItem
              icon={<IconTrash size={24} stroke={1.5} />}
              label="Trash"
              href="#required-for-focus"
              active={pathname === '/trash'}
              navbarOpened={navbarOpened}
            />
          </Stack>
        </Stack>
      </motion.div>
    </Box>
  )
}
