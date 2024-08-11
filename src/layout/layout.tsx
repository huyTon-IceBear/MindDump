"use client";

import { Box, Flex, AppShell } from "@mantine/core";
import Header from "./header";
import classes from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};
export default function DefaultLayout({ children }: Props) {
  return (
    <AppShell className={classes.root}>
      <Header />
      <AppShell.Main className={classes.main}>
        <div className={classes.content}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
