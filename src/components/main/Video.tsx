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
    <div className="relative cursor-hover w-[320px] h-[240px] flex-shrink-0  overflow-visible">
      <Link
        href={videoUrl}
        onClick={() => {
          track(`video list title : ${listTitle}`);
        }}
      >
        <Image
          width="320"
          height="240"
          src={sumnailUrl}
          alt={`${videoTitle} 썸네일`}
          title={videoTitle}
          className="relative z-0 transform transition-transform duration-300 hover:scale-105"
        />
      </Link>
    </div>
  );
}
