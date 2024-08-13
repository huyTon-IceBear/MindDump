import { Title, Text, Anchor } from "@mantine/core";
import classes from "./Welcome.module.css";

export default function WelcomeComponent() {
  return (
    <div>
      <Title className={classes.title} ta="center">
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "blue", to: "green" }}
        >
          MindDump
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        MindDump helps you capture and organize your thoughts, whether you are
        an overthinker or a creative genius. Start by jotting down your ideas,
        thoughts, and inspirations.
      </Text>
    </div>
  );
}
