import Link from "next/link";
import Image from "next/image";
import { VideoData } from "@/types/data";
import { track } from "@amplitude/analytics-browser";

interface VideoProps extends VideoData {
  listTitle: Record<string, string>;
}
export default function Video({
  sumnailUrl,
  videoTitle,
  videoUrl,
  listTitle,
}: VideoProps) {
  return (
    <div className="relative cursor-hover w-[320px] h-[240px] flex-shrink-0 transform transition-transform duration-300 hover:scale-105 overflow-visible">
      <Link
        href={videoUrl}
        onClick={() => {
          track("video list title", listTitle);
        }}
      >
        <div className="relative w-full h-full group-hover:z-10">
          <Image
            width="320"
            height="240"
            src={sumnailUrl}
            alt={`${videoTitle} 썸네일`}
            title={videoTitle}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className="relative z-0 transition-transform duration-300 transform group-hover:z-10 group-hover:scale-110"
          />
        </div>
      </Link>
    </div>
  );
}
