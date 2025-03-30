import { Box } from '@mantine/core'

import { TextEditorProps } from '@/types/component'

import DetailedVariant from './DetailedVariant'
import SubtleVariant from './SubtleVariant'

export function RichTextEditor({ value, onChange, useLiteVariant = true }: TextEditorProps) {
  return (
    <Box px={'xs'} pt={'sm'}>
      {useLiteVariant ? (
        <DetailedVariant value={value} onChange={onChange} />
      ) : (
        <SubtleVariant value={value} onChange={onChange} />
      )}
    </Box>
  )
}
