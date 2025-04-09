import Image from "next/image";
import Link from "next/link";
import icon_twitter from "@/assets/icons/icon_twitter.svg";

export default function Footer() {
  return (
    <footer className="font-sans bg-[#121212] text-[#fff] text-sm flex justify-end items-center p-6">
      <Link href={"https://x.com/infuse_into_onf"}></Link>
      <p className="text-[#f5f3ee]  pl-3 text-sm font-base">@infuse_into_onf</p>
    </footer>
  );
}
