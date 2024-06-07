import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "@/utils/font";

export const metadata: Metadata = {
  title: "infuse",
  description: "온앤오프 동영상 모음 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
