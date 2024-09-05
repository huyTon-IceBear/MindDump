import { EmptyNoteText } from "@/constant/text";
import { EmptyNoteProps } from "@/types/component";
import { Text, Stack } from "@mantine/core";
import { IconBubble } from "@tabler/icons-react";

export default function EmptyNote({
  description = EmptyNoteText.description,
  icon = <IconBubble size={100} />,
}: EmptyNoteProps) {
  return (
    <Stack align="center" justify="center" h={300}>
      {icon}
      <Text>{description}</Text>
    </Stack>
  );
}
