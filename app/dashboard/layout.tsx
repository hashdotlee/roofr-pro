import Sidebar from "@/components/custom/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
}
