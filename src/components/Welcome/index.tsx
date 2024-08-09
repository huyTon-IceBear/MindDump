import { Title, Text, Anchor } from "@mantine/core";
import classes from "./Welcome.module.css";

export default function WelcomeComponent() {
  return (
    <div>
      <Title className={classes.title} ta="center" mt={100}>
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
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          Learn how to get started
        </Anchor>
        . Let your mind flow freely.
      </Text>
    </div>
  );
}
