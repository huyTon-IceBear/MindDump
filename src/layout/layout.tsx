"use client";

import { LayoutProps } from "@/types/layout";
import { AppShell, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import Header from "./Header";
import classes from "./layout.module.css";
import Navbar from "./Navbar";

export default function DefaultLayout({ children }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const pathname = usePathname();
  const displayNavbar = pathname !== "/";
  return (
    <AppShell
      className={classes.root}
      header={{ height: 55 }}
      navbar={{
        width: opened ? 300 : 100,
        breakpoint: "sm",
        collapsed: { desktop: !displayNavbar },
      }}
    >
      <Header
        displayNavbar={displayNavbar}
        navbarOpened={opened}
        onNavbarToggle={toggle}
      />
      {displayNavbar && (
        <AppShell.Navbar bg={theme.colors.dark[8]} withBorder={false}>
          <Navbar navbarOpened={opened} />
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        <div className={classes.content}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
