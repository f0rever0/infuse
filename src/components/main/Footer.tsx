import Image from "next/image";
import Link from "next/link";
import icon_twitter from "@/assets/icons/icon_twitter.svg";

export default function Footer() {
  return (
    <div className="flex justify-end items-center pb-4 pr-4">
      <Link href={"https://x.com/infuse_into_onf"}>
        <Image src={icon_twitter} alt="트위터 아이콘" width="20" height="20" />
      </Link>
      <p className="text-light-gray pl-3 bold-14"> infuse_into_onf</p>
    </div>
  );
}
