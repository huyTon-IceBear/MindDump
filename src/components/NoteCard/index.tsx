import { NoteCardProps } from "@/types/component";
import { Card, Image, Text } from "@mantine/core";
import { useState } from "react";

export default function NoteCard({ note, handleClick }: NoteCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      padding="lg"
      radius="md"
      withBorder
      shadow={hovered ? "0 3px 5px rgba(0,0,0,.20)" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <Card.Section>
        {note.mediaFiles.map((image) => (
          <Image key={note.id} src={image.src} height={140} alt="Media file" />
        ))}
      </Card.Section>

      <Text size="sm" c="dimmed" mt="md" mb="xs">
        {note.text}
      </Text>
    </Card>
  );
}
