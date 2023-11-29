import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut, User } from "lucide-react";

export default function Profile({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex hover:bg-gray-100 px-2 py-4 rounded-md flex-row gap-4 items-center justify-left">
            <Avatar className="rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="" />
              <AvatarFallback className="rounded-lg">AD</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "transition-all duration-200 ease-in-out",
                {
                  "opacity-100": !collapsed,
                  "opacity-0": collapsed,
                  invisible: collapsed,
                },
                "flex flex-row items-center space-between gap-4",
              )}
            >
              <div className="flex flex-col gap-0">
                <h1 className="text-base font-semibold">Shad Mirza</h1>
                <p className="text-gray-500 text-xs">name@example.com</p>
              </div>
            </div>
            <div className="ml-auto">
              <ChevronDown className="w-4 h-4"></ChevronDown>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[calc(var(--sidebar-width)-32px)] flex gap-2 flex-col">
          <DropdownMenuItem className="p-4 cursor-pointer">
            <User className="w-5 h-5 mr-3" /> User Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4 cursor-pointer">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
