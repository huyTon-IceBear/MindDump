import { TypeWriterProps } from "@/types/component";
import { Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TypeWriter({ text, speed }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return (
    <Stack>
      <Text>{displayText}</Text>
    </Stack>
  );
}
