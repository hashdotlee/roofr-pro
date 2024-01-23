import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCollapsed } from "../ClientSidebar";
import { LayoutDashboard, ScrollText, UsersRound } from "lucide-react";

export type TNavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const navs: TNavItem[] = [
  {
    label: "Jobs",
    icon: <LayoutDashboard />,
    path: "/dashboard/jobs",
  },
  {
    label: "Customers",
    icon: <UsersRound />,
    path: "/dashboard/customers",
  },
  {
    label: "Invoices",
    icon: <ScrollText />,
    path: "/dashboard/invoices",
  },
];

export default function Navigation() {
  const collapsed = useCollapsed();
  return (
    <div
      className={cn("flex flex-col gap-2 mt-2 justify-start min-w-full pt-2")}
    >
      {navs.map((nav, index) => (
        <NavItem key={index} {...nav} collapsed={collapsed} />
      ))}
    </div>
  );
}

function NavItem({
  label,
  icon,
  collapsed,
  path,
}: TNavItem & { collapsed: boolean }) {
  return (
    <Link href={path} passHref>
      <Button
        variant="ghost"
        className={cn(
          "w-full flex flex-row gap-3 justify-start items-center p-2.5"
        )}
      >
        <span className="text-xl">{icon}</span>
        <span
          className={cn("text-base transition-all duration-300 ease-in-out", {
            "opacity-100": !collapsed,
            "opacity-0": collapsed,
            invisible: collapsed,
          })}
        >
          {label}
        </span>
      </Button>
    </Link>
  );
}
