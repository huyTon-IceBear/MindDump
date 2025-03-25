import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import cx from 'clsx'

import classes from './ColorSchemeToggle.module.css'

export default function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true })
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="transparent"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconSun aria-label="Sun Icon" className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon aria-label="Moon Icon" className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  )
}
