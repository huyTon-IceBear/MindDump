import classes from "./TypeWriter.module.css";
import { Text } from "@mantine/core";

export default function TypeWriter() {
  return (
    <Text className={`${classes.line1} ${classes.animTypewriter}`}>
      Animation typewriter style using css steps
    </Text>
  );
}
