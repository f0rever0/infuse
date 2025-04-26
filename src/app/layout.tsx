import "./globals.css";
import { pretendard } from "@/utils/font";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans bg`}>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "온앤오프 팬페이지 | infuse",
  description:
    "온앤오프 동영상을 아카이빙하고 플레이리스트를 생성할 수 있는 팬페이지입니다.",
  openGraph: {
    title: "온앤오프 팬페이지 | infuse",
    description: "온앤오프 동영상 아카이빙, 플레이리스트 만들기",
    url: "https://infuseinto.vercel.app",
    siteName: "infuse",
    images: [
      {
        url: "https://infuseinto.vercel.app/images/og_sumnail.png",
        width: 1200,
        height: 630,
        alt: "OG 썸네일 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "온앤오프 팬페이지 | infuse",
    description: "온앤오프 동영상 아카이빙, 플레이리스트 만들기",
    images: ["https://infuseinto.vercel.app/images/og_sumnail.png"],
    creator: "@infuse_into_onf",
  },
};
