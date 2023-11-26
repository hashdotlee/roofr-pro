import { Button } from "@/components/ui/button";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen p-6">
      <div className="w-full flex flex-row justify-between items-center space-between">
        <h1 className="font-bold text-3xl">LOGO</h1>
        <div>
          <Button variant={"link"}>Contact us</Button>
          <Button variant={"outline"}>Login</Button>
        </div>
      </div>

      {children}
    </div>
  );
}
