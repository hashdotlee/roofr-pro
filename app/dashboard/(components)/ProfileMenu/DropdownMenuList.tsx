"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DropdownMenuList() {
  return (
    <>
      <DropdownMenuItem className="cursor-pointer p-0">
        <Link href={"/profile"} className="flex p-4 flex-row">
          <User className="w-5 h-5 mr-3" /> User Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer p-0">
        <button
          onClick={() => signOut()}
          type="submit"
          className="w-full flex p-4 flex-row"
        >
          <>
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </>
        </button>
      </DropdownMenuItem>{" "}
    </>
  );
}
