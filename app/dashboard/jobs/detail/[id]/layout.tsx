export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col gap-4 px-8 py-4 w-full">
      {children}
    </div>
  );
}
