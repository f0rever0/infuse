import Footer from "@/components/main/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-sans bg-black pl-4">
      {children}
      <Footer />
    </div>
  );
}
