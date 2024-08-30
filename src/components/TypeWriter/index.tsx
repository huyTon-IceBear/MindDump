import { TypeWriterProps } from "@/types/component";
import { Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TypeWriter({
  text,
  speed,
  onComplete,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const lines = Array.isArray(text) ? text : [text];

    const typingInterval = setInterval(() => {
      if (currentLineIndex < lines.length) {
        const currentLine = lines[currentLineIndex];
        if (currentCharIndex < currentLine.length) {
          setDisplayText((prev) => {
            const newText = [...prev];
            if (!newText[currentLineIndex]) newText[currentLineIndex] = "";
            newText[currentLineIndex] += currentLine[currentCharIndex];
            return newText;
          });
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }
      } else {
        clearInterval(typingInterval);
        onComplete && onComplete();
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, currentLineIndex, currentCharIndex, onComplete]);

  return (
    <Stack>
      {displayText.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </Stack>
  );
}
