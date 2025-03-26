import { Text, Title } from '@mantine/core'

import { WelcomeText } from '@/constant/text'

import classes from './Welcome.module.css'

export default function WelcomeComponent() {
  return (
    <div>
      <Title className={classes.title}>
        {WelcomeText.titleStart}{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'green', deg: 90 }}>
          {WelcomeText.titleHighlight}
        </Text>{' '}
        {WelcomeText.titleEnd}
      </Title>
      <Text size="lg" mt="xl" className={classes.description}>
        {WelcomeText.description}
      </Text>
    </div>
  )
}
