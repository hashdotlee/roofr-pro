export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-screen max-w-[1200px] mx-auto mt-8 px-4">{children}</div>
}
