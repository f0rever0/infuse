import Footer from "@/components/main/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="font-sans bg-black h-full w-screen pl-4">
      {children}
      <Footer />
    </section>
  );
}
