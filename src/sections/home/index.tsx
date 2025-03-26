'use client'
import { Button, Container, Group } from '@mantine/core'
import Link from 'next/link'

import CustomQuote from '@/components/CustomQuote'
import WelcomeComponent from '@/components/Welcome'

import classes from './home.module.css'

export default function HomeView() {
  return (
    <Container className={classes.inner}>
      <WelcomeComponent />
      <CustomQuote
        source={'Thoughts disentangle themselves when they pass through the lips and fingertips.'}
        quote={'Dawson Trotman'}
      />
      <Group className={classes.controls}>
        <Button
          component={Link}
          href="/notes/"
          size="xl"
          radius="md"
          className={classes.control}
          data-primary
          variant="gradient"
        >
          Get started
        </Button>

        <Button
          component="a"
          href="https://github.com/huyTon-IceBear/MindDump"
          size="xl"
          variant="outline"
          radius="md"
          className={classes.control}
          data-github
        >
          GitHub
        </Button>
      </Group>
    </Container>
  )
}
