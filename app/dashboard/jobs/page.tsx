import { auth } from "@/lib/auth";
import InnerPage from "./InnerPage";
import toast from "react-hot-toast";

export default async function JobsPage() {
  const session = await auth();

  if (!session) {
    toast("You must be logged in to view this page.", {
      icon: "🔒",
    });
    return <></>;
  }
  return <InnerPage session={session} />;
}
