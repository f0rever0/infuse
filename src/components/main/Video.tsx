import Link from "next/link";
import Image from "next/image";
import { VideoData } from "@/types/data";
import { track } from "@amplitude/analytics-browser";

interface VideoProps extends VideoData {
  listTitle: string;
}
export default function Video({
  sumnailUrl,
  videoTitle,
  videoUrl,
  listTitle,
}: VideoProps) {
  return (
    <div className="relative cursor-hover w-[250px] h-[187.5px] sm:w-[250px] sm:h-[187.5px] md:w-[341.33px] md:h-[256px] lg:w-[455.33px] lg:h-[341.5px] xl:w-[569.33px] xl:h-[427px] flex-shrink-0 overflow-visible">
      <Link
        href={videoUrl}
        onClick={() => {
          track(`video list title : ${listTitle}`);
        }}
      >
        <Image
          fill
          objectFit="cover"
          src={sumnailUrl}
          alt={`${videoTitle} 썸네일`}
          title={videoTitle}
          className="relative z-0 transform transition-transform duration-300 hover:scale-105"
        />
      </Link>
    </div>
  );
}
