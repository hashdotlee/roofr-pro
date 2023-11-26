import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Profile({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex flex-row gap-4 items-center justify-left">
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
          "flex flex-row items-center space-between gap-4"
        )}
      >
        <div className="flex flex-col gap-0">
          <h1 className="text-base font-semibold">Shad Mirza</h1>
          <p className="text-gray-500 text-xs">name@example.com</p>
        </div>
        <span className="text-sm">Admin</span>
      </div>
    </div>
  );
}
