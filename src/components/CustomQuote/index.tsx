import { Blockquote } from '@mantine/core'

import { CustomQuoteProps } from '@/types/component'

export default function CustomQuote({ source, quote }: CustomQuoteProps) {
  return (
    <Blockquote color="blue" cite={source} mt="xl">
      {quote}
    </Blockquote>
  )
}
