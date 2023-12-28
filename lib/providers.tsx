"use client";

import { SessionProvider } from "next-auth/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
