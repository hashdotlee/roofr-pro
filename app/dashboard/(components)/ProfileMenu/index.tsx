"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAbbreviation } from "@/lib/text";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import { Session } from "next-auth/types";
import { useEffect, useState } from "react";
import { useCollapsed } from "../../Sidebar";
import DropdownMenuList from "./DropdownMenuList";

export default function ProfileMenu() {
  const collapsed = useCollapsed();
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      setSession(await res.json());
    };
    fetchSession();
  }, []);

  if (!session)
    return (
      <div className="flex flex-row justify-center items-center mt-4">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full flex hover:bg-gray-100 px-0 py-4 rounded-md flex-row gap-4 items-center justify-left">
          <Avatar className="rounded-lg">
            <AvatarImage src={session?.user?.image!} alt="" />
            <AvatarFallback className="rounded-lg bg-slate-300">
              {getAbbreviation(session?.user?.name)}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "transition-all duration-200 ease-in-out",
              {
                "opacity-100": !collapsed,
                "opacity-0": collapsed,
                invisible: collapsed,
              },
              "flex-1 flex-grow-1 flex flex-row items-center space-between gap-4",
            )}
          >
            <div className="flex flex-col gap-0 items-start">
              <h1 className="text-base font-bold truncate">
                {session?.user?.name}
              </h1>
              <p className="text-gray-500 text-xs uppercase bg-slate-200 px-4 py-0.5 rounded-2xl">
                {session?.user?.role}
              </p>
            </div>
          </div>
          <div
            className={cn("ml-auto transition-all duration-200 ease-in-out", {
              "opacity-100": !collapsed,
              "opacity-0": collapsed,
              invisible: collapsed,
            })}
          >
            <ChevronDown className="w-4 h-4"></ChevronDown>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc(var(--sidebar-width)-48px)] flex gap-2 flex-col">
        <DropdownMenuList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
