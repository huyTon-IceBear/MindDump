import classes from "./Typewritter.module.css";
import { Text } from "@mantine/core";

export default function Typewriter() {
  return (
    <Text className={`${classes.line1} ${classes.animTypewriter}`}>
      Animation typewriter style using css steps
    </Text>
  );
}
