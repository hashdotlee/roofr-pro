"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </SessionProvider>
  );
}
