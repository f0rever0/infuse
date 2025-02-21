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
        <title>infuse</title>
        <meta name="description" content="온앤오프 동영상 모음 페이지" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
        <link rel="apple-touch-icon" href="/icon.ico"></link>
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="infuse" />
        <meta property="og:description" content="온앤오프 동영상 모음 페이지" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icon.ico" />
        <meta property="og:article:author" content="@infuse_into_onf" />
      </head>
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
