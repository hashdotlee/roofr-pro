"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useCollapsed } from "../../ClientSidebar";
import DropdownMenuList from "./DropdownMenuList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/lib/text";

export default function ClientProfileMenu({
  user,
}: {
  user: {
    name: string;
    image: string;
    role: string;
  };
}) {
  const collapsed = useCollapsed();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full flex hover:bg-gray-100 px-0 py-2 my-2 rounded-md flex-row gap-4 items-center justify-left">
          <Avatar className="rounded-lg">
            <AvatarImage src={user?.image!} alt="" />
            <AvatarFallback className="rounded-lg bg-slate-300">
              {getAbbreviation(user?.name)}
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
              "flex-1 flex-grow-1 flex flex-row items-center space-between gap-4"
            )}
          >
            <div className="flex flex-col gap-0 items-start">
              <h1 className="text-base font-bold truncate">{user?.name}</h1>
              <p className="text-gray-500 text-xs uppercase bg-slate-200 px-4 py-0.5 rounded-2xl">
                {user?.role}
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
