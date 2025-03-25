import { Anchor } from '@mantine/core'
import Link from 'next/link'

import { LogoProps } from '@/types/component'

import classes from './Logo.module.css'

export default function Logo({ size }: LogoProps) {
  return (
    <Anchor
      component={Link}
      href="/"
      underline="never"
      className={classes.title}
      variant="gradient"
      gradient={{ from: 'blue', to: 'green' }}
      size="xs"
    >
      MindDump
    </Anchor>
  )
}
