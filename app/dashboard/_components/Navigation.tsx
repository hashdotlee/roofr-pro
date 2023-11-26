import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { GoPeople } from "react-icons/go";
import slugify from "slugify";
import { cn } from "@/lib/utils";

const navs = [
  {
    label: "Jobs",
    icon: <RxDashboard />,
  },
  {
    label: "Customers",
    icon: <GoPeople />,
  },
];

export default function Navigation({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={cn("flex flex-col gap-2 mt-4 justify-start min-w-full pt-2")}>
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
}: {
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${slugify(label, { lower: true })}`} passHref>
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
