import "./globals.css";
import { pretendard } from "@/utils/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>온앤오프 팬페이지 | infuse</title>
        <meta name="description" content="온앤오프 팬페이지입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/images/icon.png"></link>
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="온앤오프 팬페이지 | infuse" />
        <meta property="og:description" content="온앤오프 팬페이지입니다." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og_sumnail.png" />
        <meta property="og:article:author" content="@infuse_into_onf" />
      </head>
      <body className={`${pretendard.variable} font-sans bg `}>{children}</body>
    </html>
  );
}
