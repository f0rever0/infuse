import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});
