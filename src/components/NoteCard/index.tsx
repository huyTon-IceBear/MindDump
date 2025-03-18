import { NoteCardProps } from "@/types/component";
import {
  AspectRatio,
  Card,
  Center,
  Image,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

export default function NoteCard({ note, handleClick }: NoteCardProps) {
  const [hovered, setHovered] = useState(false);
  const totalMediaFiles = note.mediaFiles.length;

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
      {totalMediaFiles > 0 && (
        <Card.Section>
          <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
            <Image
              src={note.mediaFiles[0].src}
              alt="Media file"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {totalMediaFiles > 1 && (
              <Overlay color="rgba(0,0,0,.4)" backgroundOpacity={0.65}>
                <Center style={{ height: "100%" }}>
                  <Title>{"+" + `${totalMediaFiles - 1}`}</Title>
                </Center>
              </Overlay>
            )}
          </AspectRatio>
        </Card.Section>
      )}
      <Text size="sm" c="dimmed" mt="md" mb="xs">
        {note.text}
      </Text>
    </Card>
  );
}
