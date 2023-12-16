"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DropdownMenuList() {
  const router = useRouter();
  return (
    <>
      <DropdownMenuItem className="p-4 cursor-pointer">
        <Link href={"/profile"} className="flex flex-row">
          <User className="w-5 h-5 mr-3" /> User Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="p-4 cursor-pointer">
        <form
          action={async () => {
            await logout();
            router.push("/");
          }}
        >
          <button type="submit" className="w-full flex flex-row">
            <>
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </>
          </button>
        </form>
      </DropdownMenuItem>{" "}
    </>
  );
}
