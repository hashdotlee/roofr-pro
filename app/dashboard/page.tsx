"use client";
import { logout } from "@/lib/actions";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const { user }: any = await auth();
  return (
    <div>
      <button
        onClick={async () => {
          await logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
