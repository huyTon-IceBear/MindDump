import React from "react";
export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
