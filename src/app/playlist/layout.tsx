import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

export default function PlaylistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
