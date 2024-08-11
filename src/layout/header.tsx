import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import Logo from "@/components/Logo";
import {
  Group,
  Anchor,
  AppShell,
  Container,
  RemoveScroll,
  Text,
} from "@mantine/core";

export default function Header() {
  return (
    <AppShell.Header className={RemoveScroll.classNames.zeroRight}>
      <Group
        h={1}
        mih={1}
        mr={2.5}
        align={"center"}
        display={"flex"}
        justify="space-between"
      >
        <Logo />
        <ColorSchemeToggle />
        {/* <HeaderControls
        visibleFrom="sm"
        githubLink="https://github.com/mantinedev/mantine"
        withDirectionToggle={false}
        withSearch={false}
        discordLink={meta.discordLink}
      /> */}
      </Group>
    </AppShell.Header>
  );
}
