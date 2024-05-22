export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-black h-dvh">
      <nav></nav>
      {children}
    </section>
  );
}
