import { ActionIcon, Text } from "@mantine/core";
import classes from "./Logo.module.css";

type Props = {
  size?: "small" | "normal" | "large";
};

export default function Logo({ size }: Props) {
  return (
    <Text
      className={classes.title}
      variant="gradient"
      component="span"
      gradient={{ from: "blue", to: "green" }}
      size="xs"
    >
      MindDump
    </Text>
  );
}
