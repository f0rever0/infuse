import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-sans bg-black">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
