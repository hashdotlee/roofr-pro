"use client";

import { SessionProvider } from "next-auth/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </SessionProvider>
  );
}
