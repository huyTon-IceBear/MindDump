import { Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'

import { TypeWriterProps } from '@/types/component'

export default function TypeWriter({ text, speed, onComplete, skip }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)

  useEffect(() => {
    if (skip) {
      const lines = Array.isArray(text) ? text : [text]
      setDisplayText(lines)
      onComplete && onComplete()
      return
    }

    const lines = Array.isArray(text) ? text : [text]

    const typingInterval = setInterval(() => {
      if (currentLineIndex < lines.length) {
        const currentLine = lines[currentLineIndex]
        if (currentCharIndex < currentLine.length) {
          setDisplayText((prev) => {
            const newText = [...prev]
            if (!newText[currentLineIndex]) newText[currentLineIndex] = ''
            newText[currentLineIndex] += currentLine[currentCharIndex]
            return newText
          })
          setCurrentCharIndex((prev) => prev + 1)
        } else {
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
        }
      } else {
        clearInterval(typingInterval)
        onComplete && onComplete()
      }
    }, speed)

    return () => clearInterval(typingInterval)
  }, [text, speed, currentLineIndex, currentCharIndex, onComplete, skip])

  return (
    <Stack>
      {displayText.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </Stack>
  )
}
