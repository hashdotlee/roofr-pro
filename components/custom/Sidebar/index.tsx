import { auth } from "@/lib/auth";
import ClientSidebar from "./ClientSidebar";

export default async function Sidebar() {
  const session = await auth();
  if (!session) return <></>;
  return (
    <ClientSidebar
      user={{
        name: session?.user?.name || "",
        role: session?.user?.role,
        image: session?.user?.image || "",
      }}
    />
  );
}
