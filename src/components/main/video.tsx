import Link from "next/link";
import Image from "next/image";
import { VideoData } from "@/types/data";

export default function video({ sumnailUrl, videoTitle, videoUrl }: VideoData) {
  return (
    <div className="cursor-hover w-[320px] h-[240px] flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
      <Link href={videoUrl}>
        <Image
          width="320"
          height="240"
          src={sumnailUrl}
          alt={`${videoTitle} 썸네일`}
          title={videoTitle}
        />
      </Link>
    </div>
  );
}
