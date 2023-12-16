import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Page not found</p>
      <Button variant={"link"} asChild>
        <Link href={"/"} className="text-lg">
          Back to home screen
        </Link>
      </Button>
    </div>
  );
}
