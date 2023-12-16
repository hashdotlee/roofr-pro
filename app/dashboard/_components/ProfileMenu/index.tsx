"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2, LogOut, PowerIcon, User } from "lucide-react";
import { useCollapsed } from "../../Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { getAbbreviation } from "@/lib/text";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import DropdownMenuList from "./DropdownMenuList";

export default function index() {
  const collapsed = useCollapsed();
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading")
    return (
      <div className="flex flex-row justify-center items-center mt-4">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!user) return null;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex hover:bg-gray-100 px-0 py-4 rounded-md flex-row gap-4 items-center justify-left">
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
                "flex flex-row items-center space-between gap-4"
              )}
            >
              <div className="flex flex-col gap-0 items-start">
                <h1 className="text-base font-bold">{user?.name}</h1>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </div>
            <div className="ml-auto">
              <ChevronDown className="w-4 h-4"></ChevronDown>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[calc(var(--sidebar-width)-48px)] flex gap-2 flex-col">
          <DropdownMenuList />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
