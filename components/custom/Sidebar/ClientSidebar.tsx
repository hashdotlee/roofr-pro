"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createContext, useContext, useState } from "react";
import ProfileMenu from "./(components)/ProfileMenu";
import Navigation from "./(components)/Navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

const CollapsedSidebarContext = createContext(false);

export const useCollapsed = () => {
  const collapsed = useContext(CollapsedSidebarContext);
  return collapsed;
};

export default function ClientSidebar({
  user,
}: {
  user: {
    name: string;
    image: string;
    role: string;
  };
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <CollapsedSidebarContext.Provider value={collapsed}>
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
          <div className="flex flex-col border-b mb-4">
            <div className="pb-2 flex flex-row items-center gap-2">
              <Button
                variant={"ghost"}
                className="rounded-full h-10 w-10 p-4"
                onClick={() => setCollapsed(!collapsed)}
              >
                <span className="text-2xl">
                  <Menu />
                </span>
              </Button>
              <Link
                href={"/dashboard/jobs"}
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
              </Link>
            </div>
          </div>

          <ProfileMenu user={user} />
          <Navigation />
        </div>
      </aside>
    </CollapsedSidebarContext.Provider>
  );
}
