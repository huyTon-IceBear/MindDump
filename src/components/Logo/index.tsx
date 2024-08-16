import Link from "next/link";
import { Anchor } from "@mantine/core";
import classes from "./Logo.module.css";
import { LogoProps } from "@/types/component";

export default function Logo({ size }: LogoProps) {
  return (
    <Anchor
      component={Link}
      href="/"
      underline="never"
      className={classes.title}
      variant="gradient"
      gradient={{ from: "blue", to: "green" }}
      size="xs"
    >
      MindDump
    </Anchor>
  );
}
