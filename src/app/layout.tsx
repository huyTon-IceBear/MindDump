import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindDump - Capture Your Thoughts",
  description:
    "MindDump is a web app designed to help you capture and organize your thoughts, whether you're an overthinker or a creative genius. Write down your ideas and clear your mind.",
  keywords:
    "MindDump, writing app, capture thoughts, organize ideas, overthinking, mindfulness, creativity, mental health, journaling",
  authors: {
    name: "Huy Ton",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>MindDump - Capture Your Thoughts</title>
      </head>
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
