export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col gap-4 p-8 w-full">
      {children}
    </div>
  );
}
