import { AppShell, Box, Burger, Group, RemoveScroll } from '@mantine/core'

import ColorSchemeToggle from '@/components/ColorSchemeToggle'
import Logo from '@/components/Logo'
import { HeaderProps } from '@/types/layout'

import classes from './Header.module.css'

export default function Header({ displayNavbar, navbarOpened, onNavbarToggle }: HeaderProps) {
  return (
    <AppShell.Header zIndex={2} className={`${RemoveScroll.classNames.zeroRight} ${classes.header}`}>
      <Group justify="space-between" w="100%" wrap="nowrap">
        <Group h="100%" px="sm" gap="lg">
          {displayNavbar && (
            <Box>
              <Burger opened={navbarOpened} onClick={onNavbarToggle} size="sm" aria-label="Toggle navbar" />
            </Box>
          )}
          <Logo />
        </Group>
        <Group gap={5}>
          <ColorSchemeToggle />
        </Group>
      </Group>
    </AppShell.Header>
  )
}
