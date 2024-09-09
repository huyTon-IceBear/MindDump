"use client";

import { LayoutProps } from "@/types/layout";
import { AppShell } from "@mantine/core";
import Header from "./header";
import classes from "./layout.module.css";

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <AppShell className={classes.root}>
      <Header />
      <AppShell.Main>
        <div className={classes.content}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
