import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

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
