import { ActionIcon, Text } from "@mantine/core";
import classes from "./Logo.module.css";
import { LogoProps } from "@/types/component";

export default function Logo({ size }: LogoProps) {
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
