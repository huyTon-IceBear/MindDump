import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import Logo from "@/components/Logo";
import { AppShell, Group, RemoveScroll } from "@mantine/core";
import classes from "./layout.module.css";

export default function Header() {
  return (
    <AppShell.Header
      zIndex={2}
      className={`${RemoveScroll.classNames.zeroRight} ${classes.header}`}
    >
      <Group
        h={1}
        mih={1}
        mr={20}
        ml={20}
        align="center"
        display="flex"
        justify="space-between"
      >
        <Logo />
        <ColorSchemeToggle />
      </Group>
    </AppShell.Header>
  );
}
