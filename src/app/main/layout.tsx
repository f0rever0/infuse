export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-black h-full w-screen px-4">
      <nav></nav>
      {children}
    </section>
  );
}
