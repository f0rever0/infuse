export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-black h-full w-screen pl-4">{children}</section>
  );
}
