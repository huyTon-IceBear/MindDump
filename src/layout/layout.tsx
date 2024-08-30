"use client";

import { AppShell } from "@mantine/core";
import Header from "./header";
import classes from "./layout.module.css";
import { LayoutProps } from "@/types/layout";

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
