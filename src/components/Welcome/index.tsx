import { Title, Text } from "@mantine/core";
import classes from "./Welcome.module.css";

export default function WelcomeComponent() {
  return (
    <div>
      <Title className={classes.title}>
        A{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "blue", to: "green", deg: 90 }}
        >
          web tool
        </Text>{" "}
        for capturing thoughts
      </Title>
      <Text size="lg" mt="xl" className={classes.description}>
        Start by jotting down your ideas and inspirations, and let MindDump help
        you manage and enhance your mental workflow.
      </Text>
    </div>
  );
}
