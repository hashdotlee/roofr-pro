import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GoPeople } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";

export type TNavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const navs: TNavItem[] = [
  {
    label: "Jobs",
    icon: <RxDashboard />,
    path: "/dashboard/jobs",
  },
  {
    label: "Customers",
    icon: <GoPeople />,
    path: "/dashboard/customers",
  },
];

export default function Navigation({ collapsed }: { collapsed: boolean }) {
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
          "w-full flex flex-row gap-3 justify-start items-center p-2.5",
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
