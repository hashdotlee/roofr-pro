"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import Profile from "./_components/Profile";
import Navigation from "./_components/Navigation";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={cn(
        "left-0 top-0 h-screen transition-all duration-300 ease-in-out",
        {
          "w-sidebar": !collapsed,
          "w-sidebar-collapse": collapsed,
        }
      )}
      aria-label="sidebar"
    >
      <div className="flex h-full flex-col border-r px-3 py-4">
        <div className="pb-2 border-b flex flex-row items-center gap-2 mb-4">
          <Button
            variant={"ghost"}
            className="rounded-full h-10 w-10 p-4"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="text-2xl">
              <IoIosMenu />
            </span>
          </Button>
          <h1
            className={cn(
              "text-2xl font-bold transition-all duration-200 ease-in-out",
              {
                "opacity-100": !collapsed,
                "opacity-0": collapsed,
                invisible: collapsed,
              }
            )}
            aria-label="logo"
          >
            LOGO
          </h1>
        </div>

        <Profile collapsed={collapsed} />
        <Navigation collapsed={collapsed}/>
      </div>
    </aside>
  );
}
