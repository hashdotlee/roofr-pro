import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen p-6 flex flex-col items-center">
      <div className="w-full flex flex-row justify-between items-center space-between">
        <h1 className="font-bold text-3xl">LOGO</h1>
        <div>
          <Button variant={"link"}>Contact us</Button>
          <Button variant={"outline"} className="max-[300px]:hidden" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>

      {children}
    </div>
  );
}
