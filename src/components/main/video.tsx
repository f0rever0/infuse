import Link from "next/link";
import Image from "next/image";
import { VideoData } from "@/types/data";

export default function video({ sumnailUrl, videoTitle, videoUrl }: VideoData) {
  return (
    <div className="cursor-hover">
      <Link href={videoUrl}>
        <Image
          width="320"
          height="180"
          src={sumnailUrl}
          alt={`${videoTitle}썸네일`}
        />
      </Link>
    </div>
  );
}
